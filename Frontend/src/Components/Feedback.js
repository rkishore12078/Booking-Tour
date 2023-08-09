import { useState } from "react";
import '../Css/Feedback.css';

function Feedback() {
    const [feedback, setFeedback] = useState(
        {
            "feedbackId": 0,
            "packageId": 0,
            "travellerName": "string",
            "phone": "string",
            "email": "string",
            "communication": 0,
            "organisation": 0,
            "coOrdination": 0,
            "meals": 0,
            "accamodation": 0,
            "transport": 0,
            "overall": 0,
            "howDoYouHear": "string",
            "description": "string"
        }
    )

    var assignOverallExperience = (data) => {
        console.log("in")
        setFeedback({ ...feedback, "overall": data });
        switch (data) {
            case 1: {
                console.log("star1");
                document.getElementById('star1').classList.remove('unFill');
                document.getElementById('star1').classList.add('fill');
                document.getElementById('star2').classList.remove('fill');
                document.getElementById('star3').classList.remove('fill');
                document.getElementById('star4').classList.remove('fill');
                document.getElementById('star5').classList.remove('fill');
                break;
            }
            case 2: {
                console.log("star2");
                document.getElementById('star1').classList.remove('unFill');
                document.getElementById('star1').classList.add('fill');
                document.getElementById('star2').classList.remove('unFill');
                document.getElementById('star2').classList.add('fill');
                document.getElementById('star3').classList.remove('fill');
                document.getElementById('star4').classList.remove('fill');
                document.getElementById('star5').classList.remove('fill');
                break;
            }
            case 3: {
                console.log("star3");
                document.getElementById('star1').classList.remove('unFill');
                document.getElementById('star1').classList.add('fill');
                document.getElementById('star2').classList.remove('unFill');
                document.getElementById('star2').classList.add('fill');
                document.getElementById('star3').classList.remove('unFill');
                document.getElementById('star3').classList.add('fill');
                document.getElementById('star4').classList.remove('fill');
                document.getElementById('star5').classList.remove('fill');
                break;
            }
            case 4: {
                console.log("star4");
                document.getElementById('star1').classList.remove('unFill');
                document.getElementById('star1').classList.add('fill');
                document.getElementById('star2').classList.remove('unFill');
                document.getElementById('star2').classList.add('fill');
                document.getElementById('star3').classList.remove('unFill');
                document.getElementById('star3').classList.add('fill');
                document.getElementById('star4').classList.remove('unFill');
                document.getElementById('star4').classList.add('fill');
                document.getElementById('star5').classList.remove('fill');
                break;
            }
            case 5: {
                console.log("star5");
                document.getElementById('star1').classList.remove('unFill');
                document.getElementById('star1').classList.add('fill');
                document.getElementById('star2').classList.remove('unFill');
                document.getElementById('star2').classList.add('fill');
                document.getElementById('star3').classList.remove('unFill');
                document.getElementById('star3').classList.add('fill');
                document.getElementById('star4').classList.remove('unFill');
                document.getElementById('star4').classList.add('fill');
                document.getElementById('star5').classList.remove('unFill');
                document.getElementById('star5').classList.add('fill');
                break;
            }

        }
    }

    var submitFeedback = () => {
        feedback.packageId = localStorage.getItem('packageId');
        fetch("http://localhost:5156/api/Feedback/AddFeedback",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({...feedback,"feedback":{}})
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    console.log(myData, "mydata")
                    setFeedback(myData);
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
        <div>
            <div className="row">
                <h1>Travel Feedback Form</h1>
            </div>
            <div className="row">
                <div className="col-6">
                    <h3>Name</h3>
                    <input type="text" onChange={(event) => {
                        setFeedback({ ...feedback, "travellerName": event.target.value });
                    }} />
                </div>

                <div className="col-6">
                    <h3>Phone</h3>
                    <input type="number" onChange={(event) => {
                        setFeedback({ ...feedback, "phone": event.target.value });
                    }} />
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h3>Email</h3>
                    <input type="email" onChange={(event) => {
                        setFeedback({ ...feedback, "email": event.target.value });
                    }} />
                </div>

                <div className="col-6">

                </div>
            </div>
            <div className="row">
                <h3>Please Evaluate each statements</h3>
                <table className="feedback-table">
                    <tbody className="feedback-table-body">
                        <tr>
                            <td></td>
                            <td>Poor</td>
                            <td>Satisfactory</td>
                            <td>Good</td>
                            <td>Very Good</td>
                            <td>Excellent</td>
                        </tr>
                        <tr>
                            <td>Communication</td>
                            <td>
                                <input type="radio" name="communication" value={1} onChange={(event) => {
                                    setFeedback({ ...feedback, "communication": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="communication" value={2} onChange={(event) => {
                                    setFeedback({ ...feedback, "communication": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="communication" value={3} onChange={(event) => {
                                    setFeedback({ ...feedback, "communication": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="communication" value={4} onChange={(event) => {
                                    setFeedback({ ...feedback, "communication": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="communication" value={5} onChange={(event) => {
                                    setFeedback({ ...feedback, "communication": event.target.value });
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Organisation</td>
                            <td>
                                <input type="radio" name="organisation" value={1} onChange={(event) => {
                                    setFeedback({ ...feedback, "organisation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="organisation" value={2} onChange={(event) => {
                                    setFeedback({ ...feedback, "organisation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="organisation" value={3} onChange={(event) => {
                                    setFeedback({ ...feedback, "organisation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="organisation" value={4} onChange={(event) => {
                                    setFeedback({ ...feedback, "organisation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="organisation" value={5} onChange={(event) => {
                                    setFeedback({ ...feedback, "organisation": event.target.value });
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Co-Ordination</td>
                            <td>
                                <input type="radio" name="coOrdination" value={1} onChange={(event) => {
                                    setFeedback({ ...feedback, "coOrdination": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="coOrdination" value={2} onChange={(event) => {
                                    setFeedback({ ...feedback, "coOrdination": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="coOrdination" value={3} onChange={(event) => {
                                    setFeedback({ ...feedback, "coOrdination": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="coOrdination" value={4} onChange={(event) => {
                                    setFeedback({ ...feedback, "coOrdination": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="coOrdination" value={5} onChange={(event) => {
                                    setFeedback({ ...feedback, "coOrdination": event.target.value });
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Meals</td>
                            <td>
                                <input type="radio" name="meals" value={1} onChange={(event) => {
                                    setFeedback({ ...feedback, "meals": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="meals" value={2} onChange={(event) => {
                                    setFeedback({ ...feedback, "meals": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="meals" value={3} onChange={(event) => {
                                    setFeedback({ ...feedback, "meals": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="meals" value={4} onChange={(event) => {
                                    setFeedback({ ...feedback, "meals": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="meals" value={5} onChange={(event) => {
                                    setFeedback({ ...feedback, "meals": event.target.value });
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Accamodation</td>
                            <td>
                                <input type="radio" name="accamodation" value={1} onChange={(event) => {
                                    setFeedback({ ...feedback, "accamodation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="accamodation" value={2} onChange={(event) => {
                                    setFeedback({ ...feedback, "accamodation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="accamodation" value={3} onChange={(event) => {
                                    setFeedback({ ...feedback, "accamodation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="accamodation" value={4} onChange={(event) => {
                                    setFeedback({ ...feedback, "accamodation": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="accamodation" value={5} onChange={(event) => {
                                    setFeedback({ ...feedback, "accamodation": event.target.value });
                                }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Transport</td>
                            <td>
                                <input type="radio" name="transport" value={1} onChange={(event) => {
                                    setFeedback({ ...feedback, "transport": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="transport" value={2} onChange={(event) => {
                                    setFeedback({ ...feedback, "transport": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="transport" value={3} onChange={(event) => {
                                    setFeedback({ ...feedback, "transport": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="transport" value={4} onChange={(event) => {
                                    setFeedback({ ...feedback, "transport": event.target.value });
                                }} />
                            </td>
                            <td>
                                <input type="radio" name="transport" value={5} onChange={(event) => {
                                    setFeedback({ ...feedback, "transport": event.target.value });
                                }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row">
                <h3>Overall Tour Experience</h3>
                <div>
                    <span onClick={() => assignOverallExperience(1)} ><i id="star1" class="bi bi-star-fill"></i></span>
                    <span onClick={() => assignOverallExperience(2)} ><i id="star2" class="bi bi-star-fill"></i></span>
                    <span onClick={() => assignOverallExperience(3)} ><i id="star3" class="bi bi-star-fill"></i></span>
                    <span onClick={() => assignOverallExperience(4)} ><i id="star4" class="bi bi-star-fill"></i></span>
                    <span onClick={() => assignOverallExperience(5)} ><i id="star5" class="bi bi-star-fill"></i></span>
                </div>
            </div>
            <div className="row">
                <h4>How did you hear about us?</h4>
                <div>
                    <input onChange={(event) => {
                        setFeedback({ ...feedback, "howDoYouHear": event.target.value });
                    }} name="common" type="radio" value='Friends and Family' /><span>Friends and Family</span>
                </div>
                <div>
                    <input onChange={(event) => {
                        setFeedback({ ...feedback, "howDoYouHear": event.target.value });
                    }} name="common" type="radio" value='Internet' /><span>Internet</span>
                </div>
                <div>
                    <input onChange={(event) => {
                        setFeedback({ ...feedback, "howDoYouHear": event.target.value });
                    }} name="common" type="radio" value='Adds' /><span>Adds</span>
                </div>
                <div>
                    <input onChange={(event) => {
                        setFeedback({ ...feedback, "howDoYouHear": event.target.value });
                    }} name="common" type="radio" value='Others' /><span>Others</span>
                </div>
            </div>
            <div className="row">
                <h4>Any other feedbacks and comments...</h4>
                <textarea rows={7} cols={10} onChange={(event) => {
                    setFeedback({ ...feedback, "description": event.target.value });
                }}>

                </textarea>
            </div>
            <div>
                <button onClick={submitFeedback}>Submit</button>
            </div>
        </div>
    )
}

export default Feedback;