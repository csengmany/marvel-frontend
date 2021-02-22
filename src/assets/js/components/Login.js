const Login = ({
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
}) => {
    return (
        <div className="sign-form">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
            />
        </div>
    );
};

export default Login;
