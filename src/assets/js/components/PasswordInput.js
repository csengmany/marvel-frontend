// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const PasswordInput = ({ placeholder }) => {
//     const [password, setPassword] = useState("");

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };
//     const [passwordShown, setPasswordShown] = useState(false);
//     const togglePasswordVisiblity = () => {
//         setEye(passwordShown ? "eye" : "eye-slash");
//         setPasswordShown(passwordShown ? false : true);
//     };
//     const [eye, setEye] = useState("eye");
//     return (
//         <div className="input-container">
//             <input
//                 className="password-input"
//                 type={passwordShown ? "text" : "password"}
//                 placeholder={placeholder}
//                 value={password}
//                 onChange={handlePasswordChange}
//             />
//             <FontAwesomeIcon
//                 className="eye"
//                 icon={eye}
//                 onClick={togglePasswordVisiblity}
//             />
//         </div>
//     );
// };

// export default PasswordInput;

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Modal = ({ setUser, setDisplayModal, displayModal, userToken }) => {
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
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    //sate and function for password visibility
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setEye(passwordShown ? "eye" : "eye-slash");
        setPasswordShown(passwordShown ? false : true);
    };
    const [eye, setEye] = useState("eye");

    const [confirmShown, setConfirmShown] = useState(false);
    const toggleconfirmVisiblity = () => {
        setEye2(confirmShown ? "eye" : "eye-slash");
        setConfirmShown(confirmShown ? false : true);
    };
    const [eye2, setEye2] = useState("eye");

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
                            "https://cathy-marvel-backend.herokuapp.com/user/signup",
                            {
                                email: email,
                                username: username,
                                password: password,
                            }
                        );
                        console.log(response);
                        if (response.data.token && response.data._id) {
                            setUser(response.data.token, response.data._id);
                            emptyFields();
                            setDisplayModal("");
                        }
                    } else {
                        const response = await axios.post(
                            "https://cathy-marvel-backend.herokuapp.com/user/login",
                            { email: email, password: password }
                        );
                        console.log(response);
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
                                <>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={handleUsernameChange}
                                    />
                                    <div className="input-container">
                                        <input
                                            className="password-input"
                                            type={
                                                passwordShown
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="p@Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <FontAwesomeIcon
                                            className="eye"
                                            icon={eye}
                                            onClick={togglePasswordVisiblity}
                                        />
                                    </div>
                                    {/* <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    /> */}
                                    <div className="input-container">
                                        <input
                                            className={`confirm-input`}
                                            type={
                                                confirmShown
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="p@ssW0rD"
                                            value={confirmPassword}
                                            onChange={
                                                handleConfirmPasswordChange
                                            }
                                        />
                                        <FontAwesomeIcon
                                            className="eye"
                                            icon={eye2}
                                            onClick={toggleconfirmVisiblity}
                                        />
                                    </div>
                                </>
                            ) : (
                                // display sign in form
                                <>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    <div className="input-container">
                                        <input
                                            className="password-input"
                                            type={
                                                passwordShown
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <FontAwesomeIcon
                                            className="eye"
                                            icon={eye}
                                            onClick={togglePasswordVisiblity}
                                        />
                                    </div>
                                </>
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
