import { useState, useEffect } from "react";
import { api } from "../utilities";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import MyPlantsCard from "../components/MyPlantsCard";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import OtherUserPlantsCard from "../components/OtherUsersPlantCard";



export const OtherUserGarden = () => {

    const [userGarden, setUserGarden] = useState([])
    
    const { username } = useParams()

    let token = localStorage.getItem("token")

    const navigate = useNavigate()

    const getUserGarden = async() => {

        let response = await api.get(`users/gardens/${username}/`,  {
            headers : {
                Authorization: `Token ${token}`
            }
        })

        setUserGarden(response.data.garden_plants)
       
    }

    useEffect(()=> {
        getUserGarden();
    }, [username])


    return (
        <>
        <div style={{display:'flex', justifyContent:"center"}}>
        <Row>
            <h1 style={{marginTop:"10vmin", marginBottom:"5vmin"}}>{username}'s Garden</h1>
        </Row>
        </div>
        <Button id="add-button" onClick={()=>navigate('/allusers/')}>
            Back to Gardeners
        </Button>
        <Row>
           
        {userGarden.map((plant, idx)=> (
            <OtherUserPlantsCard key={idx} plant={plant.plant}/>
        ))}
        </Row>
        </>
    )
}