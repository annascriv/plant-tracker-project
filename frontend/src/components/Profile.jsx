import { api } from "../utilities.jsx";
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Container from "react-bootstrap/esm/Container.js";
import CardImg from "react-bootstrap/esm/CardImg.js";
import '../styles/PlantPageStyle.css'


export const UserProfilePage = () => {

    const [userProfile, setUserProfile] = useState({})
    const [newUsername, setNewUsername] = useState(userProfile.username)
    const [newBio, setNewBio] = useState(userProfile.bio)
    const [newDisplayName, setNewDisplayName] = useState(userProfile.display_name)
    const [newAge, setNewAge] = useState(userProfile.age)
    const [showForm, setShowForm] = useState(false)
    const [profilepic, setProfilePic] = useState(null)

    let token = localStorage.getItem("token")

    let profileURL = "http://127.0.0.1:8000/"

    const navigate = useNavigate();

 
    const getUserInfo = async() => {

        const token = localStorage.getItem("token");
        

        if (token) {
            let response = await api.get("users/info/", {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            setUserProfile(response.data)
  
        }


    }

    useEffect(()=> {
        getUserInfo();
    }, [])

    const updateProfile = async(e) => {
        e.preventDefault();

        let token = localStorage.getItem("token")

        let data = {
            username: newUsername,
            display_name: newDisplayName,
            age: newAge,
            bio: newBio,
        };

        let response = await api.put('users/info/', data, { headers: {
            Authorization: `Token ${token}`
        }})
        .catch((err)=> {
            console.log(err.response)
        });
        if (response.status === 204) {
            window.location.reload();
        }
        setShowForm(!showForm)

    }

 

        const deleteAccount = async(e) => {
            const token = localStorage.getItem('token');


            try {
                const response = await api.delete('users/delete/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    }
                })

                if (response.status === 204) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                    navigate("/")
                    
                }
            }
            catch (error) {
                console.log(error, "Error deleting account")
            }
        
    }

    const handlePicUpload = (e) => {
        setProfilePic(e.target.files[0])
    }

    const handlePicSubmit = async() => {
        const data = new FormData();

        data.append("profile_picture", profilepic)

        let response = await api.post('users/profile-picture/', data, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })

        if (response.status === 201) {
            window.location.reload()
        }
        else {
            console.log("Error uploading profile pic")
        }

    }




    return (
        <>
            <Container style={{alignContent: "center"}}>
            {showForm ? (
            <div>
            <Form onSubmit={(e)=> updateProfile(e)}>
            <Form.Group className="mb-3" controlId="formNewUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder={userProfile.username} onChange={(e)=>setNewUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDisplayName">
            <Form.Label>Display Name</Form.Label>
            <Form.Control type="text" placeholder={userProfile.display_name} onChange={(e)=>setNewDisplayName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control type="int"  placeholder={userProfile.age} onChange={(e)=>setNewAge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text"  placeholder={userProfile.bio} onChange={(e)=>setNewBio(e.target.value)}/>
            </Form.Group>
            <Button id="form-button" variant="primary" type="submit">
            Submit
            </Button>
            <Button id="form-button" onClick={()=>setShowForm(!showForm)}>Cancel</Button>
            </Form>
            {/* Profile Picture Upload Form */}
                <Form>
                    <Form.Control id="form-button" style={{width:"30vmin"}} type="file" accept="image/*" onChange={(e)=>handlePicUpload(e)}/>
                    <Button id="form-button" onClick={()=>handlePicSubmit()}>upload</Button>
                </Form>
            </div>
            )
            :
            (


        <Row style={{alignContent:"center"}}>
        <Card id="profile-card">
        <Card.Body>
            <div style={{float:"left", marginRight:"3vmin"}}>
            <CardImg style={{height:"15rem", width:"12rem", borderRadius:"15vmin", border:"2px solid black"}} src={userProfile.profile_picture ? profileURL+userProfile.profile_picture : null}></CardImg>
            </div>
            <Card.Title style={{marginTop:"5vmin"}}>{userProfile.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{userProfile.display_name}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">{userProfile.age}</Card.Subtitle>
            <Card.Text>
                {userProfile.bio}
            </Card.Text>
        </Card.Body>
        <Row>
        <Button id="edit-profile-button"  onClick={()=> setShowForm(!showForm)}>Edit Profile</Button>
        <Button id="delete-account-button"  onClick={(e)=>deleteAccount(e)}>Delete Account</Button>
        </Row>
        </Card>
        </Row>
            )
}
    


        </Container>
        </>
    )
}