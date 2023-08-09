import { useState } from "react";
import '../Css/IndividualPackage.css'

function IndividualPackage() {

    const [packages, setPackages] = useState(
        {
            "packageId": 0,
            "agentId": 0,
            "packageName": "string",
            "noOfDays": 0,
            "location": "string",
            "maxCount": 0,
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
                        {
                            "roomId": 0,
                            "hotelId": 0,
                            "stayingDays": 0,
                            "checkInDate": "2023-08-02T16:52:59.834Z",
                            "checkOutDate": "2023-08-02T16:52:59.834Z",
                            "price": 0
                        }
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
                    "availableFrom": "2023-08-02T16:52:59.834Z",
                    "availableTo": "2023-08-02T16:52:59.834Z"
                }
            ]
        }
    )

    return (
        <div>
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4"><div class="card text-dark card-has-bg click-col" >
                <img class="card-img d-none" src="https://source.unsplash.com/600x900/?tech,street" alt="Creative Manner Design Lorem Ipsum Sit Amet Consectetur dipisi?"/>
                    <div class="card-img-overlay d-flex flex-column">
                        <div class="card-body">
                            <small class="card-meta mb-2">Thought Leadership</small>
                            <h4 class="card-title mt-0 "><a class="text-dark" herf="https://creativemanner.com">Web Developmet Lorem Ipsum Sit Amet Consectetur dipisi?</a></h4>
                            <small><i class="far fa-clock"></i> October 15, 2020</small>
                        </div>
                        <div class="card-footer">
                            <div class="media">
                                <img class="mr-3 rounded-circle" src="https://assets.codepen.io/460692/internal/avatars/users/default.png?format=auto&version=1688931977&width=80&height=80" alt="Generic placeholder image"/>
                                    <div class="media-body">
                                        <h6 class="my-0 text-dark d-block">Oz Coruhlu</h6>
                                        <small>Director of UI/UX</small>
                                    </div>
                            </div>
                        </div>
                    </div>
            </div></div>
        </div>
    )
}
export default IndividualPackage;