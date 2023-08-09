import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import React, { useState,useEffect } from "react";
import { Box,Stack,TextField,CircularProgress} from "@mui/material";
import {toast } from 'react-toastify';
import '../../Css/LoginRegister/Login.css';


function Login(props) {

    const[credential,setCredentail]=useState('');
    const [emailDTO, setEmailDTO] = useState(
        {
            "email": ""
        }
    )
    const [toggle, setToggle] = useState(false)

    var [userDTO, setUserDTO] = useState(
        {
            "userId": 0,
            "email": "kishore@gmail.com",
            "password": "",
            "role": "",
            "token": "",
            "status": ""
        }
    )
    var myData;

    useEffect(()=>{
        removingLocalStorage();
    },[]);

    var navigate=useNavigate();

    var login = () => {
        fetch("http://localhost:5007/api/User/Login",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({ ...userDTO, "userDTO": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    myData = await data.json();
                    userDTO=myData;
                    setUserDTO(myData);
                    console.log(userDTO);
                    settingLocalStorage();
                    decide();
                }
                else {
                    var newData = await data.json();
                    if (newData.id == 400)
                        toast.warning('Invalid Username or Password');
                    else if (newData.id == 420)
                        toast.warning('Server Down Try again');
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var settingLocalStorage = () => {
        sessionStorage.setItem('token', myData.token);
        sessionStorage.setItem('role', myData.role);
        sessionStorage.setItem('userId', myData.userId);
    }
    var decide=()=>
    {
        if(myData.role==="Admin")
        {
            toast.success('Success');
            navigate('/adminPage');
        }
        else if(myData.role==="Travel Agent")
        {
            //toast.success('Success');
            navigate('/createPackage');
        }
        else if(myData.role==="Traveller")
        {
            toast.success('Success');
            navigate('/travellerLanding');
        }
    }

    var removingLocalStorage=()=>{
        sessionStorage.clear(" ");
        // localStorage.clear("role");
        // localStorage.clear("userId");
    }

    return (
        <div>
            <Box className="content">
                <Stack spacing={2} className="form">
                    <h2 className="title">Login</h2>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        title="Username"
                        name="username"
                        onBlur={(event) => {
                            setUserDTO({ ...userDTO, "email": event.target.value });
                        }}
                        placeholder="Enter Username"

                        fullWidth
                    />
                    {
                        userDTO.email.includes('@') == false ? (<p className="passwords">*Enter valid Email address</p>) : (<div></div>)
                    }
                    <TextField
                        id="password"
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        onBlur={(event) => {
                            setUserDTO({ ...userDTO, "password": event.target.value })
                        }}
                        // helperText="Password must be atleast 6 characters length"
                        fullWidth

                        placeholder="Enter a password with minimum 6 characters"
                    />
                    {false ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <button className="btn btn-primary" variant="contained"
                            onClick={login}
                        >
                            LOGIN
                        </button>
                    )}
                    <p className="secondary-action">

                        <Link className="link" to="/register" >
                            Register now
                        </Link>

                        <Link className="link" to='/forgotPassword'>
                            ForgotPassword
                        </Link>
                    </p>
                    <div>
                        {credential}
                    </div>
                </Stack>
            </Box>
        </div>
    )
}

export default Login;