import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { api } from '../utilities';
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns'
import { AddToGardenButton } from "../components/AddButton";
import '../styles/PlantPageStyle.css'

function OtherUserPlantsCard({plant}) {

    const [image, setImage] = useState("")
    const [showEditForm, setShowEditForm] = useState(false)
    const [newName, setNewName] = useState(plant.common_name)
    const [newScientificName, setNewScientificName] = useState(plant.scientific_name)
    const [newWatering, setNewWatering] = useState(plant.watering)
    const [newSunlight, setNewSunlight] = useState(plant.sunlight)
    const [newCycle, setNewCycle] = useState(plant.cycle)
    const [newNotes, setNewNotes] = useState(plant.notes)

    
    let token = localStorage.getItem("token")

  const getIcon = async() => {
    let response = await api.get(`plants/icons/${plant.common_name}/`, {
        headers: {
            Authorization: `Token ${token}`
        }

    })

    setImage(response.data['icons'][0]?.['thumbnail_url'])
    

}


useEffect(()=> {
    getIcon();
}, [])

 

  return (
    <>
    <Card id="myplants-card">
      <Card.Img style={{border:"1px solid black", borderRadius:"1vmin", marginTop:"1.5vmin"}} variant="top" src={plant.thumbnail_url || image || "https://static.thenounproject.com/png/6347562-200.png"}/>
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
                    Sunlight: {plant.sunlight}
                </li>
                <li>
                    Cycle: {plant.cycle}
                </li>
                <li>
                    Notes: {plant.notes}
                </li>

            </ul>
        </div>
        <div>
            <b>Last watered:</b> {format( new Date(plant.last_watered), 'MMMM dd, yyyy hh:mm a')}
        </div>
        <div>
            <b>Last fertilized: </b> {format( new Date(plant.last_fertilized), 'MMMM dd, yyyy hh:mm a')}
        </div>
        <AddToGardenButton plant={plant}/>
      </Card.Body>
    </Card>

    </>

  );

}

export default OtherUserPlantsCard;