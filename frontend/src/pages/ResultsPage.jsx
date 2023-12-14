import { api } from "../utilities";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlantCard from "../components/PlantCard";
import Row from "react-bootstrap/esm/Row";
import { ReturnToPlantsButton } from "../components/ReturnButton";



export const ResultsPage = () => {

    const { name } = useParams();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1)
    let token = localStorage.getItem("token")
    const navigate = useNavigate()
    

    const getResults = async() => {
        let response = await api.get(`plants/plant-details/${name}/${page}/`, {
            headers : {
                Authorization: `Token ${token}`
            }
        })

        setResults([...results, ...response.data.data])
        if (response.data.last_page > page) {
            setPage(page+1)
        }


    }

    useEffect(()=> {
        setResults([]);
        setPage(1);

    }, [name])

    useEffect(()=> {
        getResults();
    }, [page])





    return (
        <>
        
        <Row style={{textAlign:"center"}}>
        <h2>Results: {name}</h2>
        <ReturnToPlantsButton/>
        </Row>
        <Row>
        {results.map((plant, idx) => (
            <PlantCard id={plant.id} key={idx} plant={plant} image={plant.default_image?.thumbnail ||  "https://static.thenounproject.com/png/6347562-200.png"}/>
        ))}
        </Row>
        
        </>
    )
}