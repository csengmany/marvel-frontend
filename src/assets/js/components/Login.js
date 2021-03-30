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
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
            />
        </div>
    );
};

export default Login;
