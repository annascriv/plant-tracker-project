import Button from "react-bootstrap/esm/Button"
import { api } from "../utilities"
import '../styles/PlantPageStyle.css'


export const AddToGardenButton = ({ plant }) => {

    let token = localStorage.getItem("token")

    const addtoGarden = async(e) => {
        e.preventDefault()
        let data = {
          "common_name": plant.common_name,
          "scientific_name": plant.scientific_name[0],
          "watering": plant.watering,
          "cycle": plant.cycle,
          "sunlight": plant.sunlight[0],
          "thumbnail_url": plant.default_image?.thumbnail,
      }
    
      console.log(data)
    
        let response = await api.post("garden/create-plant/", data, {
          headers: {
            Authorization: `Token ${token}`
          }
        }).catch((err)=> {
          console.log(err, "Something went wrong")
        })
    
        if (response.status === 201) {
          window.location.reload()
        }
      }


      return (
        <>
                <Button id="add-button"  variant="primary" 
                onClick={(e)=>addtoGarden(e)}>Add to Garden</Button>
        
        </>
      )
}