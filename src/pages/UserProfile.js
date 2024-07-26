import Layout from '../components/Layout';
import Profile from "../assets/images/user.png";
import { useState } from 'react';
import axios from 'axios';
import { backendUrl, imageUrl } from '../utils/urls';
import CustomSelect from "../components/CustomSelect";
import PhoneCodes from "../utils/PhoneCodes.json";
import Countries from '../utils/Countries.json';
import CountrySelect from "../components/CountrySelect";
import { Flip, toast } from 'react-toastify';

const UserProfile = () => {
    const [profileImage, setProfileImage] = useState(Profile);
    const [profileImageupload, setProfileImageUpload] = useState(null);

    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [designation, setDegisnation] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImageUpload(file);
        var reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
    }

    const [selectedValue, setSelectedValue] = useState("+91");
    const [selectedCountry, setSelectedCountry] = useState("India");
    const handleOptionChange = (option) => {
        setSelectedValue(option);
    };
    const handleCountryChange = (option) => {
        setSelectedCountry(option);
    }

    useState(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${backendUrl}/user/get`);
                if (res.data.user.image) {
                    setProfileImage(`${imageUrl}/${res.data.user.image}`);
                }
                setName(res.data.user.name);
                if (res.data.user.jobtitle) {
                    setDegisnation(res.data.user.jobtitle);
                }
                if (res.data.user.companyname) {
                    setCompanyName(res.data.user.companyname);
                }
                setEmail(res.data.user.email);
                setSelectedValue(res.data.user.phonecode);
                setPhone(res.data.user.phonenumber);
                setSelectedCountry(res.data.user.country);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfile();
    }, [])
    const handleRemoveProfileImage = async () => {
        try {
            await axios.put(`${backendUrl}/user/removeprofileimage`);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateProfile = async () => {
        try {
            
            let valid = true;

            if (name === "") {
                valid = false;
            }
            if (designation === "") {
                valid = false;
            }
            if (companyName === "") {
                valid = false;
            }
            if (email === "") {
                valid = false;
            }
            if (phone === "") {
                valid = false;
            }

            if (valid) {
                const formData = new FormData();
                formData.append("image", profileImageupload);
                formData.append("name", name);
                formData.append("designation", designation);
                formData.append("companyname", companyName);
                formData.append("email", email);
                formData.append("phonecode", selectedValue);
                formData.append("phonenumber", phone);
                formData.append("country", selectedCountry);
                const res = await axios.put(`${backendUrl}/user/updatesingleuser`, formData, {
                    'Content-Type': 'multipart/form-data'
                });
                if (res.status === 200) {
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
                        onClose : () => window.location.reload()
                    })
                }
            } else {
                toast.warning("All fields required", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Flip
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout menuActive={"userprofile"} submenuactive={"profile"}>
            <div className='application-main-layout'>
                <div className='container-fluid'>
                    <div className='card'>
                        <div className='card-header'>
                            <div className="card-header-heading">
                                User Profile
                            </div>
                            <button className='btn btn-primary' onClick={handleUpdateProfile}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/>
                                </svg>
                                Update
                            </button>
                        </div>
                        <div className='card-body'>
                            <div className='profilepage-image-wrapper mb-20px'>
                                <div className="signup-image-wrapper m-0">
                                    <img src={profileImage} alt="Profile"/>
                                    <input type="file" accept="image/*" className="signup-image" id="profileimage" title="" onChange={(e) => handleImageChange(e)}/>
                                </div>
                                <button className='remove-btn' onClick={handleRemoveProfileImage}>Remove</button>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="signup-form-wrapper mb-20px">
                                        <label htmlFor="name" className="signup-label form-label">Name</label>
                                        <input type="text" spellCheck="false" id="name" value={name} className="signup-input" onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="signup-form-wrapper mb-20px">
                                        <label htmlFor="jotitle" className="signup-label form-label">Job Title</label>
                                        <input type="text" id="jotitle" spellCheck="false" value={designation} className="signup-input" onChange={(e) => setDegisnation(e.target.value)}/>
                                    </div>
                                    <div className="signup-form-wrapper mb-20px">
                                        <label htmlFor="companyname" className="signup-label form-label">Company Name</label>
                                        <input type="text" id="companyname" spellCheck="false" value={companyName} className="signup-input" onChange={(e) => setCompanyName(e.target.value)}/>
                                    </div>
                                    <div className="signup-form-wrapper mb-20px">
                                        <label htmlFor="email" className="signup-label form-label">Email</label>
                                        <input type="text" spellCheck="false" id="email" value={email} className="signup-input" onChange={(e) => setEmail(e)}/>
                                    </div>
                                    <div className="signup-form-phone-wrapper mb-20px">
                                        <label htmlFor="phonenumber" className="signup-label form-label">Phone</label>
                                        <div className="phonecode-select">
                                            <CustomSelect options={PhoneCodes} initialSelectedValue={selectedValue} onOptionChange={handleOptionChange} />
                                        </div>
                                        <input type="tel" id="phonenumber" className="phone-number-input" value={phone} onChange={(e) => setPhone(e)}/>    
                                    </div>
                                    <div className="signup-form-phone-wrapper">
                                        <label htmlFor="country" className="signup-label form-label">Country</label>
                                        <CountrySelect options={Countries} initialSelectedValue={selectedCountry} onOptionChange={handleCountryChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile;