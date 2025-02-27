import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from "react";


const LoginSignup = () => {

    const [state,setState]= useState("Login");
    const [formData,setFormData]= useState({
        username:"",
        password:"",
        email:""
    })

    const changeHendler= (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const login = async ()=>{
        console.log("Login Function Executed", formData);
        let responseData;
        await fetch('https://api.shopmart10.shop/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData), 
        }).then((respons)=> respons.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            localStorage.setItem('userId', responseData.userId); // Simpan userId
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }

    }

    const signup = async ()=>{
        console.log("Signup Function Executed",formData);
        let responseData;
        await fetch(https://api.shopmart10.shop/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData), 
        }).then((respons)=> respons.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            localStorage.setItem('userId', responseData.userId); // Simpan userId
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }

    }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
            {state==="Sign Up"?
            <input name='username' value={formData.username} onChange={changeHendler} type="text" placeholder='Your Name'/>:<></>}
            <input name='email' value={formData.email} onChange={changeHendler} type="text" placeholder='Email Address'/>
            <input name='password' value={formData.password} onChange={changeHendler} type="password" placeholder='password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :  <p className="loginsignup-login">Create an account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
        <div className="loginsignup-agree">
            <input type="checkbox" name='' id= '' />
            <p>By continuing, i gree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
