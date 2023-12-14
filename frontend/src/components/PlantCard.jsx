import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { AddToGardenButton } from './AddButton';
import '../styles/PlantPageStyle.css'

function PlantCard({plant, image, id}) {


  let navigate = useNavigate()



  return (
    <Card id="plant-card" >
      <Card.Img style={{border:"1px solid black", borderRadius:"1vmin", marginTop: "1.5vmin"}} variant="top" src={image}/>
      <Card.Body>
        <Card.Title>{plant.common_name}</Card.Title>
        <div>
            <ul>
                <li>
                    Scientific name: {plant.scientific_name}
                </li>
                <li>
                    Watering frequency: {plant.watering}
                </li>
                <li>
                    Sunlight: {typeof(plant.sunlight)==='object' ? plant.sunlight.join(', ') : plant.sunlight}
                </li>
                <li>
                    Cycle: {plant.cycle}
                </li>

            </ul>
            
        </div>
        <AddToGardenButton plant={plant}/>
        <Button id="details-button"
        onClick = {()=>navigate(`/plant/${id}`)}>Read More</Button>
      </Card.Body>
    </Card>
  );
}

export default PlantCard;