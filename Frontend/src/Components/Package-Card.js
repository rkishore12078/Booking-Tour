import { useEffect, useState } from "react";
import '../Css/Package-Card.css'
import { Link } from "react-router-dom";

function PackageCard(props)
{

    // var [packages, setPackages] = useState(
    //     {
    //         "packageId": 0,
    //         "agentId": 0,
    //         "packageName": "string",
    //         "noOfDays": 0,
    //         "location": "string",
    //         "maxCount": 0,
    //         "imagePath": "string",
    //         "iteneraries": [
    //             {
    //                 "iteneraryId": 0,
    //                 "packageId": 0,
    //                 "day": 0,
    //                 "spots": [
    //                     {
    //                         "packageSpotId": 0,
    //                         "iteneraryId": 0,
    //                         "spotId": 0
    //                     }
    //                 ]
    //             }
    //         ],
    //         "hotels": [
    //             {
    //                 "hotelId": 0,
    //                 "packageId": 0,
    //                 "hotelName": "string",
    //                 "location": "string",
    //                 "rooms": [
    //                     // {
    //                     //     "roomId": 0,
    //                     //     "hotelId": 0,
    //                     //     "stayingDays": 0,
    //                     //     "checkInDate": "2023-08-02T16:52:59.834Z",
    //                     //     "checkOutDate": "2023-08-02T16:52:59.834Z",
    //                     //     "price": 0
    //                     // }
    //                 ]
    //             }
    //         ],
    //         "foods": [
    //             {
    //                 "foodId": 0,
    //                 "packageId": 0,
    //                 "foodType": "string",
    //                 "price": 0
    //             }
    //         ],
    //         "transports": [
    //             {
    //                 "vehicleId": 0,
    //                 "packageId": 0,
    //                 "vehicleType": "string",
    //                 "driverName": "string",
    //                 "driverNumber": "string",
    //                 "price": 0,
    //                 "availableFrom": "2023-08-02T16:52:59.834Z",
    //                 "availableTo": "2023-08-02T16:52:59.834Z"
    //             }
    //         ]
    //     }
    // )

    const [packages,setPackages]=useState(props.pack);

    useEffect(()=>{
        calculateHotelCount();
        decideRating();
    },[]);

    const[hotelCount,setHotelCount]=useState(0);

    var calculateHotelCount=()=>{
        setHotelCount(packages.hotels.length);
        console.log(hotelCount,"hotelCount");
    }

    const[feedbackDTO,setFeedbackDTO]=useState(
        {
            "packageId": 0,
            "averageCount": 0
        }
    )

    var decideRating=()=>{
        feedbackDTO.packageId=packages.packageId;
        fetch("http://localhost:5156/api/Feedback/AveragePackageCount",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({...feedbackDTO,"feedbackDTO":{}})
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    setFeedbackDTO(myData);
                    feedbackDTO.averageCount=myData.averageCount;
                    giveRatings(myData.averageCount);
                    console.log(feedbackDTO, "mydata");
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var giveRatings=(data)=>{
        console.log(data,"data")
        if(data>=0 && data<=7)
        {
            console.log('star1');
            document.getElementById('sstar1').classList.remove('unFill');
                document.getElementById('sstar1').classList.add('fill');
                document.getElementById('sstar2').classList.remove('fill');
                document.getElementById('1sstar3').classList.remove('fill');
                document.getElementById('star4').classList.remove('fill');
                document.getElementById('sstar5').classList.remove('fill');
        }
        else if(data>=8 && data<=14)
        {
            console.log('star2');
            document.getElementById('sstar1').classList.remove('unFill');
                document.getElementById('sstar1').classList.add('fill');
                document.getElementById('sstar2').classList.remove('unFill');
                document.getElementById('sstar2').classList.add('fill');
                document.getElementById('sstar3').classList.remove('fill');
                document.getElementById('sstar4').classList.remove('fill');
                document.getElementById('sstar5').classList.remove('fill');
        }
        else if(data>=15 && data<=21)
        {
            console.log('star3');
            document.getElementById('sstar1').classList.remove('unFill');
                document.getElementById('sstar1').classList.add('fill');
                document.getElementById('sstar2').classList.remove('unFill');
                document.getElementById('sstar2').classList.add('fill');
                document.getElementById('sstar3').classList.remove('unFill');
                document.getElementById('sstar3').classList.add('fill');
                document.getElementById('sstar4').classList.remove('fill');
                document.getElementById('sstar5').classList.remove('fill');
        }
        else if(data>=22 && data<=28)
        {
            console.log('star4');
            document.getElementById('sstar1').classList.remove('unFill');
                document.getElementById('sstar1').classList.add('fill');
                document.getElementById('sstar2').classList.remove('unFill');
                document.getElementById('sstar2').classList.add('fill');
                document.getElementById('sstar3').classList.remove('unFill');
                document.getElementById('sstar3').classList.add('fill');
                document.getElementById('sstar4').classList.remove('unFill');
                document.getElementById('sstar4').classList.add('fill');
                document.getElementById('sstar5').classList.remove('fill');
        }
        else{
            console.log('star5');
            document.getElementById('sstar1').classList.remove('unFill');
                document.getElementById('sstar1').classList.add('fill');
                document.getElementById('sstar2').classList.remove('unFill');
                document.getElementById('sstar2').classList.add('fill');
                document.getElementById('sstar3').classList.remove('unFill');
                document.getElementById('sstar3').classList.add('fill');
                document.getElementById('sstar4').classList.remove('unFill');
                document.getElementById('sstar4').classList.add('fill');
                document.getElementById('sstar5').classList.remove('unFill');
                document.getElementById('sstar5').classList.add('fill');
        }

    }

    return(
        <div className="package-card-body">
            <div className="package-card-outer">
                <img className="package-card-inner" src={`http://127.0.0.1:10000/devstoreaccount1/tour/tour/${packages.imagePath}`}/>
            </div>
            <div className="card-location">
                <img className="location-image" src={require("../Images/location.png")}/>
                <span className="location-text">{packages.location}</span>
            </div>
            <div>
                <p className="itenerary-card-name">{packages.packageName}</p>
            </div>
            <div>
                <p className="location-text">No of Hotels: {hotelCount}</p>
            </div>
            <div>
                <p>Days-{packages.noOfDays} Nights-{packages.noOfDays-1}</p>
            </div>
            <div>
                <div>
                    <span><i id="sstar1" class="bi bi-star-fill"></i></span>
                    <span><i id="sstar2" class="bi bi-star-fill"></i></span>
                    <span><i id="sstar3" class="bi bi-star-fill"></i></span>
                    <span><i id="sstar4" class="bi bi-star-fill"></i></span>
                    <span><i id="sstar5" class="bi bi-star-fill"></i></span>
                </div>
            </div>
            <Link to='/feedback'>Feedback</Link>
        </div>
    )
}

export default PackageCard;