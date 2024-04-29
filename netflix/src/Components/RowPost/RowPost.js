import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./RowPost.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function RowPost(props) {
  let favouriteShows = JSON.parse(localStorage.getItem("favorite"));

  const [movies, setMovies] = useState([]);
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const nav = useNavigate();

  useEffect(() => {
    axios.get(props.url ? props.url : null).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let rowPost = document.querySelectorAll(".jaa");
      for (let i = 0; i < rowPost.length; i++) {
        let img = rowPost[i].childNodes[0];
        img.addEventListener("mouseenter", () => {
          img.style.transform = "scale(1.1)";
          img.style.transition = ".3s cubic-bezier(0.075, 0.82, 0.165, 1)";
        });

        img.addEventListener("mouseleave", () => {
          img.style.transform = "scale(1)";
          img.style.transition = ".3s cubic-bezier(0.075, 0.82, 0.165, 1)";
        });
      }
    }, 100);
  }, []);

  return (
    <div className="row">
      <h2 className="title-card">{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => {
          
            return (
              <div className="poster-main">
                <div className="jaa">
                  <img
                    onClick={() => {
                      let movieDetail = [];
                      movieDetail.push(movie);
                      localStorage.setItem("search", JSON.stringify(movieDetail));
                      nav("/over_view", {
                        state: { name: props.userName.state.name },
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 300);
                    }}
                    className={props.isSmall ? "smallPoster" : "poster"}
                    alt="poster"
                    src={
                      props.isSmall
                        ? imageUrl + movie.poster_path
                        : imageUrl + movie.backdrop_path
                    }
                  />
                </div>
                <h2 className={props.isSmall ? "" : "heading"}>
                  {props.isSmall ? "" : movie.name || movie.title}
                </h2>
                <h5 className={props.isSmall ? "small-heading" : ""}>
                  {props.isSmall ? movie.name || movie.title : ""}
                </h5>
              </div>
            );
          
          
        })}
      </div>
    </div>
  );
}

export default RowPost;
