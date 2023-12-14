import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { api } from '../utilities';
import Form from 'react-bootstrap/Form';
import { format } from 'date-fns'
import '../styles/PlantPageStyle.css'

function MyPlantsCard({plant}) {

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

    const EditAPlant = async(e) => {
        let plant_id = plant.id 
        console.log(plant_id)

        let data = {
            common_name: newName,
            scientific_name: newScientificName,
            watering : newWatering,
            sunlight: newSunlight,
            cycle: newCycle,
            notes: newNotes
        }

        let response = await api.put(`garden/edit-plant/${plant_id}/`, data, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        if (response.status === 204) {
            window.location.reload()
        }
        setShowEditForm(!showEditForm)
    }

    const DeletePlant = async(e) => {
        let plant_id = plant.id 

        let response = await api.delete(`garden/edit-plant/${plant_id}/`,{
            headers: {
                Authorization: `Token ${token}`
            }
        })

        if (response.status === 204) {
            window.location.reload()
        }

    }

    const waterPlant = async(e) => {
        e.preventDefault();

        let plant_id = plant.id
        console.log(plant_id)

        let response = await api.post(`garden/edit-plant/${plant_id}/`, null, {
            headers: {
                Authorization: `Token ${token}`
            }
        })

        if (response.status === 204) {
            window.location.reload()
        }
    }

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
            <b>Last watered:</b> {format( new Date(plant.last_watered), 'MMMM dd, yyyy hh:mm a') || "This plant hasn't been watred yet!"}
        </div>
        
        <Button style={{borderColor: "white", backgroundColor: "#D598C6", opacity:".7"}} onClick={(e)=>waterPlant(e)}>Water {plant.common_name}</Button>
        <Button style={{ backgroundColor: "#DF8221", borderColor: "white", opacity:".7"}} onClick={(e)=> DeletePlant(e)}>Delete</Button>
        <Button style={{ backgroundColor: "gray", borderColor: "white", opacity:".7"}} variant = "secondary" onClick={()=>setShowEditForm(!showEditForm)}>Edit</Button>
      </Card.Body>
    </Card>

    {showEditForm? (
        <Form style={{width: "40vmin", border: "2px solid gray", borderRadius: '2px'}} onSubmit={(e)=> EditAPlant(e)}>
        <Form.Group className="mb-3" controlId="formNewCommonName">
        <Form.Label>Common Name</Form.Label>
        <Form.Control type="text" placeholder="common name" onChange={(e)=>setNewName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDisplayName">
        <Form.Label>Scientific Name</Form.Label>
        <Form.Control type="text" placeholder="scientific name" onChange={(e)=>setNewScientificName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAge">
        <Form.Label>What cycle does this plant grow in?</Form.Label>
        <Form.Control type="text"  placeholder="cycle" onChange={(e)=>setNewCycle(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>How often does it need to be watered?</Form.Label>
        <Form.Control type="text"  placeholder="watering" onChange={(e)=>setNewWatering(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSunlight">
        <Form.Label>How much sunlight does it need?</Form.Label>
        <Form.Control type="text"  placeholder="sunlight" onChange={(e)=>setNewSunlight(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>Any notes for later?</Form.Label>
        <Form.Control type="text"  placeholder="Notes..." onChange={(e)=>setNewNotes(e.target.value)}/>
        </Form.Group>
        <Button style={{margin: '1vmin'}} variant="primary" type="submit">
        Submit
        </Button>
        </Form>
    ) 
    :
    "" }
    </>

  );

}

export default MyPlantsCard;