import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./user-deregister.scss";

export const DeleteUser = () => {
  const [message, setMessage] = useState("");
  const [storedUser, setStoredUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [storedToken, setStoredToken] = useState(
    localStorage.getItem("token") || ""
  );

  const handleDelete = async () => {
    if (!storedToken) {
      console.log("Token not found in local storage");
      setMessage("Token not found.");
      return;
    }

    try {
      const response = await fetch(
        `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${storedUser.Username}`, // Ensure this is the correct endpoint
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.ok) {
        setMessage("User deleted successfully");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } else {
        setMessage("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user", error);
      setMessage("Error deleting user");
    }
  };

  return (
    <div className="delete-user">
      <h1 className="delete-account">Delete Account</h1>
      <p>{message}</p>
      <Button className="delete-button" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteUser;
