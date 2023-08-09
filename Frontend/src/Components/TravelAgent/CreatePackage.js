import { useState } from 'react';
import '../../Css/TravelAgent/CreatePackage.css';
import { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { BlobServiceClient } from "@azure/storage-blob";
import { Input } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';
import Slider from 'react-slick';

function CreatePackage() {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    var navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    // var [spots, setSpots] = useState([]);
    const [selectedSpots, setSelectedSpots] = useState([]);
    const [subSpotIds, setSubSpotids] = useState([]);
    const [curIndex, setCurIndex] = useState(0);

    const [idDTO, setIdDTO] = useState(
        {
            "id": 0
        }
    )

    const [userIdDTO, setUserIdDTO] = useState(
        {
            "userID": 0
        }
    )

    const [user, setUser] = useState(
        {
            "userId": 0,
            "email": "kishore@gmail.com",
            "password": "",
            "role": sessionStorage.getItem('role'),
            "token": ""
        }
    )

    //Popup
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 768px)").matches
    )

    useEffect(() => {
        window.matchMedia("(min-width: 768px)").
            addEventListener("change", event => setMatches(event.matches));
    }, [])

    const customPopupStyle = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        width: '35%'
    };

    const customPopupStyle1 = {
        backgroundColor: "white",
        padding: "20px",
        width: '70%',
        overflowY: 'scroll',
        borderRadius: "8px",
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        margin:"auto"
        // height: '100%'
    }

    //CheckAccess
    useEffect(() => {
        userIdDTO.userID = Number(sessionStorage.getItem('userId'));

        fetch("http://localhost:5007/api/User/GetTravelAgent",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + sessionStorage.getItem('token')
                },

                "body": JSON.stringify(userIdDTO)
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    if (myData.agentStatus == "Not Approved") {
                        // alert("Your application is still in Progerss");
                        toast.warning('Your application is still in Progerss');
                        navigate('/');
                    }
                    else if (myData.agentStatus == "Denied") {
                        // alert("Sorry your application is Rejected");
                        toast.error('Sorry your application is Rejected');
                        navigate('/');
                    }
                    else
                        // alert("Welcome");
                        toast.success('Welcome');
                }
            })
            .catch((err) => {
                console.log(err.error)
            })

    }, []);

    const [iteneraries, setIteneraries] = useState([]);

    const [packages, setPackages] = useState(
        {
            "packageId": 0,
            "agentId": 0,
            "packageName": "string",
            "noOfDays": 0,
            "location": "string",
            "maxCount": 0,
            "imagePath": "string",
            "iteneraries": [
                {
                    "iteneraryId": 0,
                    "packageId": 0,
                    "day": 0,
                    "spots": [
                        {
                            "packageSpotId": 0,
                            "iteneraryId": 0,
                            "spotId": 0
                        }
                    ]
                }
            ],
            "hotels": [
                {
                    "hotelId": 0,
                    "packageId": 0,
                    "hotelName": "string",
                    "location": "string",
                    "rooms": [
                        // {
                        //     "roomId": 0,
                        //     "hotelId": 0,
                        //     "stayingDays": 0,
                        //     "checkInDate": "2023-08-02T16:52:59.834Z",
                        //     "checkOutDate": "2023-08-02T16:52:59.834Z",
                        //     "price": 0
                        // }
                    ]
                }
            ],
            "foods": [
                {
                    "foodId": 0,
                    "packageId": 0,
                    "foodType": "string",
                    "price": 0
                }
            ],
            "transports": [
                {
                    "vehicleId": 0,
                    "packageId": 0,
                    "vehicleType": "string",
                    "driverName": "string",
                    "driverNumber": "string",
                    "price": 0,
                    "availableFrom": "2023-08-02T16:52:59.834Z",
                    "availableTo": "2023-08-02T16:52:59.834Z"
                }
            ]
        });

    const [spots, setSpots] = useState([
        {
            "spotId": 0,
            "countryId": 0,
            "stateId": 0,
            "cityId": 0,
            "spotName": "string",
            "specialities": [
                {
                    "specialityId": 0,
                    "spotId": 0,
                    "specialityName": "string"
                }
            ],
            "images": [
                {
                    "imageId": 0,
                    "spotId": 0,
                    "imagePath": "string"
                }
            ]
        }]
    )

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        //GetAll countries
        fetch("http://localhost:5002/api/Tourism/GetAllCountries",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var mydata = await data.json();
                    setCountries(mydata);
                    console.log(countries, "country");
                }
            })
            .catch((err) => {
                console.log(err.error);
            })

        //GetAll Spots
        fetch("http://localhost:5002/api/Tourism/GetAllSpots",
            {
                "method": "GET",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json'
                },
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var mydata = await data.json();
                    setSpots(mydata);
                    // spots = mydata;
                    console.log(spots, "spots");
                }
            })
            .catch((err) => {
                console.log(err.error);
            })

    }, []);

    var gggggg = (data) => {
        var spot = JSON.parse(data);
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % spot.images.length);
        }); // Change image every 3 seconds

        return () => clearInterval(interval);
    };

    var getStates = (event) => {
        var country = JSON.parse(event.target.value);
        idDTO.id = country.id;
        fetch("http://localhost:5002/api/Tourism/GetStateByCountry",
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
                    setStates(myData);
                    console.log(states, "states");
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var getCities = (event) => {
        var state = JSON.parse(event.target.value);
        idDTO.id = state.id;
        fetch("http://localhost:5002/api/Tourism/GetCityByState",
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
                    setCities(myData);
                    console.log(cities, "cities");
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var getSpots = (event) => {
        var city = JSON.parse(event.target.value);
        idDTO.id = city.id;
        console.log(idDTO.id, "cityid");
        fetch("http://localhost:5002/api/Tourism/GetSpotByCity",
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
                    setSpots(myData);
                    console.log(spots, "spots");
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }


    var storeSelectedSpots = (data) => {
        var spot = JSON.parse(data);
        var flag = 0;
        for (let i = 0; i < selectedSpots.length; i++) {
            if (selectedSpots[i].spotId == spot.spotId) {
                selectedSpots.splice(i, 1);
                setSelectedSpots([]);
                setSelectedSpots([...selectedSpots]);
                flag = 1;
            }
        }
        if (flag == 0)
            setSelectedSpots([...selectedSpots, spot]);
    }

    var setDays = (event) => {
        setIteneraries([]);
        // setPackages({...packages,"noOfDays":Number(event.target.value)});
        packages.noOfDays = Number(event.target.value);
        console.log(packages.noOfDays);
        const updatedArray = [];
        for (let i = 0; i < packages.noOfDays; i++) {
            updatedArray[i] = { ...packages.iteneraries };
        }
        setIteneraries(updatedArray);
    }

    var storeSubSelectedSpots = (data) => {
        var spot = JSON.parse(data);
        var flag = 0;
        for (let i = 0; i < subSpotIds.length; i++) {

        }
        const spotObject = new Object();
        spotObject.packageSpotId = 0;
        spotObject.iteneraryId = 0;
        spotObject.spotId = spot.spotId;
        setSubSpotids([...subSpotIds, spotObject]);
        console.log(subSpotIds, "sub");
    }

    var assignIteneraries = () => {
        setPackages({ ...packages, "iteneraries": iteneraries });
        packages.iteneraries = iteneraries;
        console.log(packages, "check iteneraries");

    }

    var onSaveItenerary = (index) => {
        iteneraries[index].day = index + 1;
        iteneraries[index].spots = subSpotIds;
        setSubSpotids([]);
        // setCurIndex(index);
        console.log(curIndex, "curIndex");
        console.log(iteneraries[index], 'dyuyjs');
    }

    var setCurrentIndex = (index) => {
        setCurIndex(index);
    }

    //Hotel Adding
    const [hotel, setHotel] = useState({
        "hotelId": 0,
        "packageId": 0,
        "hotelName": "string",
        "location": "string",
        "rooms": [
            // {
            //     // "roomId": 0,
            //     // "hotelId": 0,
            //     // "stayingDays": 0,
            //     // "checkInDate": "2023-08-02T16:52:59.834Z",
            //     // "checkOutDate": "2023-08-02T16:52:59.834Z",
            //     // "price": 0
            // }
        ]
    })

    const [room, setRoom] = useState({
        "roomId": 0,
        "hotelId": 0,
        "stayingDays": 0,
        "checkInDate": "2023-08-02T16:52:59.834Z",
        "checkOutDate": "2023-08-02T16:52:59.834Z",
        "price": 0
    })

    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    var i = 0;

    useEffect(() => {

    }, [rooms]);

    //Transport
    const [transport, setTransport] = useState(
        {
            "vehicleId": 0,
            "packageId": 0,
            "vehicleType": "string",
            "driverName": "string",
            "price": 0,
            "driverNumber": "string",
            "availableFrom": "2023-08-02T16:52:59.834Z",
            "availableTo": "2023-08-02T16:52:59.834Z"
        }
    )

    var setVehicleType = (data) => {
        setTransport({ ...transport, "vehicleType": data });
    }

    const [transports, setTransports] = useState([]);

    //Food
    const [food, setFood] = useState({
        "foodId": 0,
        "packageId": 0,
        "foodType": "string",
        "price": 0
    });

    const [foods, setFoods] = useState([]);

    //Image Upload
    const AZURITE_BLOB_SERVICE_URL = 'http://localhost:10000';
    const ACCOUNT_NAME = 'devstoreaccount1';
    const ACCOUNT_KEY = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==';

    const [images, setImages] = useState([]);

    //Save Package
    var savePackage = () => {
        // setPackages({...packages,"hotels":hotels,"transports":transports,"foods":foods});
        packages.agentId = Number(1);
        packages.hotels = hotels;
        packages.transports = transports;
        packages.foods = foods;
        // setPackages({...packages,"hotels":hotels});
        // setPackages({...packages,"transports":transports});
        // setPackages({...packages,"foods":foods});

        const blobServiceClient = new BlobServiceClient(
            "http://127.0.0.1:10000/devstoreaccount1/tour?sv=2018-03-28&st=2023-08-08T09%3A16%3A03Z&se=2023-08-09T09%3A16%3A03Z&sr=c&sp=racwdl&sig=kPkSIupboHQ2xVVJsIUF3Rwh%2BJGT7eArXhDOGj1DL1k%3D",
            "sv=2018-03-28&st=2023-08-08T09%3A16%3A03Z&se=2023-08-09T09%3A16%3A03Z&sr=c&sp=racwdl&sig=kPkSIupboHQ2xVVJsIUF3Rwh%2BJGT7eArXhDOGj1DL1k%3D"
        );
        const containerClient = blobServiceClient.getContainerClient('tour');

        console.log(images, "imgae");
        for (let i = 0; i < images.length; i++) {
            const blobClient = containerClient.getBlobClient(images[i].name);
            const blockBlobClient = blobClient.getBlockBlobClient();
            const result = blockBlobClient.uploadBrowserData(images[i], {
                blockSize: 4 * 1024 * 1024,
                concurrency: 20,
                onProgress: ev => console.log(ev)
            });
            console.log(result, "result");
        }

        packages.imagePath = images[0].name;

        //setLocation
        packages.location = selectedSpots.map(item => item.spotName).join(', ');

        console.log(packages, "final");

        fetch("http://localhost:5028/api/Package/AddPackage",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({ ...packages, "packages": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    console.log(myData, "output");
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    const [carouselImages, setCarouselImages] = useState([
        '../../Images/guingynationalpark1.jpg',
        '../../Images/guingynationalpark2.jpg',
        '../../Images/guingynationalpark3.jpg'
    ])

    const carousalInner = document.querySelector(".carousel-inner");
    console.log(carouselImages.length, "length")
    // carouselImages.map((image, index) => {
    //     let classes = (index === 0) ? "carousel-item active" : "carousel-item";
    //     carousalInner.innerHTML += `
    //   <div class="${classes}">
    //     <img src="${require(image)}" class="d-block w-100" alt="Image${index}">
    //   </div>
    // `;
    // })

    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };


    return (
        <div className='package-body'>
            <Navbar user={user} />
            <div className='slider-container'>
                <div className="createPackage-carousel">
                    <Slider {...settings}>
                        {carouselImages.map((image, index) => (
                            <div key={index}>
                                <img className="createPackage-carousel" src={require(`../../Images/mahabalipuram${index + 1}.jpg`)} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className='package-header' >

                    <h2 className='package-header-text'>Create a Package</h2>

                    <div className='search-container'>
                        <input className='package-search' type='text' onChange={(event) => {
                            setSearchValue(event.target.value)
                        }} placeholder='Search a specific spots' />
                        <div className="search-icon">
                            <i className="bi bi-search "></i>
                        </div>
                    </div>

                    <div className='package-filter-text'>
                        <p>Select a spot by Filters</p>
                    </div>
                    <div className='package-filters'>
                        <div className='package-filter-items'>
                            <h4 className='package-header-text'>Country</h4>
                            <select className='package-dropdown' onChange={getStates}>
                                {
                                    countries.map((country, index) => {
                                        return (<option key={index} value={JSON.stringify(country)}>{country.name}</option>)
                                    })
                                }
                            </select>
                        </div>

                        <div className='package-filter-items'>
                            <h4 className='package-header-text'>State</h4>
                            <select className='package-dropdown' onChange={getCities}>
                                {
                                    states.map((state, index) => {
                                        return (<option key={index} value={JSON.stringify(state)}>{state.name}</option>)
                                    })
                                }
                            </select>
                        </div>

                        <div className='package-filter-items'>
                            <h4 className='package-header-text'>City</h4>
                            <select className='package-dropdown' onChange={getSpots}>
                                {
                                    cities.map((city, index) => {
                                        return (<option key={index} value={JSON.stringify(city)}>{city.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>


            <div className='package-content'>
                <div className='spot-add-symbol'>
                    <span onClick={() => { navigate('/addSpot') }}><i class="bi bi-plus-circle"></i></span>
                </div>
                <div className='package-spots'>
                    <div className='list-of-spots'>
                        <table className='table-container1'>
                            <tbody className='tbodyiii'>
                                {
                                    spots.filter((spot) => spot.spotName.toLowerCase().includes(searchValue.toLowerCase())).
                                        map((spot, index) => {
                                            return (<tr className='spot-image-row' onClick={() => storeSelectedSpots(JSON.stringify(spot))} key={index}>
                                                <td className='outer-td spot-image-cell'>
                                                    {/* {gggggg(JSON.stringify(spot))}
                                                    {
                                                        spot.images.map((image,index)=>{
                                                            return(<img style={{ display: index === currentImageIndex ? 'block' : 'none' }} key={index} src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${image.imagePath}`}/>)
                                                        })
                                                    } */}
                                                    <img className='spot-image' src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${spot.images[0].imagePath}`} />
                                                </td>
                                                <td className='spot-image-cell'>{spot.spotName}</td>
                                                <td className='spot-image-cell'>
                                                    {
                                                        spot.specialities.map((speciality, index) => {
                                                            return (<span className='speciality-name' key={index}>{speciality.specialityName}</span>)
                                                        })
                                                    }
                                                </td>
                                            </tr>)
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='selected-spots'>
                        {
                            selectedSpots.map((spot, index) => {
                                return (<p className='selected-spot-names' key={index}>{spot.spotName}</p>)
                            })
                        }
                    </div>
                </div>
                <div className='package-inputs'>
                    <input placeholder='Enter the Package Name' className='package-input' type='text' onChange={(event) => {
                        setPackages({ ...packages, "packageName": event.target.value })
                    }} />
                    {/* <input type='text' onChange={(event) => {
                        setPackages({ ...packages, "location": event.target.value })
                    }} /> */}
                    <input placeholder='Enter maximum count for the package' className='package-input' type='number' onChange={(event) => {
                        setPackages({ ...packages, "maxCount": Number(event.target.value) })
                    }} />
                </div>

                <div className='days-selection'>
                    <div>
                        <p className='package-p'>Select Iteneraries...</p>
                    </div>
                    <select className='package-dropdown' onChange={setDays}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
                <div>
                    {
                        iteneraries.map((itenerary, index) => {
                            return (
                                <div className='itenerary-container' key={index}>
                                    <h2 onClick={() => setCurrentIndex(index)}>Day {index + 1}</h2>
                                    {curIndex == index &&
                                        <div className='inner-container'>
                                            {
                                                selectedSpots.map((spot, index) => {
                                                    return (<div className='selected-spot-container' onClick={() => storeSubSelectedSpots(JSON.stringify(spot), index)} key={index}>
                                                        <span className='outer-itenerery'><img className='itenerary-image' src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${spot.images[0].imagePath}`} /></span>
                                                        <span className='speciality-name'>{spot.spotName}</span>
                                                    </div>)
                                                })
                                            }

                                        </div>
                                    }
                                    <span>
                                        <button onClick={() => onSaveItenerary(index)}>Add</button>
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={assignIteneraries}>save</button>
                {
                    hotels.map((hotel, index) => {
                        return (
                            <div key={index} className='hotel-body'>
                                <div>
                                    <div className='outer-itenerery'><img className='itenerary-image' src={require('../../Images/hotel.png')} /></div>
                                    <p>{hotel.hotelName}</p>
                                </div>
                                {
                                    hotel.rooms.map((room, index) => {
                                        return (<div key={index}>
                                            <div><svg className='room-image' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M22 21H2v-2h1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1v2zm-5-2h2v-8h-6v8h2v-6h2v6zm0-10V5H5v14h6V9h6zM7 11h2v2H7v-2zm0 4h2v2H7v-2zm0-8h2v2H7V7z" /> </g> </svg></div>
                                            <p>{room.price}</p>
                                        </div>)
                                    })
                                }
                                <Popup trigger={<button>AddRoom</button>} nested modal contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                                    {
                                        close => (
                                            <div className='hotel-popup'>
                                                <svg onClick=
                                                    {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                                </svg>
                                                <label>Price</label>
                                                <input className='hotel-inputs' type='number' onChange={(event) => {
                                                    setRoom({ ...room, "price": Number(event.target.value) })
                                                }} />
                                                <button className='hotel-button' onClick={() => {
                                                    // const updatedList = [...rooms];
                                                    // updatedList[index].rooms = room; // Replace with your updated list data
                                                    // setRooms(updatedList);
                                                    setRooms(prev => {
                                                        const updatedArray = [...prev, room]
                                                        return updatedArray;
                                                    });

                                                    console.log(rooms, "room");
                                                    hotel.rooms = rooms;
                                                    console.log(hotels, "after room");
                                                    setHotels((prevList) =>
                                                        prevList.map((item, i) =>
                                                            i === index ? { ...item, "rooms": rooms } : item
                                                        )
                                                    );
                                                    close();
                                                }}>Add</button>
                                            </div>
                                        )
                                    }
                                </Popup>
                            </div>
                        )
                    })
                }
                <div>
                    <Popup
                        trigger={
                            <button className='btn btn-primary' >Add Hotel</button>
                        } modal
                        nested contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                        {
                            close => (
                                <div>
                                    <div className='popUp-closeButton'>
                                        <svg onClick=
                                            {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                        </svg>
                                    </div>
                                    <div className='hotel-popup'>
                                        <label>Hotel Name</label>
                                        <input className='hotel-inputs' type='text' onChange={(event) => {
                                            setHotel({ ...hotel, "hotelName": event.target.value });
                                        }} />
                                        <label>Location</label>
                                        <input className='hotel-inputs' type='text' onChange={(event) => {
                                            setHotel({ ...hotel, "location": event.target.value });
                                        }} />
                                        <button className='hotel-button' onClick={() => {
                                            setHotels(prev => {
                                                const updatedArray = [...prev, hotel]
                                                return updatedArray;
                                            })
                                            // setPackages({...packages,"hotels":hotels});
                                            setRooms([]);
                                            close();
                                        }}>Add</button>
                                    </div>
                                </div>
                            )
                        }
                    </Popup>
                </div >
                <div className='transport-body'>
                    {
                        transports.map((transport, index) => {
                            return (<div className='individual-vehicle-card' key={index}>
                                <div>
                                    {
                                        transport.vehicleType == 'car' && <span className='transport-img-outer' ><img className='transport-img-inner' src={require('../../Images/car.png')} /></span>
                                    }
                                    {
                                        transport.vehicleType == 'van' && <span className='transport-img-outer' ><img className='transport-img-inner' src={require('../../Images/van.png')} /></span>

                                    }
                                    {
                                        transport.vehicleType == 'bus' && <span className='transport-img-outer' ><img className='transport-img-inner' src={require('../../Images/bus.png')} /></span>

                                    }
                                </div>
                                <p className='transport-text'>{transport.driverName}</p>
                                <p className='transport-text'>{transport.driverNumber}</p>
                            </div>)
                        })
                    }
                </div>
                <div>
                    <Popup
                        trigger={
                            <button >Add Transport</button>
                        }
                        nested modal contentStyle={matches ? customPopupStyle : customPopupStyle1} >
                        {
                            close => (
                                <div>
                                    <div className='popUp-closeButton'>
                                        <svg onClick=
                                            {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                        </svg>
                                    </div>
                                    <div className='hotel-popup'>
                                        <label>Vehicle Type</label>
                                        <div>
                                            <span onClick={() => setVehicleType('bus')} className='transport-img-outer' ><img className='transport-img-inner' src={require('../../Images/bus.png')} /></span>
                                            <span onClick={() => setVehicleType('car')} className='transport-img-outer' ><img className='transport-img-inner' src={require('../../Images/car.png')} /></span>
                                            <span onClick={() => setVehicleType('van')} className='transport-img-outer' ><img className='transport-img-inner' src={require('../../Images/van.png')} /></span>
                                        </div>
                                        <label>Driver Name</label>
                                        <input className='hotel-inputs' type='text' onChange={(event) => {
                                            setTransport({ ...transport, "driverName": event.target.value });
                                        }} />
                                        <label>Driver Number</label>
                                        <input className='hotel-inputs' type='text' onChange={(event) => {
                                            setTransport({ ...transport, "driverNumber": event.target.value });
                                        }} />
                                        <label>Price</label>
                                        <input className='hotel-inputs' type='text' onChange={(event) => {
                                            setTransport({ ...transport, "price": event.target.value });
                                        }} />
                                        <button className='hotel-button' onClick={() => {
                                            setTransports([...transports, transport]);
                                            close();
                                        }}>Add</button>
                                    </div>
                                </div>
                            )
                        }
                    </Popup>
                </div>
                <div className='transport-body'>
                    {
                        foods.map((food, index) => {
                            return (<div className='individual-vehicle-card' key={index}>
                                <p className='transport-text'>{food.foodType}</p>
                                <p className='transport-text'>{food.price}</p>
                            </div>)
                        })
                    }
                </div>
                <div>
                    <Popup
                        trigger={
                            <button >Add Foods</button>
                        }
                        nested modal contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                        {
                            close => (
                                <div className='hotel-popup'>
                                    <div className='popUp-closeButton'>
                                        <svg onClick=
                                            {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                        </svg>
                                    </div>
                                    <label>Food Type</label>
                                    <input className='hotel-inputs' type='text' onChange={(event) => {
                                        setFood({ ...food, "foodType": event.target.value });
                                    }} />
                                    <label>Food Price</label>
                                    <input className='hotel-inputs' type='text' onChange={(event) => {
                                        setFood({ ...food, "price": Number(event.target.value) });
                                    }} />
                                    <button className='hotel-button' onClick={() => {
                                        setFoods([...foods, food]);
                                        close();
                                    }}>Add</button>
                                </div>
                            )
                        }
                    </Popup>
                </div>
                <div >
                    <h4>Upload image for Package</h4>
                    <Input onChange={(event) => setImages(event.target.files)} type='file' variant="outlined" multiple />
                </div>
            </div>
            <button className='createPackage-image' onClick={savePackage}>Save Package</button>
        </div>
    )
}

export default CreatePackage;