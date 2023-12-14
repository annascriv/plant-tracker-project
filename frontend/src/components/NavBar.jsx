import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { api } from '../utilities';
import { useState } from 'react';

function NavbarHeader() {


  let username = localStorage.getItem("username")
  const navigate = useNavigate();
  

  const logOut = async () => {
    let token = localStorage.getItem("token");

    try {
        let response = await api.post("users/logout/", null, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        if (response.status === 204) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            delete api.defaults.headers.common["Authorization"];

            navigate("/");
        }
    } catch (error) {
        console.error("Error logging out:", error);
        // Handle error, e.g., redirect to login page
        navigate("/login");
    }
};

  return (
    <>

    {localStorage.getItem("username") ? (
    <Navbar expand="lg" className="bg-body-tertiary" >

      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Item style={{marginRight: "38vmin"}}><h2>bloom buddy</h2></Nav.Item>

            <Link id="nav-link" to="/">Home</Link>
            {/* <Link id="nav-link" to="profile">Profile</Link> */}
             <Link id="nav-link" to="plants">Discover</Link>
            <Link id="nav-link" to="garden">Garden</Link>
            <Navbar.Brand>{username || ""}</Navbar.Brand>
            {localStorage.getItem("username")?
       ( <Button style={{marginRight: "2vmin", backgroundColor:"#DF8210", borderColor: "white", color:"white"}} variant="warning" type="submit" onClick={()=>logOut()}>
                Log Out
        </Button>) : ""}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> )
    :
    ""}
    </>
  );
  
}

export default NavbarHeader;