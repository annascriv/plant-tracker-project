import { api } from "../utilities";
import { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import '../styles/PlantPageStyle.css'


export const PlantPage = () => {
    const [plants, setPlants] = useState([])
    const [page, setPage] = useState(1)

    const [userInput, setUserInput] = useState("")

    const [filters, setFilters] = useState("")

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const navigate = useNavigate();

    let token = localStorage.getItem("token")

    const getPlants = async() => {
        let response = await api.get(`plants/${page}/`, {
            headers : {
                Authorization: `Token ${token}`
            }
        })
        setPlants([...plants, ...response.data.data])
        setPage(page+1)
        

    }

    useEffect(()=> {
        if (page<10) {
        getPlants();
    }
    }, [page])

    const getFilteredPlants = async() => {
                

        let response = await api.get(`plants/${filters}/`,{
            headers : {
                Authorization: `Token ${token}`
            }
        } )

        setPlants(response.data.data)

    }

    useEffect(()=> {
        if (filters !== '') {
        getFilteredPlants();
        }
    }, [filters])

    const clearFilters = () => {
        window.location.reload()
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }

    useEffect(()=> {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, [])



    return (
        <>
        <Row style={{width:'60vmin', marginTop:"2vmin"}}>
    
        <Form className="searchbar" style={{display:"flex", marginLeft:"2vmin", opacity:"0.7"}} onSubmit={(e)=> [e.preventDefault(), navigate(`/results/${userInput}/`)]}>
        <Form.Control type="text" placeholder="Species" onChange={(e)=> setUserInput(e.target.value)} value={userInput}/>
        <Button type="submit" style={{backgroundColor:"gray", borderColor:"white"}}>Search</Button>
        
      </Form>

        </Row>

        <Row> 
        <Row >
               
            

            </Row>
            {windowWidth > 1200 ? (
                <Row id="filter-container">
            <Button id="row-of-buttons"  onClick={()=>clearFilters()}>Clear Filters</Button>
            <label style={{margin:"0.5vmin", marginLeft:"0vmin"}}><b> Filter your search:</b></label>
            <Button id="row-of-buttons" style={{marginLeft:"0vmin"}} onClick={()=> setFilters((prevFilters)=>prevFilters+'&cycle=perennial')}>Perennials</Button>
            
            <Button id="row-of-buttons" onClick={()=> setFilters((prevFilters)=>prevFilters+'&cycle=annual')}>Annuals</Button>
            
            <Button id="row-of-buttons"  onClick={()=> setFilters((prevFilters)=>prevFilters+'&sunlight=full_sun')}>Direct Sunlight</Button>
            
            <Button id="row-of-buttons"  onClick={()=> setFilters((prevFilters)=>prevFilters+'&sunlight=full_shade')}>Shade</Button>
            
            <Button id="row-of-buttons"  onClick={()=> setFilters((prevFilters)=>prevFilters+'&edible=1')}>Edible</Button>
            
            <Button id="row-of-buttons"  onClick={()=> setFilters((prevFilters)=>prevFilters+'&watering=minimum')}>Low Watering</Button>
            </Row>
            )
        :
        (
            <Dropdown style={{marginTop:"5vmin"}}>
                <Dropdown.Toggle style={{backgroundColor:"gray", borderColor:"gray"}}>
                    Filter Search
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=>clearFilters()}>Clear Filters</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilters((prevFilters)=>prevFilters+'&cycle=perennial')}>Perennials</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilters((prevFilters)=>prevFilters+'&cycle=annual')}>Annuals</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilters((prevFilters)=>prevFilters+'&sunlight=full_sun')}>Direct Sun</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilters((prevFilters)=>prevFilters+'&sunlight=full_shade')}>Shade</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilters((prevFilters)=>prevFilters+'&edible=1')}>Edible</Dropdown.Item>
                    <Dropdown.Item onClick={()=> setFilters((prevFilters)=>prevFilters+'&watering=minimum')}>Low Watering</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )}
        </Row>  
        
              

        
        <Container style={{display:"flex", alignContent: "center", marginTop:"5vmin", marginRight:"0vmin"}}>
        <Row>
        {plants.map((plant, idx)=> (
            <PlantCard key = {idx}
                plant = {plant}
                id={plant.id}
                image = {plant.default_image?.thumbnail ||  "https://static.thenounproject.com/png/6347562-200.png"}
              
                />
        ))}
        </Row>
        </Container>
        </>
    )
}


