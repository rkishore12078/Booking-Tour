import Popup from "reactjs-popup";
import Feedback from "../Feedback";
import { useEffect, useState } from "react";
import '../../Css/Traveller/TravellerLanding.css'
import PackageCard from "../Package-Card";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function TravellerLanding() {

    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window.matchMedia("(min-width: 768px)").
            addEventListener("change", event => setMatches(event.matches));
    }, [])

    const customPopupStyle = {
        overflowY: 'scroll',
        width: '40%',
        height: '100%'
    };

    const customPopupStyle1 = {
        width: '70%',
        overflowY: 'scroll',
        height: '100%'
    }

    const [allPackages, setAllPackages] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [idDTO, setIdDTO] = useState(
        {
            "id": 0
        }
    )

    var navigate=useNavigate();

    var [userBookings,setUserBookings]=useState([]);

    useEffect(()=>{
        idDTO.id=Number(sessionStorage.getItem('userId'));
        fetch("http://localhost:5250/api/TourBooking/GetBookingsByUser",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify(idDTO)
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    setUserBookings(prev => {
                        const updatedArray = [...prev, myData];
                        return updatedArray;
                    })
                    userBookings=myData;
                    console.log(userBookings, "output");
                    pushNotification();
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    },[]);

    var pushNotification=()=>{
        for(let i=0;i<userBookings.length;i++)
        {
            console.log("for")
            if(userBookings[i].returnDate<new Date().toISOString().slice(0, 10))
            {
                console.log("inside notification");
                Notification.requestPermission().then(perm=>{
                    if(perm=="granted")
                    {
                        const notification=new Notification("Feedback",
                        {
                            body:'Fill the Feedback',
                            tag:'Welcome'
                        })

                        notification.addEventListener("click",event=>{
                            alert("Thanks for choosing");
                            navigate('/feedback');
                        })
                    }
                })
            }
        }
    }

    useEffect(() => {
        fetch("http://localhost:5028/api/Package/AllPackages",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    setAllPackages(myData);
                    // decideSepcialities();
                    console.log(allPackages, "allPackages");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // var decideSepcialities = () => {
    //     if (sessionStorage.getItem('userId') != null) {
    //         const sortedList = [...packages].sort((a, b) =>
    //             a['adventure'] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0
    //         );
    //     }
    // }

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "kishore@gmail.com",
            "password": "",
            "role": sessionStorage.getItem('role'),
            "token": ""
        }
    )

    return (
        <div>
            <Navbar user={user}/>
            <div className="traveller-header">
                <div className='search-container-traveller'>
                    <input className='package-search' type='text' onChange={(event) => {
                        setSearchValue(event.target.value)
                    }} placeholder='Search a specific spots' />
                    <div className="search-icon">
                        <i className="bi bi-search "></i>
                    </div>
                </div>
            </div>
            <div className="traveller-body">
                {
                    allPackages.filter((pack) => pack.packageName.toLowerCase().includes(searchValue.toLowerCase()) ||
                        pack.location.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((packages, index) => {
                            return (
                                <div key={index} onClick={()=>{sessionStorage.setItem('packageId',packages.packageId);navigate('/tripBooking');}}>
                            <PackageCard  pack={packages} 
                            /> </div>)
                        })
                }
            </div>
            {/* <Popup trigger={<button>Add feedback</button>} modal nested contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                {
                    close => (
                        <div>
                            <div onCanPlay={() => close()}>Close</div>
                            <div><Feedback /></div>
                        </div>
                    )
                }
            </Popup> */}
        </div>
    )
}

export default TravellerLanding;