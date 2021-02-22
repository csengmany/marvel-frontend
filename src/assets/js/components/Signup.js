const Signup = ({
    email,
    username,
    setUsername,
    password,
    confirmPassword,
    setConfirmPassword,
    handleEmailChange,
    handlePasswordChange,
}) => {
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    return (
        <div className="sign-form">
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
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
            />
            <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
        </div>
    );
};

export default Signup;
