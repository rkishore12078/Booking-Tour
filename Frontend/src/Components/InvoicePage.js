import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

const InvoicePage = (props) => {
    const [bookingData, setBookingData] = useState([{ 'name': 'kishore', 'email': 'kishore@gmail.com' }]);


    const [idDTO, setIdDTO] = useState(
        {
            "id": 0
        }
    )

    var [booking,setBooking]=useState(
        {
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
        }
    );

    var [packages, setPackages] = useState(
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
    );

    useEffect(() => {
        idDTO.id=props.bookings.id;
        fetch("http://localhost:5250/api/TourBooking/GetBooking",
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
                    booking=myData;
                    console.log(myData, "output");
                    getTraveller();
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }, []);

    const[userIdDTO,setUserIdDTO]=useState(
        {
            "userID": 0
        }
    )

    var [traveller, setTraveller] = useState(
        {
            "travellerId": 0,
            "users": {
                "email": ""
            },
            "name": "",
            "dateOfBirth": new Date(),
            "gender": "",
            "phone": "",
            "address": "",
            "emergencyContact": "",
            "imagePath": "",
            "travelPreference": "",
            "dietryPreference": "",
            "password": ""
        }
    )

    var getTraveller=()=>{
        // userIdDTO.userID=booking.travellerId;
        userIdDTO.userID=sessionStorage.getItem("userId");
        fetch("http://localhost:5007/api/User/GetTraveller",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                "body": JSON.stringify(userIdDTO)
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    traveller=myData;
                    console.log(myData, "output");
                    getPackage();
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var getPackage=()=>{
        idDTO.id=booking.packageId;
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
                packages=myData;
                console.log(myData, "output");
                // getSpots();
            }
            else {
                console.log(await data.text());
            }
        })
        .catch((err) => {
            console.log(err.error)
        })
    }

    // var getSpots=()=>{
    //     idDTO.id=packages
    // }


    const handleGeneratePDF = () => {
        // Create a new jspdf instance
        const doc = new jsPDF();

        // Add content to the PDF

        doc.setFontSize(24);
        doc.text('Booking Details', 20, 20);
        doc.setFontSize(12);

        let y = 40;


        // var image=<img src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${traveller.imagePath}`}/>
        // doc.addImage(image, 'JPEG', 20, y + 40, 40, 40); // Add the first image
        doc.text(`Package Name: ${packages.packageName}`, 10, y);
        doc.text(`NoOfDays: ${packages.noOfDays}`, 10, y+10);

        doc.text('Hotel Details', 10, y+30);

        for(let i=0;i<packages.hotels.length;i++)
        {
            for(let j=0;j<booking.bookedHotels.length;j++)
            {
                if(packages.hotels[i].hotelId==booking.bookedHotels[j].hotelId)
                    doc.text(`Hotel Name: ${packages.hotels[i].hotelName} Price: ${packages.hotels[i].hotelName}`, 10, y+40);

            }
        }

        doc.text('Food Details', 10, y+50);

        for(let i=0;i<packages.foods.length;i++)
        {
            for(let j=0;j<booking.bookedFoods.length;j++)
            {
                if(packages.foods[i].foodId==booking.bookedFoods[j].foodId)
                    doc.text(`Food: ${packages.foods[i].foodType} Price: ${booking.bookedFoods[j].price}`, 10, y+60);

            }
        }

        doc.text('Transport Details', 10, y+70);

        for(let i=0;i<packages.transports.length;i++)
        {
                if(packages.transports[i].vehicleId==booking.vehicleId)
                    doc.text(`Vehicle Type: ${packages.transports[i].vehicleType} Price: ${packages.transports[i].price} Driver Number: ${packages.transports[i].driverNumber}`, 10, y+80);

        }


        // Save the PDF
        doc.save('booking_details.pdf');
    };

    return (
        <div>
            <h1>Booking Details</h1>
            <button onClick={handleGeneratePDF}>Download Booking Details</button>
        </div>
    );
};

export default InvoicePage;
