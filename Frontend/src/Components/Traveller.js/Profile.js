import { useEffect, useState } from "react"
import '../../Css/Traveller/Profile.css'
import MyBookings from "./MyBookings";
import Navbar from "../Navbar";

function Profile()
{


    const [user, setUser] = useState(
        {
            "userId": 0,
              "email": "",
              "role": sessionStorage.getItem('role'),
              "passwordHash": "",
              "passwordKey": "",
              "resetPsswordToken": "",
              "resetPsswordTokenExpiry": new Date()
        }
    )

    const[traveller,setTraveller]=useState(
        {
            "travellerId": 0,
            "name": "string",
            "phone": "string",
            "address": "string",
            "emergencyContact": "",
            "imagePath": "string",
            "travelPreference": "string",
            "dietryPreference": "string",
            "password": "string"
        }
    );

    const [Id,setId]=useState(
        {
            "userID":0
        }
    );

    const[password,setPassword]=useState(
        {
            "userID": 0,
            "newPassword": "string"
        }
    )

    const[toggle,setToggle]=useState(true);
    const[togglePassword,setTogglePassword]=useState(true);

    useEffect(() => {
        let ignore = false;

        if (!ignore) getTraveller();
        getBookings();
        return () => { ignore = true; }
    }, []);

    //Profile
    var getTraveller=()=>
    {
        Id.userID=Number(sessionStorage.getItem("userId"));
        console.log(Id.userID);
        fetch("",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },

            "body":JSON.stringify({...Id})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setTraveller(await data.json());
                // getPatient();
                console.log(traveller);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var updateDetails=()=>{
        setToggle(true);
        traveller.travellerId= Number(sessionStorage.getItem("userId"));
        fetch("",
        {
            "method":"PUT",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },

            "body":JSON.stringify({...traveller,"traveller":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setTraveller(await data.json());
                getTraveller();
                console.log(traveller,"traveller");
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    var updatePassword=()=>
    {
        password.userID=Number(sessionStorage.getItem("userId"));
        console.log(password.userID);
        console.log(password.newPassword);
        fetch("",
        {
            "method":"PUT",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },

            "body":JSON.stringify({...password,"password":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setTogglePassword(false);
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    //Bookings

    const[bookings,setBookings]=useState([]);

    var getBookings=()=>{
        Id.userID=Number(sessionStorage.getItem("userId"));
        fetch("",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            },

            "body":JSON.stringify({...Id})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                setBookings(await data.json());
                // getPatient();
                console.log(bookings,"bookings");
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }

    return(
        <div>
             <Navbar user={user}/>

            <div className="profile-body">
            <div class="page-content page-container" id="page-content">
                    <div class="padding">
                        <div class="row container d-flex justify-content-center">
                            <div class="col-xl-8 col-md-12 card-bdy">
                                <div class="card user-card-full">
                                    <div class="row m-l-0 m-r-0">
                                        <div class="col-sm-4 bg-c-lite-green user-profile">
                                            <div class="card-block text-center text-white">
                                                <div class="m-b-50">
                                                    <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image" />
                                                </div>
                                                {/* <div className="titles">Name</div> */}
                                                { toggle ? (<div id="name-title">{traveller.name}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={traveller.name} type="text" onChange={(event)=>{
                                                                    setTraveller({...traveller,"name":event.target.value})
                                                                }}/>
                                                            </div>)
                                                }
                                                {/* <div>Age: {traveller.age}</div> */}
                                                <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="card-block">
                                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                    <div className="titles">Phone</div>
                                                    { toggle ? (<div>{traveller.phone}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={traveller.phone} type="tel" onChange={(event)=>{
                                                                    setTraveller({...traveller,"phone":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                    <div class="col-sm-4">
                                                    <div className="titles">Address</div>
                                                    { toggle ? (<div>{traveller.address}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={traveller.address} type="text" onChange={(event)=>{
                                                                    setTraveller({...traveller,"address":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                    <div className="col-sm-4">
                                                    <div className="titles">ContactName</div>
                                                    { toggle ? (<div>{traveller.emergencyContact}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={traveller.emergencyContact} type="text" onChange={(event)=>{
                                                                    setTraveller({...traveller,"emergencyContact":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                </div>
                                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                                                <div class="row">
                                                    <div class="col-sm-4">
                                                    <div className="titles">Dietry Preferences</div>
                                                    { toggle ? (<div>{traveller.dietryPreference}</div>):
                                                            (<div>
                                                                <input id="ins" className="inputs" value={traveller.dietryPreference} type="text" onChange={(event)=>{
                                                                    setTraveller({...traveller,"dietryPreference":event.target.value})
                                                                }}/>
                                                            </div>)
                                                    }
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div>
                                                            <button disabled={toggle==false} className="btn btn-primary inner-button rowTwo" onClick={()=>{
                                                                setToggle(false);
                                                            }}>Update</button>
                                                        </div>
                                                        <div>
                                                            <button className="btn btn-primary inner-button rowTwo" disabled={toggle} onClick={updateDetails}>Submit</button>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div>
                                                            <button onClick={updatePassword} className="btn btn-primary inner-button rowTwo" >Password</button>
                                                        </div>
                                                        <div>
                                                            {togglePassword?(<input id="ins" className="inputs" type="password" onChange={(event)=>{
                                                                setPassword({...password,"newPassword":event.target.value})
                                                            }}/>):(<p>Password Updated...</p>)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="your-bookings">
                {
                    bookings.map((pack,index)=>{
                        return(
                        <div>
                            <MyBookings key={index} book={pack}/>
                            <div>Cancel</div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;