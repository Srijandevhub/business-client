import { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils/urls";
import { Flip, toast } from "react-toastify";
axios.defaults.withCredentials = true;
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const handlelogin = async () => {
        let valid = true;
        if (email === "") {
            valid = false;
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
        if (password === "") {
            valid = false;
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }

        if (valid) {
            const res = await axios.post(`${backendUrl}/user/login`, {
                email: email,
                password: password
            });
            const status = res.status;
            if (status === 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                    onClose: () => navigate("/dashboard")
                });
            } else if (status === 400) {
                toast.warning(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            } else if (status === 500) {
                toast.warning(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
            }
        }

    }
    return (
        <div className="login-wrapper">
            <div className="login-form-wrapper">
                <div className="signup-form-logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <div className="signup-form-heading">Log in to your account</div>
                <div className="signup-form-wrapper mb-20px">
                    <label htmlFor="email" className="signup-label form-label">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="signup-input"/>
                    {emailValid && <p className="invalid-text">Email is required</p>}
                </div>
                <div className="signup-form-wrapper">
                    <label htmlFor="password" className="signup-label form-label">Password</label>
                    <input type={`${showPassword ? "text" : "password"}`} value={password} id="password" className="signup-input" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="showpassword-toogler" onClick={() => handleShowPassword()}>
                    {
                        showPassword ?
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    :
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                    </svg>
                    
                    }
                    </button>
                </div>
                {passwordValid && <p className="invalid-text">Password is required</p>}
                <div className="signup-submit">
                    <button type="submit" onClick={() => handlelogin()}>Login</button>
                </div>
                <p className="terms-text mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login;