import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import '../../Css/Traveller/TripBooking.css'
import { useDispatch, useSelector } from 'react-redux';
import Login from "../LoginRegister/Login";
import { toast } from 'react-toastify';
import Navbar from "../Navbar";
import { Modal } from "@mui/material";
import ReactModal from "react-modal";
import InvoicePage from "../InvoicePage";
import { useNavigate } from "react-router-dom";
import '../../Css/Traveller/People.css'


function TripBooking(props) {
    const [idDTO, setIdDTO] = useState({
        "id": 0
    });

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
        margin: "auto"
    }


    const [packages, setPackages] = useState(
        {
            "packageId": 0,
            "agentId": 0,
            "packageName": "",
            "noOfDays": 0,
            "location": "",
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
                    "hotelName": "",
                    "location": "",
                    "rooms": [
                        {
                            "roomId": 0,
                            "hotelId": 0,
                            "stayingDays": 0,
                            "checkInDate": new Date(),
                            "checkOutDate": new Date(),
                            "price": 0
                        }
                    ]
                }
            ],
            "foods": [
                {
                    "foodId": 0,
                    "packageId": 0,
                    "foodType": "",
                    "price": 0
                }
            ],
            "transports": [
                {
                    "vehicleId": 0,
                    "packageId": 0,
                    "vehicleType": "",
                    "driverName": "",
                    "driverNumber": "",
                    "price": 0,
                    "availableFrom": new Date(),
                    "availableTo": new Date()
                }
            ]
        }
    )

    const [booking, setBooking] = useState({
        "bookingId": 0,
        "peopleCount": 0,
        "packageId": 0,
        "travellerId": 0,
        "location": "string",
        "bookingDate": new Date(),
        "departureDate": new Date(),
        "returnDate": new Date(),
        "price": 0,
        "vehicleId": 0,
        "bookedHotels": [
            {
                "id": 0,
                "hotelId": 0,
                "roomId": 0,
                "bookingId": 0
            }
        ],
        "bookedFoods": [
            {
                "id": 0,
                "bookingId": 0,
                "bookings": "",
                "foodId": 0,
                "count": 0,
                "price": 0
            }
        ],
        "peoples": [
            {
                "peopleId": 0,
                "bookingId": 0,
                "name": "",
                "dateOfBirth": new Date(),
                "gender": "",
                "phone": "",
                "address": ""
            }
        ]
    })

    const [stayingDays, setStayingDays] = useState(0);

    const [totalPrice, setTotalPrice] = useState({
        "price": 0
    });

    var calculatePrice = (price) => {

        totalPrice.price = totalPrice.price + price;
        console.log(totalPrice, "price");
    }

    useEffect(() => {
        setUpToggle(false);
        setDownToggle(false);
        idDTO.id = sessionStorage.getItem("packageId");
        fetch("http://localhost:5028/api/Package/GetPackage",
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
                    setPackages(myData);
                    console.log(myData, 'package');
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })

        totalPrice.price = Number(1000);

    }, []);

    var setPeopleCount = (event) => {
        setBooking({ ...booking, "peopleCount": Number(event.target.value) });
        for (let i = 0; i < event.target.value; i++) {
            setPeoples(prev => {
                const updatedArray = [...prev, people];
                return updatedArray;
            });
        }
    }


    const [countDTO, setCountDTO] = useState(
        {
            "packageId": 0,
            "tripDate": new Date(),
            "bookedCount": 0
        }
    )

    const [upToggle, setUpToggle] = useState(true);
    const [downToggle, setDownToggle] = useState(true);


    var checkAvailability = () => {
        countDTO.packageId = sessionStorage.getItem('packageId');
        countDTO.tripDate = booking.departureDate;
        fetch("http://localhost:5250/api/TourBooking/BookedCount",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({ ...countDTO, "countDTO": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    setCountDTO(myData);
                    console.log(myData, 'countDTO');
                    if (packages.maxCount > (countDTO.bookedCount + booking.peopleCount)) {
                        setDownToggle(false);
                        setUpToggle(true);
                    }
                    else {
                        setUpToggle(false);
                        setDownToggle(true);
                    }
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    const [spotToggle, setSpotToggle] = useState(true);
    const [spotObjects, setSpotObjects] = useState([]);

    useEffect(() => {

    }, [spotObjects]);

    const [currentIndex, setCurrentIndex] = useState(0);

    var getSpotObjects = (itenerary, index) => {
        setSpotObjects([]);
        var object = JSON.parse(itenerary);
        console.log(object, "itenererey");
        for (let i = 0; i < object.spots.length; i++) {
            idDTO.id = object.spots[i].spotId;
            fetch("http://localhost:5002/api/Tourism/GetSpot",
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
                        console.log(myData, "mydata")
                        setSpotObjects(prev => {
                            const updatedArray = [...prev, myData]
                            return updatedArray
                        });
                        // setSpotObjects([...spotObjects,myData]);
                        // spotObjects[i]=myData;
                        console.log(spotObjects, i);
                    }
                    else {
                        console.log(await data.text());
                    }
                })
                .catch((err) => {
                    console.log(err.error)
                })
        }
        // JSON.parse(itenerary).spots=spotObjects;
        // console.log(spotObjects,"spot");
        // packages.iteneraries[index].spots=spotObjects;
        // setPackages({...packages,"iteneraries":{...packages.iteneraries[index],["spots"]:spotObjects}});
        // setPackages((prevPackages) => ({
        //     ...prevPackages,
        //     iteneraries: prevPackages.iteneraries.map((itenerary) => ({
        //       ...itenerary,
        //       spots: spotObjects,
        //     })),
        //   }));
        console.log(packages, "package");
        setCurrentIndex(index);
        setSpotToggle(false);
    }

    //Room Booking
    const [roomAvailability, setRoomAvailability] = useState(
        {
            "hotelId": 0,
            "roomId": 0,
            "date": new Date(),
            "stayingDays": 0,
            "result": true
        }
    )
    const [selectedRooms, setSelectedRooms] = useState([]);

    const [bookedHotel, setBookedHotel] = useState(
        {
            "id": 0,
            "hotelId": 0,
            "roomId": 0,
            "bookingId": 0
        }
    )
    const [bookedHotels, setBookedHotels] = useState([]);

    var checkRoomAvailability = (room) => {
        console.log(selectedRooms, "selectedrooms");

        var object = JSON.parse(room);
        var flag = 0;
        for (let i = 0; i < selectedRooms.length; i++) {
            if (selectedRooms[i].roomId == object.roomId) {
                selectedRooms.splice(i, 1);
                setSelectedRooms([]);
                setSelectedRooms([...selectedRooms]);
                flag = 1;
            }
        }
        // setRoomAvailability({ ...roomAvailability, "hotelId": object.hotelId, "roomId": object.roomId, "date": booking.departureDate, "stayingDays": stayingDays });
        if (flag == 0) {
            roomAvailability.hotelId = object.hotelId;
            roomAvailability.roomId = object.roomId;
            roomAvailability.date = booking.departureDate;
            roomAvailability.stayingDays = stayingDays;
            fetch("http://localhost:5028/api/Package/CheckRoomAvailability",
                {
                    "method": "POST",
                    headers: {
                        "accept": "text/plain",
                        "Content-Type": 'application/json',
                    },
                    "body": JSON.stringify({ ...roomAvailability, "roomAvailability": {} })
                })
                .then(async (data) => {
                    if (data.status == 200) {
                        var myData = await data.json();
                        // setRoomAvailability(myData);
                        roomAvailability.result = myData.result;
                        console.log(myData, "mydata");
                        checkRoom(object);
                    }
                    else {
                        console.log(await data.text());
                    }
                })
                .catch((err) => {
                    console.log(err.error)
                })

        }
    }

    var checkRoom = (object) => {
        console.log("hello");
        if (roomAvailability.result == true) {
            setSelectedRooms([...selectedRooms, object]);
            console.log(selectedRooms, "selectedRooms");
            toast.success("ok");
        }
        else {
            toast.error('This room is already booked');
        }
    }

    var bookRooms = () => {
        for (let i = 0; i < selectedRooms.length; i++) {
            roomAvailability.hotelId = selectedRooms[i].hotelId;
            roomAvailability.roomId = selectedRooms[i].roomId;
            roomAvailability.stayingDays = stayingDays;
            roomAvailability.date = booking.departureDate;
            fetch("http://localhost:5028/api/Package/UpdateRoom",
                {
                    "method": "POST",
                    headers: {
                        "accept": "text/plain",
                        "Content-Type": 'application/json',
                    },
                    "body": JSON.stringify({ ...roomAvailability, "roomAvailability": {} })
                })
                .then(async (data) => {
                    if (data.status == 200) {
                        var myData = await data.json();
                        // setRoomAvailability(myData);
                        console.log(myData, "mydata")
                    }
                    else {
                        console.log(await data.text());
                    }
                })
                .catch((err) => {
                    console.log(err.error)
                })
        }

        for (let i = 0; i < selectedRooms.length; i++) {
            bookedHotel.hotelId = selectedRooms[i].hotelId;
            bookedHotel.roomId = selectedRooms[i].roomId;
            setBookedHotels(prev => {
                const updatedArray = [...prev, bookedHotel]
                return updatedArray;
            })
            console.log(bookedHotels, "final hotel");
            console.log(selectedRooms[i].price, "dddddd");
            calculatePrice(parseInt(selectedRooms[i].price));
            setShowHotelRemoveButton(false);
        }
    }

    const [showHotels, setShowHotels] = useState(true);
    const [showHotelRemoveButton, setShowHotelRemoveButton] = useState(true);

    var removeHotel = () => {
        setBookedHotels([]);
        setShowHotels(false);
        setShowHotelRemoveButton(false);
    }

    //Vehicle Booking
    const [transportDTO, setTransportDTO] = useState(
        {
            "vehicleId": 0,
            "bookingDate": "2023-08-03T17:00:01.646Z",
            "noOfDays": 0,
            "result": true
        }
    )
    const [vehicle, setVehicle] = useState();

    const [toggleTransport, setToggleTransport] = useState(false);
    const [tempIndex, setTempIndex] = useState();
    const [showTransportRemoveButton, setShowTransportRemoveButton] = useState(true);
    const [showTransport, setShowTransport] = useState(true);


    var checkTransportAvailability = (vehicle, index) => {
        var object = JSON.parse(vehicle);
        transportDTO.vehicleId = object.vehicleId;
        transportDTO.bookingDate = booking.departureDate;
        transportDTO.noOfDays = packages.noOfDays;

        fetch("http://localhost:5028/api/Package/CheckTransportAvailability",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({ ...transportDTO, "transportDTO": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    transportDTO.result = myData.result;
                    console.log(transportDTO, "mydata");
                    setVehicle(object);
                    transportChecking(object, index);
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })

    }

    var transportChecking = (data, index) => {
        if (transportDTO.result == true) {
            console.log("hello");
            setToggleTransport(false);
            // populateTransport(transportDTO, data);
            setTempIndex(index);
        }
        else
            setToggleTransport(true);
    }

    var populateTransport = () => {
        // var vehicle=JSON.parse(data);
        console.log(transportDTO, "chehck");
        fetch("http://localhost:5028/api/Package/UpdateTransport",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({ ...transportDTO, "transportDTO": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    // setRoomAvailability(myData);
                    console.log(myData, "mydata")
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
        calculatePrice(vehicle.price);
        booking.vehicleId = transportDTO.vehicleId;
        setShowTransportRemoveButton(false);
    }

    var removeTransport = () => {
        booking.vehicleId = 0;
        setShowTransport(false);
        setShowTransportRemoveButton(false);
    }

    //Foods bookings
    const [food, setFood] = useState(
        {
            "id": 0,
            "bookingId": 0,
            "bookings": "",
            "foodId": 0,
            "count": 0,
            "price": 0
        }
    )

    const [countForFood, setCountForFood] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [foods, setFoods] = useState([]);
    const [showFoodRemoveButton, setShowFoodRemoveButton] = useState(true);
    const [showFood, setShowFood] = useState(true);

    var addFood = (data, event) => {
        console.log("in");
        // setCountForFood(Number(event.target.value));
        var food = JSON.parse(data);
        var flag = 0;
        for (let i = 0; i < selectedFoods.length; i++) {
            if (food.foodId == selectedFoods[i].foodId) {
                countForFood.splice(i, 1);
                selectedFoods.splice(i, 1);
                setSelectedFoods([]);
                setCountForFood([]);
                setSelectedFoods([...selectedFoods]);
                setCountForFood([...countForFood]);
                flag = 1;
            }
        }
        if (flag == 0) {
            setCountForFood((prevState) => [...prevState, Number(event.target.value)])
            setSelectedFoods(prev => {
                const updatedArray = [...prev, food]
                return updatedArray
            });
            console.log(selectedFoods, "selectdefoods");
        }

    }

    var foodConfirm = () => {
        for (let i = 0; i < selectedFoods.length; i++) {
            const food = new Object();
            food.foodId = selectedFoods[i].foodId;
            food.count = countForFood[i];
            food.price = selectedFoods[i].price * countForFood[i];
            console.log(food.price);
            calculatePrice(food.price);
            setFoods(prev => {
                const updatedArray = [...prev, food]
                return updatedArray
            });
            console.log(foods, "finalfoods");
            setShowFoodRemoveButton(false);
        }
    }

    var removeFood = () => {
        setFoods([]);
        setShowFood(false);
        setShowFoodRemoveButton(false);
    }

    //Add people
    const [people, setPeople] = useState(
        {
            "peopleId": 0,
            "bookingId": 0,
            "name": "",
            "dateOfBirth": new Date(),
            "gender": "",
            "phone": "",
            "address": ""
        }
    )

    const [peoples, setPeoples] = useState([]);


    var submitPeople = () => {
        booking.peoples = peoples;
        console.log(booking.peoples, "people");
        setToggleClose(true);
    }

    var navigate=useNavigate();

    //Booking
    const [bookButtonToggle, setBookButtonToggle] = useState(true);
    const [toggleClose, setToggleClose] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem('userId') == null)
            setBookButtonToggle(false);
    }, []);

    var toggleBooking = () => {
        setToggleClose(true);
        if (localStorage.getItem('userId') == null)
            setBookButtonToggle(false);
        else
            setBookButtonToggle(true);
    }

    const [isOpenModal, setIsOpenModal] = useState(false);

    var bookTrip = () => {

        booking.bookedFoods = foods;
        booking.bookedHotels = bookedHotels;
        booking.price = totalPrice.price;
        booking.location = packages.location;
        booking.packageId = Number(sessionStorage.getItem('packageId'));
        booking.travellerId = Number(sessionStorage.getItem('userId'));
        booking.returnDate = new Date(new Date(booking.departureDate).getTime() + packages.noOfDays * 24 * 60 * 60 * 1000);

        console.log(booking, "final");

        fetch("http://localhost:5250/api/TourBooking/BookTour",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({ ...booking, "booking": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    console.log(myData, "output");
                    setIsOpenModal(true);

                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    return (
        <div className="booking-body">
            <Navbar user={user} />
            { 
                <ReactModal isOpen={isOpenModal} onRequestClose={() => {
                    setIsOpenModal(false);
                    navigate('/profile');
                }} className="bill-modal"
                    overlayClassName="react-modal-overlay"
                    contentLabel="Bill Modal">

                    <svg onClick=
                        {() => setIsOpenModal(false)} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                    </svg>

                    <InvoicePage id={booking}/>


                </ReactModal>
            }
            <div className="booking-header">
                <div className="booking-price">
                    <span>{packages.packageName}</span>
                    <span className="total-price">{totalPrice.price}</span>
                </div>
                <div className="availability-checking">
                    <div>
                        <h4>Select Booking Date</h4>
                        <input className="package-dropdown" type="date" onChange={(event) => {
                            setBooking({ ...booking, "departureDate": event.target.value });
                        }} />
                    </div>
                    <div>
                        <h4>People count</h4>
                        <input className="package-dropdown" type="text" onChange={setPeopleCount} />
                    </div>
                    <div>
                        <button disabled={booking.departureDate == '' || booking.peopleCount == 0} className="availability-button" onClick={checkAvailability}>Check Availability</button>
                        {
                            upToggle && <p>You can go forward*</p>
                        }
                        {
                            downToggle && (<p>you can book other day</p>)
                        }
                    </div>
                </div>
            </div>
            {
                upToggle && (
                    <div>
                        <div >
                            {
                                packages.iteneraries.map((itenerary, index) => {
                                    return (<div className="iteneraries-body" key={index}>
                                        <p onClick={() => getSpotObjects(JSON.stringify(itenerary), index)} className="day-text-style">Day {itenerary.day}</p>
                                        {!spotToggle &&
                                            <div className="cards-flex-container">
                                                {currentIndex == index &&
                                                    spotObjects.map((spot, index) => {
                                                        return (<div className="individual-cards" key={index}>
                                                            <div className="itenerary-img-outer">
                                                                <img className="itenerary-img-inner" src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${spot.images[0].imagePath}`} />
                                                            </div>
                                                            <p className="itenerary-card-name">{spot.spotName}</p>
                                                            <div>
                                                                <p className="itenerary-card-topic">Specialities</p>
                                                                <div className="specialities-container">
                                                                    {
                                                                        spot.specialities.map((speciality, index) => {
                                                                            return (<p key={index} className="speciality-texts">{speciality.specialityName}</p>)
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>)
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>)
                                })
                            }
                        </div>
                        {showHotelRemoveButton &&
                            <div>
                                <button onClick={removeHotel}>Remove Hotel</button>
                            </div>
                        }
                        {showHotels &&
                            <div className="booking-hotel-container">
                                <div className="booking-hotel-body">
                                    {
                                        packages.hotels.map((hotel, index) => {
                                            return (<div className="hotel-card-container" key={index}>
                                                <div className='outer-itenerery'><img className='itenerary-image' src={require('../../Images/hotel.png')} /></div>
                                                <div>
                                                    <p className="itenerary-card-name">{hotel.hotelName}</p>
                                                    <p className="itenerary-card-name">{hotel.location}</p>
                                                </div>
                                                <div className="rooms-container">
                                                    {
                                                        hotel.rooms.map((room, index) => {
                                                            return (<div key={index}>
                                                                <Popup trigger={<div><svg className='room-image' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M22 21H2v-2h1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1v2zm-5-2h2v-8h-6v8h2v-6h2v6zm0-10V5H5v14h6V9h6zM7 11h2v2H7v-2zm0 4h2v2H7v-2zm0-8h2v2H7V7z" /> </g> </svg></div>}
                                                                    nested modal contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                                                                    {
                                                                        close => (
                                                                            <div className='hotel-popup'>
                                                                                <svg onClick=
                                                                                    {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                                                                </svg>
                                                                                <h4>Staying Days</h4>
                                                                                <input className='hotel-inputs' type="number" onChange={(event) => {
                                                                                    setStayingDays(Number(event.target.value))
                                                                                }} />
                                                                                <p className="itenerary-card-name">Room Price: {room.price}</p>
                                                                                <p className="itenerary-card-name">Room Number: {room.roomId}</p>
                                                                                <button className='hotel-button' onClick={() => { checkRoomAvailability(JSON.stringify(room)); close(); }}>Ok</button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </Popup>

                                                            </div>)
                                                        })
                                                    }
                                                </div>
                                            </div>)
                                        })
                                    }
                                </div>
                                <div className="selected-rooms-container">
                                    {
                                        selectedRooms.map((room, index) => {
                                            return (<div className='individual-vehicle-card' key={index}>
                                                <div><svg className='room-image' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <path d="M22 21H2v-2h1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1v2zm-5-2h2v-8h-6v8h2v-6h2v6zm0-10V5H5v14h6V9h6zM7 11h2v2H7v-2zm0 4h2v2H7v-2zm0-8h2v2H7V7z" /> </g> </svg></div>
                                                <p className='transport-text'>Room Number: {room.roomId}</p>
                                                <p className='transport-text'>Room Price: {room.price}</p>
                                            </div>)
                                        })
                                    }
                                </div>
                                {showHotelRemoveButton &&
                                    <button onClick={bookRooms}>book rooms</button>
                                }
                            </div>
                        }
                        {showTransportRemoveButton &&
                            <div onClick={removeTransport}>Transport Remove</div>
                        }
                        {showTransport &&
                            <div>
                                <div className="transport-container">
                                    {
                                        packages.transports.map((transport, index) => {
                                            return (<div onClick={() => checkTransportAvailability(JSON.stringify(transport), index)} className={`${tempIndex == index ? 'selected-vehicle-style' : 'individual-transport-booking'}`} key={index}>
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
                                                <p className='transport-text-booking'>Price: {transport.price}</p>
                                            </div>)
                                        })
                                    }
                                    {
                                        toggleTransport && <p>This vehicle is booked you can choose other</p>
                                    }
                                </div>
                                {showTransportRemoveButton &&
                                    <div>
                                        <button onClick={populateTransport}>Confirm</button>
                                    </div>}
                            </div>
                        }
                        {showFoodRemoveButton &&
                            <div>
                                <button onClick={removeFood}>Remove Food</button>
                            </div>
                        }
                        {showFood &&
                            <div className="booking-food-container">
                                <div className="before-select-foods">
                                    {
                                        packages.foods.map((food, index) => {
                                            return (<div className="food-card" key={index}>

                                                <Popup trigger={
                                                    <div className='outer-food' onClick={() => addFood(JSON.stringify(food))}>
                                                        {food.foodType == 'non veg' &&
                                                            <img className='food-image' src={require('../../Images/nonveg.jpg')} />
                                                        }

                                                        {food.foodType == 'veg' &&
                                                            <img className='food-image' src={require('../../Images/veg.jpg')} />
                                                        }
                                                    </div>
                                                } nested modal contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                                                    {
                                                        close => (
                                                            <div className='hotel-popup'>
                                                                <svg onClick=
                                                                    {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                                                </svg>
                                                                <p className="itenerary-card-name">{food.foodType}</p>
                                                                <h4>People count</h4>
                                                                <input onChange={(event) => {
                                                                    addFood(JSON.stringify(food), event)
                                                                    close();
                                                                }} />
                                                            </div>
                                                        )
                                                    }
                                                </Popup>
                                            </div>)
                                        })
                                    }
                                </div>
                                <div className="after-select-foods">
                                    {
                                        selectedFoods.map((food, index) => {
                                            return (
                                                <div className="food-card" key={index}>
                                                    <p className="itenerary-card-name">{food.foodId}</p>
                                                    <div className='outer-food' onClick={() => addFood(JSON.stringify(food))}>
                                                        {food.foodType == 'non veg' &&
                                                            <img className='food-image' src={require('../../Images/nonveg.jpg')} />
                                                        }

                                                        {food.foodType == 'veg' &&
                                                            <img className='food-image' src={require('../../Images/veg.jpg')} />
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            </div>
                        }
                        {showFoodRemoveButton &&
                            <button onClick={foodConfirm}>Confirm</button>
                        }
                        <div>
                            <Popup trigger={<button> Add People</button>} modal nested contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                                {
                                    close => (
                                        <div className="people">
                                            <svg onClick=
                                                {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                            </svg>
                                            <div className="people-form-body">
                                                {
                                                    peoples.map((peopel, index) => {
                                                        return (<div className="people-card" key={index}>

                                                            {/* <h4>Name</h4> */}
                                                            <input placeholder="Name" className="people-inputs" type="text" value={peopel.name} onChange={(event) => {
                                                                setPeoples((prevPeoples) => {
                                                                    const updatedPeoples = [...prevPeoples];
                                                                    updatedPeoples[index] = { ...updatedPeoples[index], ["name"]: event.target.value };
                                                                    return updatedPeoples;
                                                                });
                                                            }} />

                                                            {/* <h4>Date Of Birth</h4> */}
                                                            <input placeholder="DOB" className="people-inputs" type="date" value={peopel.dateOfBirth} onChange={(event) => {
                                                                setPeoples((prevPeoples) => {
                                                                    const updatedPeoples = [...prevPeoples];
                                                                    updatedPeoples[index] = { ...updatedPeoples[index], ["dateOfBirth"]: event.target.value };
                                                                    return updatedPeoples;
                                                                });
                                                            }} />

                                                            {/* <h4>Gender</h4> */}
                                                            <input placeholder="Gender" className="people-inputs" type="text" value={peopel.gender} onChange={(event) => {
                                                                setPeoples((prevPeoples) => {
                                                                    const updatedPeoples = [...prevPeoples];
                                                                    updatedPeoples[index] = { ...updatedPeoples[index], ["gender"]: event.target.value };
                                                                    return updatedPeoples;
                                                                });
                                                            }} />

                                                            {/* <h4>Phone</h4> */}
                                                            <input placeholder="Phone" className="people-inputs" type="text" value={peopel.phone} onChange={(event) => {
                                                                setPeoples((prevPeoples) => {
                                                                    const updatedPeoples = [...prevPeoples];
                                                                    updatedPeoples[index] = { ...updatedPeoples[index], ["phone"]: event.target.value };
                                                                    return updatedPeoples;
                                                                });
                                                            }} />

                                                            {/* <h4>Address</h4> */}
                                                            <input placeholder="Address" className="people-inputs" type="text" value={peopel.address} onChange={(event) => {
                                                                setPeoples((prevPeoples) => {
                                                                    const updatedPeoples = [...prevPeoples];
                                                                    updatedPeoples[index] = { ...updatedPeoples[index], ["address"]: event.target.value };
                                                                    return updatedPeoples;
                                                                });
                                                            }} />
                                                        </div>)
                                                    })
                                                }
                                            </div>
                                            <button className="btn btn-success people-button" onClick={submitPeople}>Submit</button>
                                            {
                                                toggleClose && close()
                                            }
                                        </div>
                                    )
                                }
                            </Popup>

                        </div>
                        <div>
                            {bookButtonToggle ? <button onClick={bookTrip}>Book</button>
                                :
                                <Popup trigger={<button>Book</button>} modal nested contentStyle={matches ? customPopupStyle : customPopupStyle1}>
                                    {
                                        close => (
                                            <div>
                                                <svg onClick=
                                                    {() => close()} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.0825 10.0001L19.8703 2.21215C20.3771 1.70557 20.3771 0.88651 19.8703 0.379933C19.3637 -0.126644 18.5447 -0.126644 18.0381 0.379933L10.2501 8.16793L2.46233 0.379933C1.95552 -0.126644 1.13669 -0.126644 0.630111 0.379933C0.123296 0.88651 0.123296 1.70557 0.630111 2.21215L8.41787 10.0001L0.630111 17.7881C0.123296 18.2947 0.123296 19.1138 0.630111 19.6204C0.882569 19.8731 1.21451 20 1.54622 20C1.87793 20 2.20963 19.8731 2.46233 19.6204L10.2501 11.8324L18.0381 19.6204C18.2908 19.8731 18.6225 20 18.9542 20C19.2859 20 19.6176 19.8731 19.8703 19.6204C20.3771 19.1138 20.3771 18.2947 19.8703 17.7881L12.0825 10.0001Z" fill="#6A6A6A" />
                                                </svg>
                                                <Login afterLogin={toggleBooking} />

                                            </div>
                                        )
                                    }
                                </Popup>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default TripBooking;