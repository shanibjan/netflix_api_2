import React, { useEffect, useRef, useState } from "react";
import "./signUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let userLastName = useRef();
  let userEmail = useRef();
  let userPassword = useRef();
  const [userRegistration, setuserRegistration] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fNameParse = JSON.parse(localStorage.getItem("user_registration"));

    if (fNameParse) setuserRegistration(fNameParse);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem(
        "user_registration",
        JSON.stringify(userRegistration)
      );
    }, 100);
  }, [userRegistration]);
  const userCreate = () => {
    var isRegistered = false;
    let uLastName = userLastName.current.value;
    let uEmail = userEmail.current.value;
    let uPassword = userPassword.current.value;

    // console.log(uFirstName);
    // console.log(uLastName);

    if (uEmail != "" && uLastName != "" && uPassword != "") {
      userRegistration.map((uR) => {
        if (uEmail == uR.email) {
          window.alert("User Already Registered");
          isRegistered = true;
        }
      });
      if (isRegistered == false) {
        window.alert("User Registered");
        setuserRegistration((fName) => {
          return [
            ...fName,
            {
              name: uLastName,
              email: uEmail,
              password: uPassword,
            },
          ];
        });

        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } else {
      window.alert("Please register");
    }

    userLastName.current.value = null;
  };
  const userCreated = () => {};
  return (
    <div className="sign-up-main">
      <div className="logo-login">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
          alt=""
          className="logo-image"
        />
        <button
          onClick={() => {
            navigate("/");
          }}
          className="sign-up"
        >
          Login
        </button>
      </div>
      <div className="fade_bottom-login"></div>

      <div className="input-signup">
        <input ref={userLastName} type="text" placeholder="Username" />
        <input ref={userEmail} type="email" placeholder="Email address" />
        <input ref={userPassword} type="password" placeholder="Password" />
        <button onClick={userCreate} className="get-signup">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default SignUp;
