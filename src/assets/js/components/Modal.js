import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";

const Modal = ({
    setUser,
    setDisplayModal,
    displayModal,
    userToken,
    server,
}) => {
    //state for input form
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //state for error message
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();
    //functions to update states
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    //state for switch to sign up form or sign in form
    const [signupForm, setSignupForm] = useState(false);

    // function to empty input fields
    const emptyFields = () => {
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessage("");
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        // check if error before launch request
        if (
            signupForm
                ? email && username && password && confirmPassword
                : email && password
        ) {
            //reset errorMessage
            setErrorMessage("");
            if (signupForm ? password === confirmPassword : password) {
                //reset errorMessage
                setErrorMessage("");
                try {
                    if (signupForm) {
                        const response = await axios.post(
                            `${server}/user/signup`,
                            {
                                email: email,
                                username: username,
                                password: password,
                            }
                        );

                        if (response.data.token && response.data._id) {
                            setUser(response.data.token, response.data._id);
                            emptyFields();
                            setDisplayModal("");
                        }
                    } else {
                        const response = await axios.post(
                            `${server}/user/login`,
                            { email: email, password: password }
                        );

                        if (response.data.token && response.data._id) {
                            setUser(response.data.token, response.data._id);
                            emptyFields();
                            setDisplayModal("");
                        }
                    }
                } catch (error) {
                    if (error.response) {
                        setErrorMessage(error.response.data.message);
                    }
                }
            } else {
                setErrorMessage("Your passwords are different");
            }
        } else {
            setErrorMessage("Fill in all the fields");
        }
    };

    return (
        <div>
            {userToken ? (
                <button
                    className="modal-btn"
                    onClick={() => {
                        setUser(null);
                        history.push("/");
                    }}
                >
                    DISCONNECT
                </button>
            ) : (
                <button
                    className="modal-btn"
                    onClick={() => setDisplayModal("flex")}
                >
                    SIGN UP | SIGN IN
                </button>
            )}

            <div className="modal" style={{ display: displayModal }}>
                <div className="modal-container">
                    <FontAwesomeIcon
                        className="close"
                        onClick={() => {
                            setDisplayModal("");
                            emptyFields();
                        }}
                        icon="times"
                    />
                    <div className="sign">
                        <span
                            className="sign-btn"
                            onClick={() => {
                                setSignupForm(true);
                                setErrorMessage("");
                            }}
                            style={{
                                borderBottom: signupForm
                                    ? "2px solid black"
                                    : "none",
                                color: signupForm ? "black" : " #b9b4b4",
                            }}
                        >
                            SIGN UP
                        </span>
                        <span
                            className="sign-btn"
                            onClick={() => {
                                setSignupForm(false);
                                setErrorMessage("");
                            }}
                            style={{
                                borderBottom: signupForm
                                    ? "none"
                                    : "2px solid black",
                                color: signupForm ? "#b9b4b4" : "black",
                            }}
                        >
                            SIGN IN
                        </span>
                    </div>
                    <div className="sign-form">
                        <form onSubmit={handleSubmit}>
                            {/* display sign up form */}
                            {signupForm ? (
                                <Signup
                                    email={email}
                                    username={username}
                                    setUsername={setUsername}
                                    password={password}
                                    confirmPassword={confirmPassword}
                                    setConfirmPassword={setConfirmPassword}
                                    handleEmailChange={handleEmailChange}
                                    handlePasswordChange={handlePasswordChange}
                                />
                            ) : (
                                // display sign in form
                                <Login
                                    email={email}
                                    password={password}
                                    handleEmailChange={handleEmailChange}
                                    handlePasswordChange={handlePasswordChange}
                                />
                            )}
                            <span style={{ color: "red" }}>{errorMessage}</span>
                            <button type="submit">
                                {signupForm ? "Create account" : "Sign in now"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
