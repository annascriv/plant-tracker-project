import { useEffect, useState } from "react";
import { api } from "../utilities.jsx";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import MyPlantsCard from "../components/MyPlantsCard.jsx";
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import { UserProfilePage } from "../components/Profile.jsx";



export const MyGarden = () => {

    const [plants, setPlants] = useState([])
    const [commonName, setCommonName] = useState("")
    const [scientificName, setScientificName] = useState("")
    const [watering, setWatering] = useState("")
    const [cycle, setCycle] = useState("")
    const [sunlight, setSunlight] = useState("")
    const [notes, setNotes] = useState("")
    const [showForm, setShowForm] = useState(false)


  

    let token = localStorage.getItem("token")


    const getGarden = async() => {


        let response = await api.get("garden/", {
            headers : {
                Authorization: `Token ${token}`
            }
        })

        setPlants(response.data.garden_plants)

    }

    useEffect(()=> {
        getGarden();
    }, [])

 

    const createAPlant = async(e) => {
        e.preventDefault();
        let data = {
            "common_name": commonName,
            "scientific_name": scientificName,
            "watering": watering,
            "cycle": cycle,
            "sunlight": sunlight,
            "notes": notes
        }
        let response = await api.post(`garden/create-plant/`, data, {
            headers: {
                Authorization: `Token ${token}`
            }

        })
        if (response.status ===201) {
            window.location.reload()
        }
        setShowForm(!showForm)
    }

    return (
        <>
    <Container style={{margin: "5vmin"}}>
    <UserProfilePage/>
    {showForm? (
        <Form onSubmit={(e)=> createAPlant(e)}>
            <Form.Group className="mb-3" controlId="formNewUsername">
            <Form.Label>Common Name</Form.Label>
            <Form.Control type="text" placeholder="common name" onChange={(e)=>setCommonName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDisplayName">
            <Form.Label>Scientific Name</Form.Label>
            <Form.Control type="text" placeholder="scientific name" onChange={(e)=>setScientificName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAge">
            <Form.Label>What cycle does this plant grow in?</Form.Label>
            <Form.Control type="text"  placeholder="cycle" onChange={(e)=>setCycle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
            <Form.Label>How often does it need to be watered?</Form.Label>
            <Form.Control type="text"  placeholder="watering" onChange={(e)=>setWatering(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSunlight">
            <Form.Label>How much sunlight does it need?</Form.Label>
            <Form.Control type="text"  placeholder="sunlight" onChange={(e)=>setSunlight(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBio">
            <Form.Label>Any notes for later?</Form.Label>
            <Form.Control type="text"  placeholder="Notes..." onChange={(e)=>setNotes(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
            </Form>

)
:
(
        <Button style={{backgroundColor: "#5DBA9D", borderColor: "white"}} onClick={()=>setShowForm(!showForm)}>Create A New Plant!</Button> 
)
}


            <Row style={{textAlign: "center", marginTop:"20vmin", fontFamily:"Whisper"}}>
            <h1><b>My Garden</b></h1>
            </Row>
            <Row>
            {
               plants.map((plant, idx)=> (
                    <MyPlantsCard key={idx} plant={plant.plant}
                    />
                ))
               }

            </Row>
            </Container>



        </>
    )


}