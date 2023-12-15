import Button from "react-bootstrap/esm/Button"
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom"
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";



export const HomePage = () => {

    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate('login')
    }

    const handleSignupButton = () => {
        navigate('register')
    }

    return (
        <>
        <Container  id="homepage-container">
        {localStorage.getItem("username")?
        (<Container id="hometext-container" style={{alignContent: "center", textAlign: "center"}}>
            <h3>welcome! </h3>
            <p>Here at bloom buddy, we are passionate about helping you keep your plants cared for and loved. 
                <br/> <br/> Create a new card for each plant in your collection and save it to your <Link to="garden">Garden</Link>, or explore the <Link to="plants">Discover Plants</Link> page to find some fresh inspo!
                <br/><br/> You can also explore <Link to="allusers">Gardener Central</Link> to find your friends and view the plants in their garden.
            
            </p>


        </Container>)
        :
        (
            <Container className="login-button-container" style={{alignContent: "center"}}>
            
                <Row >
                    <h1 className="typed">bloom buddy</h1>

                </Row>
            <Row className="button-box" style={{marginTop:"5vmin"}}>
            <Button id="login-button" variant="primary" onClick={handleLoginButton}>Login</Button>
            <Button id="signup-button" variant="danger" onClick={handleSignupButton}>Sign up</Button>
            </Row>
            
            </Container>
        )}
        </Container>
        </>
    )
}