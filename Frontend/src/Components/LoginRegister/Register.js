import React, { useState } from "react";
import '../../Css/LoginRegister/Register.css'
import { useNavigate } from "react-router-dom";
import { TextField, Box, Select, MenuItem } from "@mui/material";
import { toast } from 'react-toastify';
import Navbar from "../Navbar";
import { BlobServiceClient } from "@azure/storage-blob";




function Register() {

    // const inputRef=useRef(null);
    const [role, setRole] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordToggle, setPasswordToggle] = useState(false);
    var myData;
    var navigate = useNavigate();

    var checkPassword = () => {
        console.log(confirmPassword);
        if (travelAgent.password != confirmPassword)
            setPasswordToggle(true)
        else
            setPasswordToggle(false)
    }

    const [travelAgent, setTravelAgent] = useState({
        "travelAgentId": 0,
        "users": {
            "email": "kishore@gmail.com"
        },
        "name": "Kishore",
        "dateOfBirth": new Date(),
        "gender": "",
        "phone": "9879876542",
        "address": "",
        "imagePath": "",
        "agentStatus": "",
        "lastLogin": new Date(),
        "password": ""
    })


    const [traveller, setTraveller] = useState(
        {
            "travellerId": 0,
            "users": {
                "email": "kishore@gmail.com"
            },
            "name": "Kishore",
            "dateOfBirth": new Date(),
            "gender": "",
            "phone": "9898989898",
            "address": "",
            "emergencyContact": "Mathan",
            "imagePath": "",
            "travelPreference": "",
            "dietryPreference": "",
            "password": ""
        }
    )

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": "",
            "token": ""
        }
    )

    const AZURITE_BLOB_SERVICE_URL = 'http://localhost:10000';
    const ACCOUNT_NAME = 'devstoreaccount1';
    const ACCOUNT_KEY = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==';

    const [agentImages, setAgentImages] = useState([]);
    const [travellerImages, setTravellerImages] = useState([]);

    var travelAgentRegister = () => {
        console.log(travelAgent);
        console.log(traveller);

        const blobServiceClient = new BlobServiceClient(
            "http://127.0.0.1:10000/devstoreaccount1/tour?sv=2018-03-28&st=2023-08-05T12%3A31%3A44Z&se=2023-08-06T12%3A31%3A44Z&sr=c&sp=racwdl&sig=Vepsl%2F7x43ROvGIWvCdwotmTsYEcgJSfHJlLzW7G8NY%3D",
            "sv=2018-03-28&st=2023-08-05T12%3A31%3A44Z&se=2023-08-06T12%3A31%3A44Z&sr=c&sp=racwdl&sig=Vepsl%2F7x43ROvGIWvCdwotmTsYEcgJSfHJlLzW7G8NY%3D"
        );
        const containerClient = blobServiceClient.getContainerClient('tour');

        console.log(agentImages, "imgae");
        for (let i = 0; i < agentImages.length; i++) {
            const blobClient = containerClient.getBlobClient(agentImages[i].name);
            const blockBlobClient = blobClient.getBlockBlobClient();
            const result = blockBlobClient.uploadBrowserData(agentImages[i], {
                blockSize: 4 * 1024 * 1024,
                concurrency: 20,
                onProgress: ev => console.log(ev)
            });
            console.log(result, "result");
        }

        travelAgent.imagePath = agentImages[0].name;

        fetch("http://localhost:5007/api/User/TravelAgentRegister",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },

                "body": JSON.stringify({ ...travelAgent, "travelAgent": {} })
            })
            .then(async (data) => {
                if (data.status == 201) {
                    myData = await data.json();
                    settingLocalStorage();
                    validatePassword();
                    // navigate('/');
                    settingLocalStorage();
                    decide();
                    console.log(myData);
                }
                else {
                    var newData = await data.json();
                    if (newData.id == 410)
                        toast.warning('Email and PhoneNumber should be unique');
                    else if (newData.id == 420)
                        toast.warning('Server Down Try again');
                    // console.log("helo");
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
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

    var travellerRegister = () => {
        console.log(traveller);

        const blobServiceClient = new BlobServiceClient(
            "http://127.0.0.1:10000/devstoreaccount1/tour?sv=2018-03-28&st=2023-08-08T09%3A16%3A03Z&se=2023-08-09T09%3A16%3A03Z&sr=c&sp=racwdl&sig=kPkSIupboHQ2xVVJsIUF3Rwh%2BJGT7eArXhDOGj1DL1k%3D",
            "sv=2018-03-28&st=2023-08-08T09%3A16%3A03Z&se=2023-08-09T09%3A16%3A03Z&sr=c&sp=racwdl&sig=kPkSIupboHQ2xVVJsIUF3Rwh%2BJGT7eArXhDOGj1DL1k%3D"
        );
        const containerClient = blobServiceClient.getContainerClient('tour');

        console.log(travellerImages, "imgae");
        for (let i = 0; i < travellerImages.length; i++) {
            const blobClient = containerClient.getBlobClient(travellerImages[i].name);
            const blockBlobClient = blobClient.getBlockBlobClient();
            const result = blockBlobClient.uploadBrowserData(travellerImages[i], {
                blockSize: 4 * 1024 * 1024,
                concurrency: 20,
                onProgress: ev => console.log(ev)
            });
            console.log(result, "result");
        }

        traveller.imagePath = travellerImages[0].name;

        fetch("http://localhost:5007/api/User/TravellerRegister",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },

                "body": JSON.stringify({ ...traveller, "traveller": {} })
            })
            .then(async (data) => {
                if (data.status == 201) {
                    myData = await data.json();
                    settingLocalStorage();
                    validatePassword();
                    settingLocalStorage();
                    navigate('/travellerLanding');
                    console.log(myData);

                }
                else {
                    var newData = await data.json();
                    if (newData.id == 410)
                        toast.warning('Email and PhoneNumber should be unique');
                    else if (newData.id == 420)
                        toast.warning('Server Down Try again');
                }
            })
            .catch((err) => {
                console.log(err.body)
            })
    }

    var validatePassword = () => {
        if (myData.password != travelAgent.password && role=='TravelAgent')
            alert("Your Password is not strong hence your name's 1st 4 characters and dateofbirth's date and month is your password");
        if (myData.password != traveller.password && role=='Traveller')
            alert("Your Password is not strong hence your name's 1st 4 characters and dateofbirth's date and month is your password");

            // toast.warning("Your Password is not strong hence your name's 1st 4 characters and dateofbirth's date and month is your password");
    }

    var assignEmail = (event) => {
        setTravelAgent((travelAgent) => {
            return ({
                ...travelAgent, "users": { ...travelAgent.users, ["email"]: event.target.value },
            });
        })
        setTraveller((traveller) => {
            return ({
                ...traveller, "users": { ...traveller.users, ["email"]: event.target.value },
            });
        })
    }

    var settingLocalStorage = () => {
        sessionStorage.setItem("token", myData.token);
        sessionStorage.setItem("role", myData.role);
        sessionStorage.setItem("userId", myData.userId);
    }

    return (
        <div>
            <Navbar user={user} />
            <Box>
                <div className="out-container">
                    <div className="containers">
                        <div className="topic">
                            REGISTER
                        </div>

                        <div className="row">
                            <label className="col-6 titles">Role
                                <Select style={{
                                    height: "40px",
                                    width: "100%",
                                    marginTop: "5px",
                                    appearance: 'none',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    borderColor: '#70be51',
                                    borderRadius: "10px"
                                }} defaultValue={'DEFAULT'} onChange={(event) => {
                                    setRole(event.target.value)
                                }}>
                                    <MenuItem value="DEFAULT" disabled>Choose....</MenuItem>
                                    <MenuItem value='TravelAgent'>TravelAgent</MenuItem>
                                    <MenuItem value='Traveller'>Traveller</MenuItem>
                                </Select>
                            </label>


                            <label className="col-6 titles">Name
                                <TextField fullWidth variant="outlined" placeholder="Enter your Name" className="input" type="text" onBlur={(event) => {
                                    setTravelAgent({ ...travelAgent, "name": event.target.value })
                                    setTraveller({ ...traveller, "name": event.target.value })
                                }} />

                                {
                                    travelAgent.name === '' || travelAgent.name.length < 4 ? (<p className="passwords">*Name should be minimum of 4 characters</p>) : (<div></div>)
                                }</label>
                        </div>

                        <div className="row">
                            <label className="col-6 titles">Email
                                <TextField placeholder="Enter your Email" className="input" type="email" onBlur={assignEmail} />

                                {
                                    travelAgent.users.email.includes('@gmail.com') == false ? (<p className="passwords">*Enter valid Email address</p>) : (<div></div>)
                                }</label>

                            <label className="col-6 titles">Password
                                <TextField placeholder="Enter your Password" className="input" type="password" onChange={(event) => {
                                    setTravelAgent({ ...travelAgent, "password": event.target.value })
                                    setTraveller({ ...traveller, "password": event.target.value })
                                }} /></label>
                        </div>

                        <div className="row titles">
                            <label className="col-6">Confirm Password
                                <TextField placeholder="Enter confirm Password" className="input" type="password" onChange={(event) => {
                                    setConfirmPassword(event.target.value)
                                }} onBlur={checkPassword} />
                                {
                                    passwordToggle && (<p className="passwords">*Passwords are not matching</p>)
                                }
                            </label>

                            <label className="col-6 titles">Date Of Birth
                                <TextField required max={new Date().toISOString().slice(0, 10)} className="input" type="datetime-local" onBlur={(event) => {
                                    setTravelAgent({ ...travelAgent, "dateOfBirth": event.target.value })
                                    setTraveller({ ...traveller, "dateOfBirth": event.target.value })
                                }} />
                                {
                                    travelAgent.dateOfBirth > new Date().toISOString().slice(0, 10) ? (<p>Date should be less than today date</p>) : (<div></div>)
                                }
                            </label>
                        </div>

                        <div className="row titles">
                            <label className="col-6">Gender
                                <Select style={{
                                    height: "40px",
                                    width: "100%",
                                    marginTop: "5px",
                                    appearance: 'none',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    borderColor: '#70be51',
                                    borderRadius: "10px"
                                }} defaultValue={'DEFAULT'} onChange={(event) => {
                                    setTravelAgent({ ...travelAgent, "gender": event.target.value })
                                    setTraveller({ ...traveller, "gender": event.target.value })
                                }}>
                                    <MenuItem value="DEFAULT" disabled>Select...</MenuItem>
                                    <MenuItem value='Male'>Male</MenuItem>
                                    <MenuItem value='Female'>Female</MenuItem>
                                    <MenuItem value='Others'>Others</MenuItem>
                                </Select>
                            </label>

                            <label className="col-6 titles">Phone
                                <TextField placeholder="Enter your Number" className="input" type="tel" onBlur={(event) => {
                                    setTravelAgent({ ...travelAgent, "phone": event.target.value })
                                    setTraveller({ ...traveller, "phone": event.target.value })
                                }} />
                                {
                                    travelAgent.phone.trim === '' || travelAgent.phone.length != 10 ? (<p className="passwords"> *Phone Number should be 10 digits</p>) : (<div></div>)
                                }
                            </label>
                        </div>

                        <div className="row">
                            <label className="col-6 titles">Address
                                <TextField placeholder="Enter your Address" className="input" type="text" onChange={(event) => {
                                    setTravelAgent({ ...travelAgent, "address": event.target.value })
                                    setTraveller({ ...traveller, "address": event.target.value })
                                }} /></label>

                            <label className="col-6 titles">Upload Image
                                <TextField placeholder="Image" className="input" variant="outlined" type="file" onChange={(event) => { setAgentImages(event.target.files); setTravellerImages(event.target.files) }} /></label>

                        </div>

                        <div className="row">
                            {
                                role == "Traveller" &&
                                <div className="col-6">
                                    <label className="titles">DietryPreference</label>
                                    <TextField placeholder="Dietry Preferences" className="input" type="text" onBlur={(event) => {
                                        setTraveller({ ...traveller, "dietryPreference": event.target.value })
                                    }} />
                                </div>
                            }

                            {
                                role == "Traveller" &&
                                <div className="col-6">
                                    <label className="titles">TravelPreference</label>
                                    <TextField placeholder="Travel Preferences" className="input" type="text" onBlur={(event) => {
                                        setTraveller({ ...traveller, "travelPreference": event.target.value })
                                    }} />
                                    
                                </div>
                            }

                        </div>
                        <div className="row">
                            {
                                role=="Traveller" &&
                                <div className="col-6">
                                    <label className="titles">Emergency Contact</label>
                                    <TextField placeholder="Emergency Contact" className="input" type="text" onBlur={(event) => {
                                        setTraveller({ ...traveller, "emergencyContact": event.target.value })
                                    }} />
                                    
                                </div>
                            }
                        </div>
                        <div className="row">
                            {
                                role == "TravelAgent" ? (
                                    <div>
                                        <button className="btn btn-primary buttton" onClick={travelAgentRegister}>Register</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary buttton" onClick={travellerRegister}>Register</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    )
}
export default Register;