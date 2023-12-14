import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import '../styles/PlantPageStyle.css'


export const ReturnToPlantsButton = () => {

    const navigate = useNavigate()
    const ReturntoPlants = () => {
        navigate('/plants')
    }

    return (
        <>
         <Button id="return-button" 
         onClick={(e)=> ReturntoPlants(e)}>Return to Plants</Button>
        </>
    )
}