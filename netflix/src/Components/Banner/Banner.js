import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Banner({ userName }) {
  console.log(userName);
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const nav = useNavigate();
  let allMovies=JSON.parse(localStorage.getItem("all"));
  console.log(allMovies);

 
  let movie = allMovies[Math.floor(Math.random() * allMovies.length)];
  const bannerMovie = () => {
    let movieArray=[]
    movieArray.push(movie)
    localStorage.setItem("search", JSON.stringify(movieArray));
    nav("/over_view", {
      state: { name: userName.state.name },
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
    >
      <div className="fade_bottom-login"></div>
      <div className="content">
        <h1 className="title">{movie ? movie.title || movie.name : null}</h1>
        <div className="banner_buttons">
          <button onClick={bannerMovie} className="button">
            View Details
          </button>
          <button className="button">My list</button>
        </div>
        <h1 className="description">{movie ? movie.overview : null}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
