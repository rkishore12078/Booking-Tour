import { useEffect, useState } from "react";
import '../../Css/TravelAgent/AddSpot.css';
import { BlobServiceClient } from "@azure/storage-blob";
import { Input } from "@mui/material";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

function AddSpot() {

    const [spot, setSpot] = useState(
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
        }
    )

    const[user,setUser]=useState(
        {
            "userId": 0,
            "email": "kishore@gmail.com",
            "password": "",
            "role": "",
            "token": ""
        }
    )

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [idDTO, setIdDTO] = useState(
        {
            "id": 0
        }
    )

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
    },[]);

    var getSpots = (event) => {
        var city = JSON.parse(event.target.value);
        idDTO.id = city.id;
        spot.cityId = city.id;
        console.log(idDTO.id, "cityid");
    }


    var getCities = (event) => {
        var state = JSON.parse(event.target.value);
        idDTO.id = state.id;
        spot.stateId = state.id;
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

    var getStates = (event) => {
        var country = JSON.parse(event.target.value);
        idDTO.id = country.id;
        spot.countryId = country.id;
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

    const[specialities,setSpecialities]=useState([]);

    var storeSelectedSpeciality=(event)=>{
        var speciality=event.target.value;
        var flag=0;
        for(let i=0;i<specialities.length;i++)
        {
            if(specialities[i]==speciality)
            {
                specialities.splice(i,1);
                setSpecialities([]);
                setSpecialities([...specialities]);
                flag=1;
            }
        }
        if(flag==0)
            setSpecialities([...specialities, speciality]);
    }

    var navigate=useNavigate();

    const AZURITE_BLOB_SERVICE_URL = 'http://localhost:10000';
    const ACCOUNT_NAME = 'devstoreaccount1';
    const ACCOUNT_KEY = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==';

    const [image, setImage] = useState([]);

    const submit = () => {
        const selectedSpecialities=[];
        for(let i=0;i<specialities.length;i++)
        {
            const speciality=new Object();
            speciality.specialityName=specialities[i];
            speciality.spotId=0;
            speciality.specialityId=0;
            selectedSpecialities[i]=speciality;
        }
        spot.specialities=[...selectedSpecialities];

        const selectedImages=[];
        for(let i=0;i<image.length;i++)
        {
            console.log("inside image")
            const img=new Object();
            img.imagePath=image[i].name;
            img.spotId=0;
            img.imageId=0;
            selectedImages[i]=img;
        }
        spot.images=[...selectedImages];

        const blobServiceClient = new BlobServiceClient(
            "http://127.0.0.1:10000/devstoreaccount1/tour?sv=2018-03-28&st=2023-08-08T09%3A16%3A03Z&se=2023-08-09T09%3A16%3A03Z&sr=c&sp=racwdl&sig=kPkSIupboHQ2xVVJsIUF3Rwh%2BJGT7eArXhDOGj1DL1k%3D",
            "sv=2018-03-28&st=2023-08-08T09%3A16%3A03Z&se=2023-08-09T09%3A16%3A03Z&sr=c&sp=racwdl&sig=kPkSIupboHQ2xVVJsIUF3Rwh%2BJGT7eArXhDOGj1DL1k%3D"
        );
        const containerClient = blobServiceClient.getContainerClient('tour');

        console.log(image, "imgae");
        for (let i = 0; i < image.length; i++) {
            const blobClient = containerClient.getBlobClient(image[i].name);
            const blockBlobClient = blobClient.getBlockBlobClient();
            const result = blockBlobClient.uploadBrowserData(image[i], {
                blockSize: 4 * 1024 * 1024,
                concurrency: 20,
                onProgress: ev => console.log(ev)
            });
            console.log(result, "result");
        }

        fetch("http://localhost:5002/api/Tourism/AddSpot",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({...spot,"spot":{}})
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    // setStates(myData);
                    console.log(myData, "added spot");
                    navigate('/tripBooking');
                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    return (<div>
        <Navbar user={user}/>
        <div className="addSpot">
            <div className="spot-body">
                <h3>Create a spot</h3>
                <div className='addSpot-filters'>
                    <div className='package-filter-items'>
                        <h4>Country</h4>
                        <select className='package-dropdown' onChange={getStates}>
                            {
                                countries.map((country, index) => {
                                    return (<option key={index} value={JSON.stringify(country)}>{country.name}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className='package-filter-items'>
                        <h4>State</h4>
                        <select className='package-dropdown' onChange={getCities}>
                            {
                                states.map((state, index) => {
                                    return (<option key={index} value={JSON.stringify(state)}>{state.name}</option>)
                                })
                            }
                        </select>
                    </div>

                </div>
                <div className='addSpot-filters'>
                    <div className='package-filter-items'>
                        <h4>City</h4>
                        <select className='package-dropdown' onChange={getSpots}>
                            {
                                cities.map((city, index) => {
                                    return (<option key={index} value={JSON.stringify(city)}>{city.name}</option>)
                                })
                            }
                        </select>
                    </div>

                    <div className='package-filter-items'>
                        <h4>Spot Name</h4>
                        <input type="text" className="package-dropdown" placeholder="Enter spot name" onChange={(event)=>{
                            setSpot({...spot,"spotName":event.target.value});
                        }}/>
                    </div>
                </div>

                <div className="specialities">
                    <div>
                        <h4>Specialities</h4>
                        <select className='package-dropdown' onChange={storeSelectedSpeciality}>
                            <option value='Adventure'>Adventure</option>
                            <option value='Historic'>Historic</option>
                            <option value='Museum'>Museum</option>
                            <option value='Trecking'>Trecking</option>
                        </select>
                    </div>
                    <div className="selected-specialities">
                        {
                            specialities.map((speciality,index)=>{
                                return(<div className="selected-speciality-names" key={index}>
                                    {speciality}
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div>
                    <p>Add Images</p>
                    <Input onChange={(event) => setImage(event.target.files)} type='file' variant="outlined" multiple />
                </div>

                <div>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
        </div>

    </div>)
}
export default AddSpot;