import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import $ from 'jquery';
import Phone from "../assets/images/phone_skin2.png";
import Camera from "../assets/images/camera.png";
import CustomSelect from "../components/CustomSelect";
import PhoneCodes from "../utils/PhoneCodes.json";
import Countries from '../utils/Countries.json';
import CountrySelect from "../components/CountrySelect";
import Profile from "../assets/images/user.png";
import Preview from "../components/Preview";
import { Flip, toast } from "react-toastify";
import axios from "axios";
import { backendUrl, imageUrl } from "../utils/urls";
import { useNavigate, useParams } from "react-router-dom";

const EditCard = () => {
    
    const { id } = useParams();

    const navigate = useNavigate();
    const [tab, setTab] = useState("basic");
    const [tabHeight, setTabHeight] = useState(300);
    const [selectedValue, setSelectedValue] = useState("+91");
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [profileImage, setProfileImage] = useState(Profile);
    const [profileImageFile, setProfileImageFile] = useState(null);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");

    const [socialLinks, setSocialLink] = useState([])

    useEffect(() => {
        let pageHeight = window.innerHeight;
        let headerHeight = $("header").height() + 1;
        let tabsHeight = $(".editor-tabs").height();
        let extras = 15 + 24 + 15;
        let total = pageHeight - (headerHeight + tabsHeight + extras);
        setTabHeight(total - 2);
    }, []);
    const handleOptionChange = (option) => {
        setSelectedValue(option);
    };
    const handleCountryChange = (option) => {
        setSelectedCountry(option);
    }
    const handleAddSocialLink = () => {
        if (socialLinks.length < 4) {
            setSocialLink([
                ...socialLinks,
                {
                    id: Date.now(),
                    "name": "facebook",
                    "link": ""
                }
            ])
        } else {
            alert("You can add only four social media links");
        }
    }
    const handleDeleteSocialLink = (id) => {
        setSocialLink(socialLinks.filter((link) => link.id !== id));
    }
    const handleSocialType = (id, type) => {
        setSocialLink(socialLinks.map(el => 
            el.id === id ? { ...el, name: type } : el
        ));
    }
    const handelSocialLinks = (id, link) => {
        setSocialLink(socialLinks.map(el =>
            el.id === id ? { ...el, link: link } : el
        ))
    }
    const [enableWhatsapp, setEnableWhatsapp] = useState(false);
    const [enablePublish, setEnablePublish] = useState(false);
    const [whatsappNumbber, setWhatsappNumber] = useState("");
    const [whatsappMessage, setWhatsappMessage] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const handleEnableWhatsappBtn = () => {
        setEnableWhatsapp(!enableWhatsapp);
    }
    const handleEnablePublish = () => {
        setEnablePublish(!enablePublish);
    }
    const handleProfilePicture = (e) => {
        const file = e.target.files[0];
        setProfileImageFile(file);
        var reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        }
        reader.readAsDataURL(file);
    }
    const handleSave = async () => {

        let valid = true;

        if (fname === "") {
            valid = false;
        }
        if (lname === "") {
            valid = false;
        }
        if (company === "") {
            valid = false;
        }
        if (email === "") {
            valid = false;
        }
        if (phoneNumber === "") {
            valid = false;
        }
        if (socialLinks.length !== 0) {
            socialLinks.forEach((l) => {
                if (l.name === "" || l.link === "") {
                    valid = false;
                }
            })
        }

        if (valid) {

            const formData = new FormData();
            formData.append("profileimage", profileImageFile);
            formData.append("first_name", fname);
            formData.append("last_name", lname);
            formData.append("company_name", company);
            formData.append("designation", designation);
            formData.append("email", email);
            formData.append("phonecode", selectedValue);
            formData.append("phonenumber", phoneNumber);
            formData.append("country", selectedCountry);
            formData.append("social_links", JSON.stringify(socialLinks));
            formData.append("enable_whatsapp", enableWhatsapp);
            formData.append("whatsapp_number", whatsappNumbber);
            formData.append("whatsapp_message", whatsappMessage);
            formData.append("isPublished", enablePublish);

            const res = await axios.put(`${backendUrl}/card/updatecard/${id}`, formData, {
                'Content-Type': 'multipart/form-data'
            });

            if (res.status === 200) {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                    onClose: () => navigate(`/card/${id}`)
                })
            }

        } else {
            toast.warning("All fields are required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Flip
            })
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${backendUrl}/card/getcard/${id}`);
                setProfileImage(`${imageUrl}/${res.data.card.profileimage}`);
                setFname(res.data.card.first_name);
                setLname(res.data.card.last_name);
                setCompany(res.data.card.company_name);
                setDesignation(res.data.card.designation);
                setEmail(res.data.card.email);
                setPhoneNumber(res.data.card.phonenumber);
                setSelectedValue(res.data.card.phonecode);
                setSelectedCountry(res.data.card.country);
                setSocialLink(res.data.card.social_links);
                setEnableWhatsapp(res.data.card.enable_whatsapp);
                setWhatsappNumber(res.data.card.whatsapp_number);
                setWhatsappMessage(res.data.card.whatsapp_message);
                setEnablePublish(res.data.card.isPublished);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);
    if (localStorage.getItem("modules")) {
        if (!JSON.parse(localStorage.getItem("modules")).cardmanagementaccess.edit) {
            return <div>Access Denied</div>
        }
    }
    return (
        <Layout>
            <ul className="fixed-buttons">
                <li>
                    <button className="btn btn-primary bg-danger" onClick={handleSave}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h11.586a1 1 0 0 1 .707.293l2.414 2.414a1 1 0 0 1 .293.707V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Z"/>
                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M8 4h8v4H8V4Zm7 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        Save
                    </button>
                </li>
            </ul>
            <div className="row m-0">
                <div className="col-form">
                    <div className="editor-tabs">
                        <div className="container-fluid">
                            <ul>
                                <li><button className={`${tab === "basic" && "active"}`} onClick={() => setTab("basic")}>Card Details</button></li>
                                {/* <li><button className={`${tab === "content" && "active"}`} onClick={() => setTab("content")}>Content</button></li>
                                <li><button className={`${tab === "services" && "active"}`} onClick={() => setTab("services")}>Services</button></li> */}
                                <li><button className={`${tab === "settings" && "active"}`} onClick={() => setTab("settings")}>Settings</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                {
                                    tab === "basic" &&
                                    <div className="card-header-heading">
                                        Card Details
                                    </div>
                                }
                                {
                                    tab === "settings" &&
                                    <div className="card-header-heading">
                                        Card Settings
                                    </div>
                                }
                            </div>
                            <div className="card-body">
                                {
                                    tab === "basic" &&
                                    <div className="create-card-tabs" style={{ height: `${tabHeight}px` }}>
                                        <p>This is what people see when they download your contact information.</p>
                                        <div className="signup-image-wrapper m-0 mb-20px">
                                            <img src={profileImage} alt="Profile"/>
                                            <input type="file" accept="image/*" className="signup-image" id="profileimage" title="" onChange={(e) => handleProfilePicture(e)}/>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="signup-form-wrapper mb-20px">
                                                    <label htmlFor="fname" className="signup-label form-label">First Name</label>
                                                    <input type="text" id="fname" className="signup-input" value={fname} onChange={(e) => setFname(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="signup-form-wrapper mb-20px">
                                                    <label htmlFor="lname" className="signup-label form-label">Last Name</label>
                                                    <input type="text" id="lname" className="signup-input" value={lname} onChange={(e) => setLname(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="signup-form-wrapper mb-20px">
                                                    <label htmlFor="companyname" className="signup-label form-label">Company Name</label>
                                                    <input type="text" id="companyname" className="signup-input" value={company} onChange={(e) => setCompany(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="signup-form-wrapper mb-20px">
                                                    <label htmlFor="jobtitle" className="signup-label form-label">Job Title/ Designation</label>
                                                    <input type="text" id="jobtitle" className="signup-input" value={designation} onChange={(e) => setDesignation(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="signup-form-wrapper mb-20px">
                                                    <label htmlFor="lname" className="signup-label form-label">Email</label>
                                                    <input type="email" id="lname" className="signup-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="signup-form-phone-wrapper mb-20px">
                                                    <label htmlFor="phonenumber" className="signup-label form-label">Phone</label>
                                                    <div className="phonecode-select">
                                                        <CustomSelect options={PhoneCodes} initialSelectedValue={selectedValue} onOptionChange={handleOptionChange} />
                                                    </div>
                                                    <input type="tel" id="phonenumber" className="phone-number-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>    
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="signup-form-phone-wrapper mb-20px">
                                                    <label htmlFor="country" className="signup-label form-label">Country</label>
                                                    <CountrySelect options={Countries} initialSelectedValue={selectedCountry} onOptionChange={handleCountryChange}/>
                                                </div>
                                            </div>    
                                        </div>
                                        <div className="row">
                                            <div className="col-6 mb-20px">
                                                <button className="btn btn-primary btn-primary-alter" onClick={() => handleAddSocialLink()}>
                                                    <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                    </svg>
                                                    Add Social Media Links
                                                </button>
                                            </div>
                                            <div className="col-6 mb-20px"></div>
                                            {
                                                socialLinks.map((el, index) => {
                                                    return (
                                                        <div className="col-6" key={el.id}>
                                                            <div className="signup-form-phone-wrapper mb-20px">
                                                                <div className="phonecode-select social-select">
                                                                    <select defaultValue={el.name} onChange={(e) => handleSocialType(el.id, e.target.value)}>
                                                                        <option value="facebook">Facebook</option>
                                                                        <option value="twitter">Twitter</option>
                                                                        <option value="instagram">Instagram</option>
                                                                        <option value="linkedin">Linedin</option>
                                                                    </select>
                                                                </div>
                                                                <input type="text" value={el.link} className="signup-input social-link-input" onChange={(e) => handelSocialLinks(el.id, e.target.value)}/>    
                                                                <button className="showpassword-toogler text-danger" onClick={() => handleDeleteSocialLink(el.id)}>
                                                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                                    </svg>
                                                                    delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="card-header-heading">Whatsapp</div>
                                                <p>Enter your whatsapp number to get more leads on your WhatsApp.</p>
                                                <div className="check-input mb-20px">
                                                    <input type="checkbox" id="whatsappEnable" onChange={handleEnableWhatsappBtn}/>
                                                    <label htmlFor="whatsappEnable">Enable Whatsapp Button</label>
                                                    <button className={`switch ${enableWhatsapp && "active"}`} onClick={() => handleEnableWhatsappBtn()}>
                                                        <span className="switch-inner">
                                                            <span className="switch-btn"></span>
                                                        </span>
                                                        switch
                                                    </button>
                                                </div>
                                                <div className="form-wrapper">
                                                    <input type="tel" placeholder="Whatsapp Number" value={whatsappNumbber} onChange={(e) => setWhatsappNumber(e.target.value)}/>
                                                </div>
                                                <div className="form-wrapper mb-0">
                                                    <textarea placeholder="Message" onChange={(e) => setWhatsappMessage(e.target.value)} defaultValue={whatsappMessage}></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    tab === "settings" &&
                                    <div className="create-card-tabs" style={{ height: `${tabHeight}px` }}>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="check-input mb-20px">
                                                    <input type="checkbox" id="whatsappEnable" onChange={handleEnablePublish}/>
                                                    <label htmlFor="whatsappEnable">Publish the card for public</label>
                                                    <button className={`switch ${enablePublish && "active"}`} onClick={() => handleEnablePublish()}>
                                                        <span className="switch-inner">
                                                            <span className="switch-btn"></span>
                                                        </span>
                                                        switch
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-preview">
                    <div className="preview-header">
                        <div className="preview-heading">Preview</div>
                    </div>
                    <div className="preview-container">
                        <div className="preview-wrapper">
                            <img src={Phone} alt="phone"/>
                            <div className="preview-content-wrapper">
                                <span className="phone-camera"><img src={Camera} alt="camera"/></span>
                                <div className="preview-content">
                                    <Preview profilePicture={profileImage} themeName={"theme1"} fname={fname.length !== 0 ? fname : "Name"} lname={lname.length !== 0 ? lname : "Title"} company={company.length !== 0 ? company : "xyz pvt ltd"} designation={designation.length !== 0 ? designation : "CEO"} socialLinks={socialLinks} showWhatsapp={enableWhatsapp} whatsappNumber={whatsappNumbber} whatsappMessage={whatsappMessage} phoneCode={selectedValue | "+91"} phoneNumber={phoneNumber.length !== 0 ? phoneNumber : "1234567896"} email={email.length !== 0 ? email : "example@example.com"} country={selectedCountry}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default EditCard;