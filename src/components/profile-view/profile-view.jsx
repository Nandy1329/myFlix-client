import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PropTypes from "prop-types";
import { FavoriteMovies } from "./favorite-movies";


export const ProfileView = ({ user, isFavorite, addFavorite, removeFavorite }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    const [username, setUsername] = useState(user.userName);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [password, setPassword] = useState("null");
  
    const formData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };
  

    formData.Birthday = birthday ? new Date(birthday).toISOString().substring(0, 10) : null;

    const handleSubmit = (event) => {
        event.preventDefault(event);


        fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${storedUser.UserName}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                if (response.ok) {
                    alert("Changes saved successfully");
                    return response.json()
                }
                alert("Changes failed, try again");
            })
            .then((user) => {
                    localStorage.setItem('user', JSON.stringify(user));
                    onSubmit(data);
                })
            
            .catch((error) => {
                console.error(error);
            });
    };
    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));


    const handleUpdate = (e) => {
        switch (e.target.type) {
            case "text":
                setUsername(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "date":
                setBirthday(e.target.value);
                break;
            default:
        }
    }

    const handleDeleteAccount = (id) => {
        fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
        }).then((response) => {
            if (response.ok) {
                alert("Account deleted successfully");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Account deletion failed, try again");
}
        });
    };

    return (
        <Row>
          <Col className="mb-5" xs={12} md={9}>
            <FavoriteMovies 
              user={user} 
              favoriteMovies={favoriteMovies} 
              isFavorite={isFavorite} 
              addFavorite={addFavorite} 
              removeFavorite={removeFavorite} 
            />
          </Col>
        </Row>
      );
    }
ProfileView.propTypes = {
    movies: PropTypes.array.isRequired,
}