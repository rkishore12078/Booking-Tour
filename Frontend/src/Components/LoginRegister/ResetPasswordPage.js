import { Box, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPasswordPage() {

    const [resetPasswordDTO, setResetPassword] = useState({
        "email": "",
        "emailToken": "",
        "newPassword": "",
        "confirmPassword": ""
    })
    const [passwordToggle, setPasswordToggle] = useState(false);
    var navigate = useNavigate();

    var { email } = useParams();
    var { emailToken } = useParams();

    var resetPassword = () => {
        console.log(resetPasswordDTO.newPassword, resetPasswordDTO.confirmPassword)
        console.log(email, emailToken, "ddfvdfdf");
        resetPasswordDTO.email = email;
        resetPasswordDTO.emailToken = emailToken;

        fetch("http://localhost:5007/api/User/ResetOldPassword",
            {
                "method": "POST",
                headers: {
                    "accept": "text/plain",
                    "Content-Type": 'application/json',
                },
                "body": JSON.stringify({ ...resetPasswordDTO, "resetPasswordDTO": {} })
            })
            .then(async (data) => {
                if (data.status == 200) {
                    var myData = await data.json();
                    console.log("Success");
                    navigate('/login');


                }
                else {
                    console.log(await data.text());
                }
            })
            .catch((err) => {
                console.log(err.error)
            })
    }

    var checkPassword = (event) => {
        resetPasswordDTO.confirmPassword = event.target.value;
        console.log(resetPasswordDTO.confirmPassword, "confirmpassword");
        if (resetPasswordDTO.confirmPassword != resetPasswordDTO.newPassword)
            setPasswordToggle(true)
        else
            setPasswordToggle(false)
    }


    return (
        <div className="forgotPassword-body">
            <Box>
                <Stack spacing={2} className="forgotPassword">
                    <h2 className="title">Reset Password</h2>
                    <TextField
                        id="username"
                        label="Password"
                        variant="outlined"
                        title="Username"
                        name="username"
                        onBlur={(event) => {
                            setResetPassword({ ...resetPasswordDTO, "newPassword": event.target.value });
                        }}
                        placeholder="Enter Username"

                        fullWidth
                    />
                

                    <TextField
                        id="username"
                        label="Confirm Password"
                        variant="outlined"
                        title="Username"
                        name="username"
                        onChange={checkPassword}
                        placeholder="Enter Username"

                        fullWidth
                    />
                    {
                        passwordToggle && <p>Passwords are not matching*</p>
                    }

                    <button className="btn btn-primary" variant="contained"
                        onClick={resetPassword}
                    >
                        Change Password
                    </button>
                </Stack>
            </Box>
        </div>
    )
}

export default ResetPasswordPage;