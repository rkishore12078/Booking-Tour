import { Navigate } from "react-router-dom";

function TravelAgent({token,children})
{
    token=sessionStorage.getItem("token"); 
    if(token!=null)
        return children;
    return <Navigate to='/'/>
}

export default TravelAgent;