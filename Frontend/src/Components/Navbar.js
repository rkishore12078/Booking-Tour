import React, { useEffect, useState } from 'react';
import '../Css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Login from './LoginRegister/Login';

function Navbar(props) {

    var navigate = useNavigate();
    const [user, setUser] = useState(props.user);

    var goingToHome = () => {
        navigate('/home');
    }

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window.matchMedia("(min-width: 768px)").
            addEventListener("change", event => setMatches(event.matches));
        console.log(user.role,"role");
    }, [])

    const customPopupStyle = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        width: '35%'
    };

    const customPopupStyle1 = {
        width: '70%',
        overflowY: 'scroll',
        height: '100%'
    }

    const[toggle,setToggle]=useState(false);

    return (
        <div>
            <div className="nav">
                <input type="checkbox" id="nav-check" />
                <div className="nav-header">
                    <div>
                        <img onClick={goingToHome} className='logo-img' width={200} height={80} src={require('../Images/logo.png')} />
                    </div>
                </div>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>

                <div className="nav-links menu-items">
                    { user.role=='Traveller' || user.role=='' || user.role==null&&
                    <Link className='a' to='/travellerLanding'>Packages</Link>
                    }
                    {
                        user.role == "Admin" && <span>
                            <Link className='a' to='/adminPage'>Approve Agents</Link>
                            <Link className='a'>Agents Logs</Link>
                            <Link className='a' to='/logout'>Logout</Link>
                        </span>
                    }
                    {
                        user.role == 'Travel Agent' && <span>
                            <Link className='a' to='/createPackage'>Create Package</Link>
                            {/* <Link className='a' to='/profile'>Your Packages</Link> */}
                            <Link className='a' to='/logout'>Logout</Link>
                        </span>
                    }
                    {
                        user.role == 'Traveller' && <span>
                            <Link className='a' to='/travellerLanding'>Packages</Link>
                            <Link className='a' to='/tripBooking'>Book Tour</Link>
                            <Link className='a' to='/profile'>Your Bookings</Link>
                            <Link className='a' to='/logout'>Logout</Link>
                        </span>
                    }
                    {
                         user.role=='' || user.role == null && <span>
                            <Popup trigger={<Link className='a' to=''>Login</Link>} nested modal contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                                {
                                    close => (
                                        <div className='hotel-popup'>
                                            <svg onClick=
                                                {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                            </svg>
                                            <div>
                                                <Login closeLogin={(data)=>{setToggle(data); console.log(toggle)}}/>
                                                {
                                                    toggle && close()
                                                }
                                            </div>
                                        </div>

                                    )
                                }
                            </Popup>
                            <Link className='a' to='/register'>Register</Link>
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;