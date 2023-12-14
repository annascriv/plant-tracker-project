import { useState, useEffect } from "react";
import { api } from "../utilities";
import { useParams } from "react-router-dom";
import { ReturnToPlantsButton } from "../components/ReturnButton";
import Container from "react-bootstrap/esm/Container";
import { AddToGardenButton } from "../components/AddButton";
import '../styles/PlantPageStyle.css'


export const PlantDetailsPage = () => {

    const [plant, setPlant] = useState({})
    const { id } = useParams();


    const getPlant = async() => {

        let token = localStorage.getItem("token")


        let response = await api.get(`plants/plant-details/${id}/`,{
            headers : {
                Authorization: `Token ${token}`
            }
        })   

        setPlant(response.data)
        console.log(response.data)
    }

    useEffect(()=> {
        getPlant();
    }, [])

    return (
        <>
        <ReturnToPlantsButton/>
        <Container style={{textAlign: "center"}}>
        <h1 style={{marginTop:"5vmin"}}>Plant Details</h1>
        <AddToGardenButton plant={plant} />
        <h2 style={{marginTop:"5vmin"}}>{plant.common_name}</h2>
        <h5 style={{marginTop:"5vmin"}}>{plant.cycle}</h5>
        <img style={{border: "solid 1vmin black", borderRadius:"1vmin"}} src={plant.default_image?.thumbnail || "https://static.thenounproject.com/png/6347562-200.png"}></img>
        

        

        <p style={{marginTop:"5vmin"}}>{plant.description}</p>
        </Container>
        <Container style = {{marginTop:"15vmin", marginLeft:"5vmin"}}>
            <div>
                <h4>Pruning Needs, Propagation Methods, and Level of Care</h4>
                <b>Pruning Months:</b> {typeof(plant.pruning_month)==="object" ? plant.pruning_month.join(", ") : plant.pruning_month}
                <br/>
                <b>Propagation:</b> {typeof(plant.propagation)==="object" ? plant.propagation.join(", ") : plant.propagation}
                <br/>
                <b>Level of Maintenance: </b>{plant.care_level}
                

            </div>
            </Container>
            <Container style = {{marginTop:"15vmin", marginLeft:"10vmin", marginBottom:"10vmin"}}>
            <h4>Fun Facts</h4>
            <div>
            Some fun facts about the <b>{plant.common_name}</b>!
            <ul>
                {plant.tropical ? <li>It grows best in tropical areas</li> : ""}
                {plant.indoor ? <li>This plant grows best indoors.</li> : ""}
                <li>It originates from <b>{typeof(plant.origin) === 'object' ?  plant.origin.join(', ') : plant.origin}</b></li>
                {plant.medicinal ? <li> It has medicinal benefits</li> : ""}
                {plant.edible_fruit ? <li>It has edible fruit</li> : ""}
                {plant.drought_tolerant ? <li>It resists drought well</li> : ""}
                <li>It has {plant.flower_color || "no"} flowers.</li>
            </ul>
        </div>
        </Container>
        </>
    )
}