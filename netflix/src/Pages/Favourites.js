import React, { useEffect } from "react";
import "./Favourites.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../Components/NavBar/NavBar";
let trending =
  "trending/all/week?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&language=en-US";
let action =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=28";
let documents =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=99";
let horror =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=27";

function Favourites() {
  const imageUrl = "https://image.tmdb.org/t/p/original";
  let favouriteShows = JSON.parse(localStorage.getItem("favorite"));
  const location = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      var a = document.querySelectorAll(".fav-show-sub");
      for (let i = 0; i < a.length; i++) {
        let img = a[i].childNodes[0];
        let cross=img.childNodes[1]
        console.log(cross);
        img.addEventListener("mouseenter", () => {
          img.style.transform = "scale(1.1)";
          img.style.transition = ".5s cubic-bezier(0.075, 0.82, 0.165, 1)";
          cross.style.display="block"
        });

        img.addEventListener("mouseleave", () => {
          img.style.transform = "scale(1)";
          img.style.transition = ".5s cubic-bezier(0.075, 0.82, 0.165, 1)";
          cross.style.display="none"
        });
      }
      console.log(a);
    }, 100);
  });

  return (
    <>
      <NavBar
        action={action}
        trending={trending}
        documents={documents}
        horror={horror}
        userName={location}
      />

      <div className="favourite-show-main">
        {favouriteShows ? (
          favouriteShows.map((favShows,index) => {
            console.log(favShows);
            return (
              <div className="fav-show-sub">
                <div className="image-fav-sub">
                <img
                  onClick={() => {
                    let movieDetail = [];
                    movieDetail.push(favShows);
                    localStorage.setItem("search", JSON.stringify(movieDetail));
                    nav("/over_view", { state: { name: location.state.name } });
                  }}
                  src={favShows ? imageUrl + favShows.poster : null}
                  alt=""
                  className="fav-show-poster"
                />
                <div onClick={()=>{
                  favouriteShows.splice(index,1)
                  localStorage.setItem("favorite", JSON.stringify(favouriteShows));
                      setTimeout(()=>{
                        window.location.reload();
                      },100)
                }} className="remove-cross">
                  <FontAwesomeIcon icon={faTimes} />
                </div>
                </div>
                
                <h1 className="fav-show-heading">
                  {favShows ? favShows.name : null}
                </h1>
              </div>
            );
          })
        ) : (
          <h1 className="no-res">No Favourites Added Yet</h1>
        )}
      </div>
    </>
  );
}

export default Favourites;
