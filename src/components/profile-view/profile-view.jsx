import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserInfo } from "./user-info";
import {Link} from "react-router-dom";
import {UserUpdate} from "./user-update";
import {UserDelete} from "./user-deregister";
import {FavoriteMovies} from "./favorite-movies";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile-view.scss";

export const ProfileView = ({ movies, user }) => {
 if (!user) {
    return <div>User data not available</div>;
 }
    const { Username, Email, Birthday, Password } = user;

    return(
        <div className="profile-view-container">
            <div className="user-info">
            <UserInfo 
            name ={user.Username} 
            email = {user.Email} 
            birthday = {user.Birthday} 
            password = {user.Password} />
            </div>
            <div className="user-update">
            <UserUpdate />
            </div>
            <div className="user-delete">
            <UserDelete/>
            </div>
            <div className="favorite-movies">
            <FavoriteMovies movies={movies} user={user}/>
            </div>
        </div>         
    );    
};