import { useEffect, useState } from "react";
import '../../Css/Traveller/MyBookings.css'

function MyBookings() {

    const [booking, setBooking] = useState(
        {
            "bookingId": 1,
            "peopleCount": 3,
            "packageId": 1,
            "travellerId": 1,
            "location": "chennai",
            "bookingDate": "2023-08-07T14:36:12.0394027+05:30",
            "departureDate": "2023-08-09T08:47:56.45",
            "returnDate": "0001-01-01T00:00:00",
            "price": 30000,
            "vehicleId": 1,
            "bookedHotels": [
                {
                    "id": 1,
                    "hotelId": 1,
                    "roomId": 1,
                    "bookingId": 1,
                    "price": 300
                },
                {
                    "id": 2,
                    "hotelId": 1,
                    "roomId": 2,
                    "bookingId": 1,
                    "price": 900
                }
            ],
            "bookedFoods": [
                {
                    "id": 1,
                    "bookingId": 1,
                    "foodId": 1,
                    "count": 3,
                    "price": 400
                }
            ],
            "peoples": null
        },
    )

    const [idDTO, setIdDTO] = useState(
        {
            "id": 0
        }
    )

    const [vehicle, setVehicle] = useState(
        {
            "vehicleId": 0,
            "packageId": 0,
            "vehicleType": "string",
            "driverName": "string",
            "driverNumber": "string",
            "price": 0,
            "availableFrom": new Date(),
            "availableTo": new Date()
        }
    )

    const[rooms,setRooms]=useState([]);

    var [packages, setPackages] = useState(
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
        }
    );

    useEffect(() => {
        idDTO.id = booking.packageId;
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
                    packages = myData;
                    setPackages(myData);
                    console.log(packages, "mydata");
                    getVehicle();
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    },[]);

    var getVehicle = () => {
        idDTO.id = booking.vehicleId;
        fetch("http://localhost:5028/api/Package/GetVehicle",
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
                    setVehicle(myData);
                    console.log(vehicle, "mydata");
                    getRoom();
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var getRoom = () => {
        for (let i = 0; i < booking.bookedHotels.length; i++) {
            idDTO.id = booking.bookedHotels[i].roomId;
            fetch("http://localhost:5028/api/Package/GetRoom",
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
                        setRooms(prev => {
                            const updatedArray = [...prev, myData];
                            return updatedArray;
                        });
                        console.log(rooms, "mydata");
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


    return (
        <div className="myBookings-body">
            <div className="package-card-outer">
                <img className="package-card-inner" src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${packages.imagePath}`} />
            </div>
            <div className="card-location">
                <img className="location-image" src={require("../../Images/location.png")} />
                <span className="location-text">{booking.location}</span>
            </div>
            <div>
                <p>From Date: {booking.departureDate}</p>
                <p>To Date: {booking.returnDate}</p>
            </div>
            <div>
                <p>Price: {booking.price}</p>
            </div>
            <div>
                <p>Vehicle Type: {vehicle.vehicleType}</p>
                <p>Vehicle Price: {vehicle.price}</p>
                <p>Driver Number: {vehicle.driverNumber}</p>
                <p>Driver Name: {vehicle.driverName}</p>
            </div>
            <div>
                {
                    rooms.map((room,index)=>{
                        return(<div key={index}>
                            <p>{room.roomId}</p>
                            <p>{room.price}</p>
                            <p>{room.checkInDate}</p>
                            <p>{room.checkOutDate}</p>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default MyBookings;