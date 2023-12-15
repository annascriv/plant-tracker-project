import { api } from "../utilities.jsx";
import { ProfileCard } from "../components/ProfileCard.jsx";
import { useState, useEffect } from "react";
import Row from "react-bootstrap/esm/Row.js";


export const AllUsersPage = () => {

    const [users, setUsers] = useState([])

    let token = localStorage.getItem("token")


    const getAllUsers = async()=> {

        let response = await api.get('users/all/', {
            headers: {
                Authorization: `Token ${token}`,
            }
        })

        setUsers(response.data)
    }

    useEffect(()=> {
        getAllUsers();
    }, [])


    return (
        <>
        <Row>
        {users.map((user, idx)=> (
            <ProfileCard key={idx} userProfile={user}/>
        ))}
        </Row>
        

        </>
    )
}