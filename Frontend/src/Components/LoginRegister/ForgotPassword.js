import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import '../../Css/LoginRegister/ForgotPassword.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgotPassword() {

    const [emailDTO, setEmailDTO] = useState(
        {
            "email": "kishore@gmail.com"
        }
    )

    var navigate=useNavigate();

    var sendEmail = () => {
        fetch("http://localhost:5007/api/User/EmailSend",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify(emailDTO)
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    console.log("Success");
                    toast.success("Email sended successfully");
                    navigate('/home');

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
        <div className="forgotPassword-body">
            <Box className="content">
                <Stack spacing={2} className="forgotPassword">
                    <h2 className="title">Forgot Password</h2>
                    <TextField id="Email"
                        label="Email"
                        variant="outlined"
                        title="Username"
                        name="username"
                        onBlur={(event) => {
                            setEmailDTO({ ...emailDTO, "email": event.target.value });
                        }}
                        placeholder="Enter"

                        fullWidth/>
                        {
                            emailDTO.email.includes('@') == false ? (<p className="passwords">*Enter valid Email address</p>) : (<div></div>)
                        }

                        <button className="btn btn-primary" variant="contained"
                            onClick={sendEmail}
                        >
                            SEND EMAIL
                        </button>
                </Stack>

            </Box>
        </div>
    )
}

export default ForgotPassword;