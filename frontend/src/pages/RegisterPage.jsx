import { api } from "../utilities.jsx";
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useOutletContext } from "react-router-dom";



export const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0)
    const [display_name, setDisplayName] = useState("")
    const [bio, setBio] = useState("")

    const [user, setUser] = useState(null)

    const navigate = useNavigate();


    const signUp = async(e) => {
        e.preventDefault();
        let data = { username, password, display_name, age, bio }

        let response = await api.post("users/signup/", data)
        .catch((err)=> {
            alert("Please select a unique username.")
        })

        let user = response.data.user;
        let token = response.data.token;

        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username)

        setUser(user)
        navigate("/");

        
    }





        return (
            <>
            <Form onSubmit={(e)=> signUp(e)}>
             <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name </Form.Label>
                <Form.Control type="text" placeholder="Display Name" onChange={(e)=>setDisplayName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="int" placeholder="Age" onChange={(e)=>setAge(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Bio</Form.Label>
                <Form.Control type="text" placeholder="Bio" onChange={(e)=>setBio(e.target.value)}/>
            </Form.Group>
            
            <Button style={{backgroundColor:"gray", borderColor:"white", margin:"1vmin"}} type="submit">
                Submit
            </Button>
            <Button style={{backgroundColor:"gray", borderColor:"white", margin:"1vmin"}} onClick={()=>navigate("/")}>Cancel</Button>
            </Form>

            
            </>
        )
}