import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import swal from "sweetalert";
import "./OverView.css";
import NavBar from "../Components/NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlay } from "@fortawesome/free-solid-svg-icons";
let trending =
  "trending/all/week?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&language=en-US";
let action =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=28";
let documents =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=99";
let horror =
  "discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=27";
  let tv='discover/tv?api_key=cf6943474b7b12c83b4f25bf4a0c76f8'
let comedy='discover/movie?api_key=cf6943474b7b12c83b4f25bf4a0c76f8&with_genres=35'

let API_KEY = "cf6943474b7b12c83b4f25bf4a0c76f8";
function OverView() {
  const [urlId, setUrldId] = useState([]);
  const [fav, setFav] = useState([]);
  const[related,setRelated]=useState('')
  console.log(related);
  const nav = useNavigate();
  let details = JSON.parse(localStorage.getItem("search"));
  console.log(details);
  let favouriteShows = JSON.parse(localStorage.getItem("favorite"));
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const location = useLocation();
  let swalB = document.querySelector(".swal-button");
  if (swalB != null) {
    swalB.addEventListener("click", () => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    });
  }
  const favClick = () => {
    setFav((favo) => {
      return [
        ...favo,
        {
          poster: details[0].poster_path,
          backdrop_path: details[0].backdrop_path,
          name: details[0].name || details[0].title,
          release_date: details[0].release_date || details[0].first_air_date,
          vote_average: details[0].vote_average,
          vote_count: details[0].vote_count,
          popularity: details[0].popularity,
          overview: details[0].overview,
          id: details[0].id,
        },
      ];
    });
    swal("Added to favourite", "You can view from favourite shows");
    // setTimeout(()=>{
    //   window.location.reload();
    // },1000)
  };
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("favorite"));
    if (cartItems) setFav(cartItems);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("favorite", JSON.stringify(fav));
    }, 100);
  }, [fav]);
  let showsFav = [];
  if (favouriteShows != null && details[0] != null) {
    let han = favouriteShows.filter((fav2) => {
      return fav2.id == details[0].id;
    });
    showsFav.push(han[0]);
  }

  const removeFav = () => {
    let a = [];
    for (let i = 0; i < favouriteShows.length; i++) {
      if (favouriteShows[i].id != details[0].id) {
        a.push(favouriteShows[i]);
      }
    }
    localStorage.setItem("favorite", JSON.stringify(a));
    swal("Removed from favourite", "You can add any time");

    let swalB = document.querySelector(".swal-button");
    if (swalB != null) {
      swalB.addEventListener("click", () => {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      });
    }
  };

  const opts = {
    height: "890",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const playButton = (e) => {
    e.preventDefault();
    axios
      .get(`movie/${details[0].id}/videos?api_key=${API_KEY}`)
      .then((response) => {
        if (response.data.results.length == 0) {
          window.alert("No Videos Available");
        } else {
          setUrldId(response.data.results);
        }
      });
    let uT = document.querySelector(".all-utube");
    console.log(uT);
    setTimeout(() => {
      uT.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    }, 400);
    let relatedVids=document.querySelector('.related-vids')
    relatedVids.style.display="block"

    

   
   
  };
  
  const cancelYt = () => {
    let overVM = document.querySelector(".all-utube-head");
    setTimeout(() => {
      overVM.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    setRelated(false)
    
    
  };
  useEffect(()=>{
    let allUtubeImage=document.querySelectorAll('.all-utube-image')
    for(let i=0;i<allUtubeImage.length;i++){
      let allImageSub=allUtubeImage[i].childNodes[0]
      let utubePlay=allUtubeImage[i].childNodes[1]
      allUtubeImage[i].addEventListener('mouseenter',()=>{
        allImageSub.style.opacity="40%"
        utubePlay.style.display="block"
      })

      allUtubeImage[i].addEventListener('mouseleave',()=>{
        allImageSub.style.opacity="100%"
        utubePlay.style.display="none"
      })
    }
    
  })
  
  const playVideo=(key)=>{
    setRelated(key)
    setTimeout(() => {
      youTubePlay.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
    let youTubePlay=document.querySelector('.uT')
    youTubePlay.style.display="block"
    let fadeYt = document.querySelector(".fade_bottom_over-utube");
    let utubeCancel=document.querySelector('.utube-cancel')
    youTubePlay.addEventListener("mouseenter", () => {
      fadeYt.style.display = "block";
      utubeCancel.style.display = "block";
      fadeYt.style.transition = "10s cubic-bezier(0.075, 0.82, 0.165, 1)";
    });
    youTubePlay.addEventListener("mouseleave", () => {
      fadeYt.style.display = "none";
      utubeCancel.style.display = "none";
      fadeYt.style.transition = "10s cubic-bezier(0.075, 0.82, 0.165, 1)";
    });
    
  }

  
  
  return (
    <>
      <NavBar
        action={action}
        trending={trending}
        documents={documents}
        horror={horror}
        comedy={comedy}
        tv={tv}
        userName={location}
      />
      {details[0] ? (
        <div className="overview-main">
          <div className="overview">
            <div className="left-over">
              <h1 className="head-over">
                {details[0] ? details[0].name || details[0].title : null}
              </h1>
              <div className="views-main">
                <h5 className="ratings">
                  {details[0] ? details[0].vote_average : null} Rating{" "}
                </h5>
                <h5 className="rating"> |</h5>
                <h5 className="rating">
                  {" "}
                  {details[0] ? details[0].vote_count : null} Votes
                </h5>
                <h5 className="rating"> |</h5>
                <h5 className="rating">
                  {" "}
                  {details[0] ? details[0].popularity : null} Popularity
                </h5>
              </div>

              <div className="banner_buttons">
                <button onClick={playButton} className="button">
                  Play
                </button>
                {showsFav[0] ? (
                  <button onClick={removeFav} className="button">
                    Remove from favorites
                  </button>
                ) : (
                  <button onClick={favClick} className="button">
                    Add to favourites
                  </button>
                )}
              </div>
              <h1 className="descriptions">
                {details[0] ? details[0].overview : null}
              </h1>
              <h5>
                Release Date :{" "}
                {details[0]
                  ? details[0].release_date || details[0].first_air_date
                  : null}
              </h5>
            </div>
            <div
              className="right-over"
              style={{
                backgroundImage: `url(${
                  details[0] ? imageUrl + details[0].backdrop_path : ""
                })`,
              }}
            >
              <div className="fade_bottom_over"></div>
            </div>
          </div>
          <div className="all-utube-head">
          <h1 className="related-vids" >Play Lists</h1>
          <div className="all-utube">
            {urlId.map((url, index) => {
              if (index <= 11) {
                return (
                  <div className="all-utube-sub">
                    
                    <div className="all-utube-image">
                    <img
                      src={`https://i.ytimg.com/vi/${url.key}/hq720.jpg`}
                      alt=""
                    />
                    <div  onClick={()=>{
                      playVideo(url.key)
                    }}  className="utube-play">
                      <FontAwesomeIcon icon={faPlay} />
                    </div>
                    </div>
                    

                    <h2 className="thumb-name">{url.name}</h2>
                  </div>
                );
              }
            })}
          </div>
          </div>
          
          <div className="uT">
            
            <div className="fade_bottom_over-utube"></div>
            {related && <YouTube opts={opts} videoId={ related} />}
            <div onClick={cancelYt} className="utube-cancel">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        </div>
      ) : (
        <h1 className="no-res">No Result Found</h1>
      )}
    </>
  );
}

export default OverView;
