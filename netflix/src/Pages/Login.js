import React, { useRef, useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Login() {
  const email = useRef();
  const userPassword = useRef();
  const [userLogin, setUserLogin] = useState([]);
  const navigate = useNavigate();
  const userLoginClick = () => {
    var IsLoggedIn = false;
    let uEmail = email.current.value;
    let uPassword = userPassword.current.value;
    email.current.value = null;
    setUserLogin(() => {
      return { email: uEmail, password: uPassword };
    });
   
    const fNameParse = JSON.parse(localStorage.getItem("user_registration"));
    
    if(fNameParse !=null){
      fNameParse.map((userDetails) => {
        if (uEmail == userDetails.email && uPassword == userDetails.password ) {
          
          IsLoggedIn = true;
          swal("Login success fully completed","Explore your favourite movies");
          
          let swalB=document.querySelector('.swal-button')
  if (swalB !=null){
    swalB.addEventListener('click',()=>{
      setTimeout(()=>{
        navigate("/home", { state: { name: userDetails.name } });
        window.location.reload();
       },100)

    })
  }
        }
        
      });
  
      if (IsLoggedIn == false ) {
        swal("Login failed","Please try again");
      }
    }else{
      window.alert('No user found')
    }
    
  };
  return (
    <div className='login' >
      <div className="logo-login">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="" className="logo-image" />
        <button onClick={()=>{
          navigate('/sign_up')
        }} className="sign-up">Sign up</button>
      </div>
      <div className="fade_bottom-login"></div>
      <div className="details-login">
        <h1 className='main-head' >Unlimited movies, TV shows and more</h1>
        <h2 className="second-head-login">Watch anywhere. Cancel anytime.</h2>
        <h3 className="third-head-login">Ready to watch? Enter your email to create or restart your membership.</h3>
      </div>
      <div className="input-login">
        <input ref={email} type="email" placeholder='Email address' />
        <input ref={userPassword} type="password" placeholder='Password' />
        <button onClick={userLoginClick} className='get-started' >Login</button>
      </div>
    </div>
  )
}

export default Login
