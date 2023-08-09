import { useState, useEffect } from "react";
import '../../Css/Admin/AdminLanding.css'
import {toast } from 'react-toastify';
import AgentCard from "./AgentCard";
import Navbar from "../Navbar";


function AdminLanding() {

    const [travelAgents, setTravelAgents] = useState([]);
    const[search,setSerach]=useState('');
    const[enteredStatus,setEnteredStatus]=useState(
        {
            "agentStatus": ""
        }
    );

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": sessionStorage.getItem("role"),
            "token": ""
        }
    )

    useEffect(() => {
        let ignore = false;

        if (!ignore) getAllTravelAgents()
        return () => { ignore = true; }
    }, []);

    var getAllTravelAgents = () => {
        fetch("http://localhost:5007/api/User/GetAllTravelAgents",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
            })
            .then(async (data) => {
                if (data.status == 200) {
                    setTravelAgents(await data.json());
                    console.log(travelAgents);
                    console.log("inside")
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    var travelAgentFilter=(event)=>{
        setTravelAgents([]);
        enteredStatus.agentStatus=event.target.value;
        console.log(enteredStatus);
        if(enteredStatus.status=="All")
            getAllTravelAgents();
        else{
        fetch("http://localhost:5007/api/User/TravelAgentFilter",
        {
            "method":"POST",
            headers:{
                "accept": "text/plain",
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },

            "body":JSON.stringify({ ...enteredStatus,"enteredStatus":{}})
        })
        .then(async (data)=>
        {
            if(data.status == 200)
            {
                var myData=await data.json();
                console.log(myData)
                setTravelAgents(myData);
                console.log(travelAgents);
            }
            else{
                var newData=await data.json();
                if(newData.id==404)
                    toast.warning('No TravelAgents found');
            }
        })
        .catch((err)=>
        {
                console.log(err.error)
        })
    }
    }


    return (
        <div className="AdminLanding premthelegend">
            <Navbar user={user}/>
            <input id="search-input" className="inputs" placeholder="Search here.." onChange={(event)=>{
                setSerach(event.target.value)
            }}/>
            <div className="radio-buttons">
                <label className="lbl">
                    <input className="radio"
                        type="radio"
                        value="All"
                        name="options"
                        onChange={travelAgentFilter}
                    />
                    All
                </label>
                <label className="lbl">
                    <input className="radio"
                        type="radio"
                        value="Approved"
                        name="options"
                        onChange={travelAgentFilter}
                    />
                    Approved
                </label>

                <label className="lbl">
                    <input className="radio"
                        type="radio"
                        value="Denied"
                        name="options"
                        onChange={travelAgentFilter}
                    />
                    Denied
                </label>
            </div>
            <div className="GetAll">
                {
                    travelAgents.filter((travelAgent) =>
                        
                    search.trim() === '' || travelAgent.name.toLowerCase().includes(search.toLowerCase()))
                    .map((travelAgent, index) => {
                        return (<AgentCard key={index} path={travelAgent} />)
                    })
                    
                }
            </div>
        </div>
    )
}
export default AdminLanding;