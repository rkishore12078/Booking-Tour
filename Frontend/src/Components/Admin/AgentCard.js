import { useState, useEffect } from "react";
import '../../Css/Admin/AgentCard.css'

function AgentCard(props) {

    const [travelAgent, setTravelAgent] = useState(props.path);

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "",
            "password": "",
            "role": "",
            "token": "",
            "status": ""
        }
    );

    var userDTO;

    const [Id, setId] = useState(
        {
            "userID": 0
        }
    );


    var ChangeStatus = (event) => {

        user.userId = travelAgent.travelAgentId;
        user.status = event.target.value;
        console.log(user);

        fetch("http://localhost:5007/api/User/ChangeStatus",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },

                "body": JSON.stringify({ ...user, "user": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    userDTO = await data.json();
                    console.log(userDTO, "dto");
                    setTravelAgent(userDTO);
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }


    return (
        <div >
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}><img className="agentImage" src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${travelAgent.imagePath}`} alt="Not found" /></td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Name</td>
                        <td className="table-col">{travelAgent.name}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Phone</td>
                        <td className="table-col">{travelAgent.phone}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Age</td>
                        <td className="table-col">{travelAgent.age}</td>
                    </tr>
                    <tr className="table-row">
                        <td className="table-col">Status</td>
                        <td className="table-col">{travelAgent.agentStatus}</td>
                    </tr>

                    {
                        travelAgent.agentStatus == "Not Approved" ?
                            (
                                <tr className="table-row">
                                    <td className="table-col"><input value='Approved' onClick={ChangeStatus} className="btn btn-success button" /></td>
                                    <td className="table-col"><input value='Denied' onClick={ChangeStatus} className="btn btn-danger button" /></td>
                                </tr>
                            ) : (travelAgent.agentStatus == "Approved" ? (
                                <tr className="table-row">
                                    <td className="table-col"><input value='Approved' disabled className="btn btn-success button" /></td>
                                    <td className="table-col"><input value='Denied' onClick={ChangeStatus} className="btn btn-danger button" /></td>
                                </tr>
                            ) : (
                                <tr className="table-row">
                                    <td className="table-col"><input value='Approved' onClick={ChangeStatus} className="btn btn-success button" /></td>
                                    <td className="table-col"><input value='Denied' disabled className="btn btn-danger button" /></td>
                                </tr>
                            )
                            )
                    }
                </tbody>
            </table>

        </div>
    )
}

export default AgentCard;