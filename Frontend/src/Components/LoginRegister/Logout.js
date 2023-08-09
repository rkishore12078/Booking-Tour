import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Logout()
{

    var navigate=useNavigate();

    useEffect(() => {
        let ignore = false;

        if (!ignore) Logout()
        return () => { ignore = true; }
    }, []);

    var Logout=()=>
    {
        sessionStorage.clear('');
        navigate('/');
    }

    return(
        <div>

        </div>
    )
}

export default Logout;