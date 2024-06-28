import React from "react";
import {useState, useEffect} from "react";
import Button from "react-bootstrap/Button";

export const UserDelete = () => {
    const [message, setMessage] = useState("");
    const [storedUser, setStoredUser] = useState(JSON.parse(localStorage.getItem("user")) || {});   
    const [storedToken, setStoredToken] = useState(localStorage.getItem("token") || "");
    const handleDelete = async () => {
        if (!storedToken) {
            console.log("Token not found in local storage");
            return;
        }
        
        try{
            const response = await fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${storedUser.Username}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });
            if (response.ok) {
                alert("User has been deleted");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            } else {
                setMessage("User could not be deleted");
            }
        } catch (error) {
            console.error("Error deleting user", error);
            setMessage("User could not be deleted");
        }
    };
    return (
        <div className="user-delete">
            <Button variant="danger" onClick={handleDelete}>
                Delete User
            </Button>
            <div>{message}</div>
        </div>
    );
}