import { api } from "../utilities.jsx";
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useOutletContext } from "react-router-dom"
import Container from "react-bootstrap/esm/Container.js";


export const LoginPage = () => {



    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState(null)



    const logIn = async(e) => {
        e.preventDefault();
        let response = await api.post("users/login/", {
            "username": username,
            "password": password
        })

        let user = response.data.user;
        let token = response.data.token;

        if (token !== undefined) {

            localStorage.setItem("token", token)
            localStorage.setItem("username", username)
            api.defaults.headers.common["Authorization"] = `Token ${token}`;
            setUser(response.data.user) 
            navigate("/")
        }
        else {
            alert("No user with matching credentials.")
            localStorage.clear()
            navigate("/")
        }

    }

        
    return (

    <>
    <Container style={{marginLeft:"40vmin", margin: "10vmin", width: "40%"}}>
        {localStorage.getItem("username")?
       ( "" )
    :
(
    <div>
        <h1>Welcome back!</h1>
    <Form onSubmit={(e)=> logIn(e)}>
    <Form.Group className="mb-3" controlId="formBasicUsername">
       <Form.Label>Username</Form.Label>
   <Form.Control type="text" placeholder="Enter username" onChange={(e)=>setUsername(e.target.value)}/>
   </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicPassword">
       <Form.Label>Password</Form.Label>
       <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
   </Form.Group>
   <Button style={{backgroundColor:"#5DBA9D", borderColor: "white"}} variant="primary" type="submit">
       Submit
   </Button>
   <Button style={{backgroundColor:"#5DBA9D", borderColor: "white", margin:"1vmin"}} onClick={()=>navigate("/")}>Cancel</Button>
   </Form>
   </div>
)
}
    
    </Container>
    </>
    )
}