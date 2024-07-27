import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CustomSelect from "../components/CustomSelect";
import PhoneCodes from "../utils/PhoneCodes.json";
import Countries from '../utils/Countries.json';
import CountrySelect from "../components/CountrySelect";
import { Flip, toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../utils/urls";
import { useParams } from "react-router-dom";

const EditUser = () => {

    const { id } = useParams();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    //const [showPassword, setShowPassword] = useState(false);
    const [selectedValue, setSelectedValue] = useState("+91");
    const [selectedCountry, setSelectedCountry] = useState("India");

    const [cardmanagement, setcardmanagement] = useState(false);
    const [create, setCreate] = useState(false);
    const [del, setdelete] = useState(false);
    const [share, setshare] = useState(false);
    const [edit, setedit] = useState(false);

    const handleCardManagement = () => {
        setcardmanagement(!cardmanagement);
    }
    const handlecreate = () => {
        setCreate(!create);
    }
    const handledel = () => {
        setdelete(!del);
    }
    const handleshare = () => {
        setshare(!share);
    }
    const handleedit = () => {
        setedit(!edit);
    }

    const [usermanagement, setusermanagement] = useState(false);
    const [umcreate, setumCreate] = useState(false);
    const [umdel, setumdelete] = useState(false);
    const [umedit, setumedit] = useState(false);

    const handleusermanagement = () => {
        setusermanagement(!usermanagement);
    }
    const handleumcreate = () => {
        setumCreate(!umcreate);
    }
    const handleumdel = () => {
        setumdelete(!umdel);
    }
    const handleumedit = () => {
        setumedit(!umedit);
    }




    const handleCountryChange = (option) => {
        setSelectedCountry(option);
    }
    // const handleShowPassword = () => {
    //     setShowPassword(!showPassword);
    // }
    const handleOptionChange = (option) => {
        setSelectedValue(option);
    }

    const handleUpdateUser = async () => {
        let valid = true;

        if (name === "") {
            valid = false;
        }
        if (email === "") {
            valid = false;
        }
        if (phone === "") {
            valid = false;
        }
        if (valid === true) {
            const res = await axios.put(`${backendUrl}/user/updateuser/${id}`, {
                name: name,
                email: email,
                phonecode: selectedValue,
                phonenumber: phone,
                country: selectedCountry,
                cardmanagement: cardmanagement,
                cardmanagementCreate: create,
                cardmanagementEdit: edit,
                cardmanagementDelete: del,
                cardmanagementShare: share,
                usermanagement: usermanagement,
                umcreate: umcreate,
                umedit: umedit,
                umdel: umdel
            });
            console.log(res.data.user);
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
                    transition: Flip
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
        } else if (valid === false) {
            toast.warning("All fields required", {
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${backendUrl}/user/getuser/${id}`);                
                setName(res.data.user.name);
                setEmail(res.data.user.email);
                setSelectedValue(res.data.user.phonecode);
                setPhone(res.data.user.phonenumber);
                setSelectedCountry(res.data.user.country);
                //setPassword(res.data.user.password);
                setcardmanagement(res.data.user.modules.cardmanagement);
                setCreate(res.data.user.modules.cardmanagementaccess.create);
                setedit(res.data.user.modules.cardmanagementaccess.edit);
                setdelete(res.data.user.modules.cardmanagementaccess.delete);
                setshare(res.data.user.modules.cardmanagementaccess.share);
                setusermanagement(res.data.user.modules.usermanagement);
                setumCreate(res.data.user.modules.usermanagementaccess.create);
                setumedit(res.data.user.modules.usermanagementaccess.edit);
                setumdelete(res.data.user.modules.usermanagementaccess.delete);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id])
    if (localStorage.getItem("modules")) {
        if (!JSON.parse(localStorage.getItem("modules")).usermanagementaccess.edit) {
            return <div>Access Denied</div>
        }
    }
    return (
        <Layout>
            <div className="application-main-layout">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header-heading">
                                Edit User
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="createuser-form">
                                <div className="signup-form-wrapper mb-20px">
                                    <label htmlFor="name" className="signup-label form-label">Name</label>
                                    <input type="text" spellCheck="false" id="name" value={name} className="signup-input" onChange={(e) => setName(e.target.value)}/>
                                </div>
                                <div className="signup-form-wrapper mb-20px">
                                    <label htmlFor="email" className="signup-label form-label">Email</label>
                                    <input type="text" spellCheck="false" id="email" value={email} className="signup-input" onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="signup-form-phone-wrapper mb-20px">
                                    <label htmlFor="phonenumber" className="signup-label form-label">Phone</label>
                                    <div className="phonecode-select">
                                        <CustomSelect options={PhoneCodes} initialSelectedValue={selectedValue} onOptionChange={handleOptionChange} />
                                    </div>
                                    <input type="tel" id="phonenumber" className="phone-number-input" value={phone} onChange={(e) => setPhone(e.target.value)}/>    
                                </div>
                                <div className="signup-form-phone-wrapper mb-20px">
                                    <label htmlFor="country" className="signup-label form-label">Country</label>
                                    <CountrySelect options={Countries} initialSelectedValue={selectedCountry} onOptionChange={handleCountryChange}/>
                                </div>
                                {/* <div className="signup-form-wrapper mb-20px">
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
                                </div> */}
                                <div className="check-input mb-20px">
                                    <input type="checkbox" id="cardmanagement" onChange={handleCardManagement}/>
                                    <label htmlFor="cardmanagement">Access to card management</label>
                                    <button className={`switch ${cardmanagement && "active"}`} onClick={() => handleCardManagement()}>
                                        <span className="switch-inner">
                                            <span className="switch-btn"></span>
                                        </span>
                                        switch
                                    </button>
                                </div>
                                {
                                    cardmanagement &&
                                    <div className="row mb-20px">
                                        <div className="col-6">
                                            <div className="check-input mb-20px">
                                                <input type="checkbox" id="cmcreate" onChange={handlecreate}/>
                                                <label htmlFor="cmcreate">Create</label>
                                                <button className={`switch ${create && "active"}`} onClick={() => handlecreate()}>
                                                    <span className="switch-inner">
                                                        <span className="switch-btn"></span>
                                                    </span>
                                                    switch
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="check-input mb-20px">
                                                <input type="checkbox" id="cmedit" onChange={handleedit}/>
                                                <label htmlFor="cmedit">Edit</label>
                                                <button className={`switch ${edit && "active"}`} onClick={() => handleedit()}>
                                                    <span className="switch-inner">
                                                        <span className="switch-btn"></span>
                                                    </span>
                                                    switch
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="check-input mb-20px">
                                                <input type="checkbox" id="cmdel" onChange={handledel}/>
                                                <label htmlFor="cmdel">Delete</label>
                                                <button className={`switch ${del && "active"}`} onClick={() => handledel()}>
                                                    <span className="switch-inner">
                                                        <span className="switch-btn"></span>
                                                    </span>
                                                    switch
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="check-input mb-20px">
                                                <input type="checkbox" id="cmshare" onChange={handleshare}/>
                                                <label htmlFor="cmshare">Share</label>
                                                <button className={`switch ${share && "active"}`} onClick={() => handleshare()}>
                                                    <span className="switch-inner">
                                                        <span className="switch-btn"></span>
                                                    </span>
                                                    switch
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="check-input mb-20px">
                                    <input type="checkbox" id="usermanagement" onChange={handleusermanagement}/>
                                    <label htmlFor="usermanagement">Access to user management</label>
                                    <button className={`switch ${usermanagement && "active"}`} onClick={() => handleusermanagement()}>
                                        <span className="switch-inner">
                                            <span className="switch-btn"></span>
                                        </span>
                                        switch
                                    </button>
                                </div>
                                {
                                    usermanagement &&
                                    <div className="row mb-20px">
                                        <div className="col-6">
                                            <div className="check-input mb-20px">
                                                <input type="checkbox" id="umcreate" onChange={handleumcreate}/>
                                                <label htmlFor="umcreate">Create</label>
                                                <button className={`switch ${umcreate && "active"}`} onClick={() => handleumcreate()}>
                                                    <span className="switch-inner">
                                                        <span className="switch-btn"></span>
                                                    </span>
                                                    switch
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="check-input mb-20px">
                                                <input type="checkbox" id="umedit" onChange={handleumedit}/>
                                                <label htmlFor="umedit">Edit</label>
                                                <button className={`switch ${umedit && "active"}`} onClick={() => handleumedit()}>
                                                    <span className="switch-inner">
                                                        <span className="switch-btn"></span>
                                                    </span>
                                                    switch
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="check-input mb-20px">
                                                <input type="checkbox" id="umdel" onChange={handleumdel}/>
                                                <label htmlFor="umdel">Delete</label>
                                                <button className={`switch ${umdel && "active"}`} onClick={() => handleumdel()}>
                                                    <span className="switch-inner">
                                                        <span className="switch-btn"></span>
                                                    </span>
                                                    switch
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div>
                                    <button className="btn btn-primary w-100" onClick={handleUpdateUser}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditUser;