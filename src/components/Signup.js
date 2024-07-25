import { useState } from "react";
import Logo from "../assets/images/logo.png";
import Profile from "../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import Phone from "../assets/images/phone_skin.jpg";
import CustomSelect from "./CustomSelect";
import PhoneCodes from "../utils/PhoneCodes.json";
import Countries from '../utils/Countries.json';
import CountrySelect from "./CountrySelect";
import axios from "axios";
import { backendUrl } from "../utils/urls"; 
import { Flip, toast } from "react-toastify";
// import Google from '../assets/images/google.png';
// import Facebook from "../assets/images/facebook.png";

const Signup = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(Profile);
    const [showImage, setShowImage] = useState(false);
    const [profileImageupload, setProfileImageUpload] = useState(null);
    const handleImageChange = (e) => {
        setShowImage(true);
        const file = e.target.files[0];
        setProfileImageUpload(file);
        var reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    }
    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [designation, setDegisnation] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [current, setCurrent] = useState(1);
    const handleFirstSubmit = () => {
        let valid = true;
        if (name === "") {
            valid = false;
        }
        if (showImage === false) {
            valid = false;
        }
        if (valid) {
            setCurrent(2);
        } else {
            toast.warning("Please Enter name and Image", {
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
    const handleSecondSubmit = () => {
        let valid = true;
        if (companyName === "") {
            valid = false;
        }
        if (designation === "") {
            valid = false;
        }
        if (valid) {
            setCurrent(3);
            setShowCountry(true);
        } else {
            toast.warning("Please Enter company name and designation", {
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
    const decreaseCurrent = () => {
        if (current < 0) {
            setCurrent(0);
        } else {
            setCurrent(current - 1);
        }
    }
    //const [phoneCodes, setPhoneCodes] = useState(PhoneCodes);
    const [selectedValue, setSelectedValue] = useState("+91");
    //const [countries, setCountries] = useState(Countries);
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [showPhoneCode, setShowPhoneCode] = useState(false);
    const [showCountry, setShowCountry] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [loader, setLoader] = useState(false);
    const handleOptionChange = (option) => {
        setSelectedValue(option);
    };
    const handleCountryChange = (option) => {
        setSelectedCountry(option);
    }

    const handleChangeEmail = (e) => {
        setShowEmail(true);
        setEmail(e.target.value);
    }
    const handleChangePhone = (e) => {
        setShowPhoneCode(true);
        setPhone(e.target.value);
    }

    const handleSubmitThree = () => {
        let valid = true;

        if (email === "") {
            valid = false;
        }
        if (phone === "") {
            valid = false;
        }
        if (valid) {
            setCurrent(4);
        } else {
            toast.warning("Please enter email and phone", {
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
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignup = async () => {
        let valid = true;
        let valid2 = true;
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        if (password === "") {
            valid = false;
        } else {
            if (!regex.test(password)) {
                valid = false;
                valid2 = false;
                toast.warning("Password must have at least 8 characters, at least one uppercase letter & at least one digit", {
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
        if (valid === true && valid2 === true) {

            setLoader(true);

            let formData = new FormData();
            formData.append("image", profileImageupload);
            formData.append("name", name);
            formData.append("designation", designation);
            formData.append("companyname", companyName);
            formData.append("email", email);
            formData.append("phonecode", selectedValue);
            formData.append("phonenumber", phone);
            formData.append("country", selectedCountry);
            formData.append("password", password);
            
            const res = await axios.post(`${backendUrl}/user/signup`, formData, {
                'Content-Type': 'multipart/form-data'
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
                    onClose : () => success()
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
        } else if (valid === false && valid2 === true) {
            toast.warning("Please enter a valid password", {
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
    function success() {
        setLoader(false);
        navigate("/login");
    }
    return (
        <>
        {
            loader &&
            <div className="signup-loader-screen"></div>
        }
        {loader && <div className="signup-loader-shader"></div>}
        <div id="signup-wrapper">
            {
                current > 1 &&
                <button className="back-btn" onClick={() => decreaseCurrent()}>Back</button>
            }
            <div className="signup-col">
                <div className="signup-layout">
                    <div className="signup-form-logo">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <div className="signup-form-heading">Create Business Card</div>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                        <div className="form-progress">
                            <div className="progress-wrapper">
                                <div className="form-progress-bar active"></div>
                            </div>
                            <div className="progress-wrapper">
                                <div className={`form-progress-bar ${current >= 2 && "active"}`}></div>
                            </div>
                            <div className="progress-wrapper">
                                <div className={`form-progress-bar ${current >= 3 && "active"}`}></div>
                            </div>
                            <div className="progress-wrapper">
                                <div className={`form-progress-bar ${current === 4 && "active"}`}></div>
                            </div>
                        </div>
                    </div>
                    {
                        current === 1 &&
                        <div className="signup-tabs">
                            <div className="signup-tab-heading">Let's get started</div>
                            <p className="signup-tab-text">Make your digital business card in few steps. First, start with your image and name:</p>
                            <label htmlFor="profileimage" className="signup-label">Profile Image</label>
                            <div className="signup-image-wrapper">
                                <img src={profileImage} alt="Profile"/>
                                <input type="file" accept="image/*" className="signup-image" id="profileimage" title="" onChange={(e) => handleImageChange(e)}/>
                            </div>
                            <div className="signup-form-wrapper">
                                <label htmlFor="name" className="signup-label form-label">Name</label>
                                <input type="text" spellCheck="false" id="name" value={name} className="signup-input" onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="signup-submit">
                                <button onClick={() => handleFirstSubmit()}>Continue</button>
                            </div>
                            <p className="terms-text">By continuing, you acknowledge that you have read, understood, and agree to our <Link to="#">terms and conditions.</Link></p>
                            <p className="terms-text mb-0">Already have an account? <Link to="/login">Log in</Link></p>
                        </div>
                    }
                    {
                        current === 2 &&
                        <div className="signup-tabs">
                            <div className="signup-tab-heading">Company Info</div>
                            <p className="signup-tab-text">Add job title and company to your digital business card</p>
                            <div className="signup-form-wrapper mb-20px">
                                <label htmlFor="jotitle" className="signup-label form-label">Job Title</label>
                                <input type="text" id="jotitle" spellCheck="false" value={designation} className="signup-input" onChange={(e) => setDegisnation(e.target.value)}/>
                            </div>
                            <div className="signup-form-wrapper">
                                <label htmlFor="companyname" className="signup-label form-label">Company Name</label>
                                <input type="text" id="companyname" spellCheck="false" value={companyName} className="signup-input" onChange={(e) => setCompanyName(e.target.value)}/>
                            </div>
                            <div className="signup-submit">
                                <button onClick={() => handleSecondSubmit()}>Continue</button>
                            </div>
                        </div>
                    }
                    {
                        current === 3 &&
                        <div className="signup-tabs">
                            <div className="signup-tab-heading">Company Info</div>
                            <p className="signup-tab-text">Add job title and company to your digital business card</p>
                            <div className="signup-form-wrapper mb-20px">
                                <label htmlFor="email" className="signup-label form-label">Email</label>
                                <input type="text" spellCheck="false" id="email" value={email} className="signup-input" onChange={(e) => handleChangeEmail(e)}/>
                            </div>
                            <div className="signup-form-phone-wrapper mb-20px">
                                <label htmlFor="phonenumber" className="signup-label form-label">Phone</label>
                                <div className="phonecode-select">
                                    <CustomSelect options={PhoneCodes} initialSelectedValue={selectedValue} onOptionChange={handleOptionChange} />
                                </div>
                                <input type="tel" id="phonenumber" className="phone-number-input" value={phone} onChange={(e) => handleChangePhone(e)}/>    
                            </div>
                            <div className="signup-form-phone-wrapper">
                                <label htmlFor="country" className="signup-label form-label">Country</label>
                                <CountrySelect options={Countries} initialSelectedValue={selectedCountry} onOptionChange={handleCountryChange}/>
                            </div>
                            <div className="signup-submit">
                                <button onClick={() => handleSubmitThree()}>Continue</button>
                            </div>
                        </div>
                    }
                    {
                        current === 4 &&
                        <div className="signup-tabs">
                            <div className="signup-tab-heading">Sign Up</div>
                            <p className="signup-tab-text">Sign up below to save your card, you can add content on next page.</p>
                            <div className="signup-form-wrapper mb-20px">
                                <label htmlFor="email" className="signup-label form-label">Email</label>
                                <input type="text" id="email" value={email} className="signup-input" onChange={(e) => handleChangeEmail(e)}/>
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
                            <div className="signup-submit">
                                <button onClick={() => handleSignup()}>Signup</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={`signup-col signup-preview-col ${loader && "fixed"}`}>
                <div className="preview-relative">
                    <img src={Phone} alt="Phone" className="preview-phone"/>
                    <div className="preview-div">
                        <div className="preview-inner">
                            {
                                showImage &&
                                <div className="preview-image">
                                    <img src={profileImage} alt="profile-image"/>
                                </div>
                            }
                            {
                                name.length > 0 &&
                                <div className="profile-name">
                                    {name}    
                                </div>
                            }
                            {
                                (companyName.length > 0 || designation.length > 0) &&
                                <div className="profile-company-desination">
                                    {companyName} - {designation}
                                </div>
                            }
                            <ul className="preview-contact">
                                {
                                    showEmail &&
                                    <li>
                                        <i><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z"/>
                                        <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z"/>
                                        </svg>
                                        </i>
                                        <div>
                                            {email}
                                        </div>
                                    </li>
                                }
                                {
                                    showPhoneCode &&
                                    <li>
                                        <i>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z"/>
                                        </svg>
                                        </i>
                                        <div>{selectedValue} {phone}</div>
                                    </li>
                                }
                                {
                                    showCountry &&
                                    <li>
                                        <i>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z" clipRule="evenodd"/>
                                        </svg>
                                        </i>
                                        <div>{selectedCountry}</div>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup;