import React, { useEffect, useRef, useState } from "react";
import "./NavBar.css";
import axios from "../../axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const [userLogin, setUserLogin] = useState([]);
  const navigate = useNavigate();
  const [trend, setTrend] = useState([]);
  const [action, setAction] = useState([]);
  const [doc, setDoc] = useState([]);
  const [horror, setHorror] = useState([]);
  const searchitems = useRef();
  let merge = trend.concat(action, doc, horror);

  setTimeout(() => {
    localStorage.setItem("all", JSON.stringify(merge));
  }, 100);
  const nav = useNavigate();
  useEffect(() => {
    axios.get(props.trending).then((response) => {
      setTrend(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.action).then((response) => {
      setAction(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.documents).then((response) => {
      setDoc(response.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(props.horror).then((response) => {
      setHorror(response.data.results);
    });
  }, []);
  const shadowClick = () => {
    let searchPro = searchitems.current.value;
    let split = searchPro.split(" ");
    for (let i = 0; i < split.length; i++) {
      split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
    }
    let a = split.join(" ");

    const res = merge.filter((val) => {
      return val.title == a || val.name == a;
      // console.log(val.title);
    });
    localStorage.setItem("search", JSON.stringify(res));
    nav("/over_view", { state: { name: props.userName.state.name } });
  };

  return (
    <div className="navbar">
      <img
        className="logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
        onClick={() => {
          nav("/home", { state: { name: props.userName.state.name } });
        }}
      />
      <div className="placeSearch">
        <input ref={searchitems} type="text" placeholder="Search..." />

        <div onClick={shadowClick} className="search-lense">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      <h3
        onClick={() => {
          nav("/fav_shows", { state: { name: props.userName.state.name } });
        }}
        className="fav-shows"
      >
        Favorite Shows
      </h3>
      <h3 className="user-head">
        {props.userName.state.name != null ? props.userName.state.name : null}
      </h3>
      <button
        onClick={() => {
          setUserLogin(false);
          navigate("/");
          localStorage.removeItem("favorite");
        }}
        className="logout-btn"
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
