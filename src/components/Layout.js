import { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import Profile from "../assets/images/user.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl, imageUrl } from "../utils/urls";
import { Flip, toast } from "react-toastify";
import FirstLogin from "./FirstLogin";

const Layout = ({ children, menuActive, submenuactive }) => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(Profile);
    const [userProfileAccordion, setUserProfileAccordion] = useState(false);
    const [user, setUser] = useState({});

    const [firstLogin, setFirstLogin] = useState(false);

    useEffect(() => { 
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${backendUrl}/user/get`);
                setUser(res.data.user);
                if (res.data.user.image) {
                    setProfileImage(`${imageUrl}/${res.data.user.image}`);
                }
                if (localStorage.getItem("modules")) {
                    localStorage.removeItem("modules");
                }
                localStorage.setItem("modules", JSON.stringify(res.data.user.modules));
                if (res.data.user.firstLogin) {
                    setFirstLogin(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post(`${backendUrl}/user/logout`);
            toast.success("Logged out successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Flip,
                onClose : () => navigate("/login")
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        {
            firstLogin ?
            <FirstLogin username={user.name}/>
            :
            <div className="application-layout-wrapper">
                <div className="application-layout-header">
                    <header>
                        <div className="container-fluid">
                            <div className="header-top">
                                <button className="sidebar-toogler">
                                    <i className='bx bx-menu'></i> Menu
                                </button>
                                <div className="header-logo">
                                    <img src={Logo} alt="logo"/>
                                </div>
                                <Link to="/dashboard/raiserequest" className="req-btn">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z"/>
                                    </svg>
                                    Raise A Request
                                </Link>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="application-sidebar-layout">
                    <button className="sidebar-user" onClick={() => setUserProfileAccordion(!userProfileAccordion)}>
                        <i><img src={profileImage} alt="profile"/></i>
                        <span>
                            {user.name && user.name.split(" ")[0]}
                            <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/>
                            </svg>
                        </span>
                    </button>
                    {
                        (submenuactive === "profile") ?
                        <>
                        {
                            !userProfileAccordion &&
                            <div className="user-profile-body">
                                <ul className="user-profile-btns">
                                    <li>
                                        <Link to="/dashboard/userprofile" className={`${menuActive === "userprofile" && "active"}`}>
                                        <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                        </svg>
                                        User Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>
                                        <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white reverse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                                        </svg>
                                        Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                        </>
                        :
                        <>
                        {
                            userProfileAccordion &&
                            <div className="user-profile-body">
                                <ul className="user-profile-btns">
                                    <li>
                                        <Link to="/dashboard/userprofile" className={`${menuActive === "userprofile" && "active"}`}>
                                        <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                        </svg>
                                        User Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout}>
                                        <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white reverse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                                        </svg>
                                        Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        }
                        </>
                    }
                    <ul className="user-profile-btns">
                        <li>
                            <Link to="/dashboard" className={`${menuActive === "dashboard" && "active"}`}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"/>
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <div className="sidebar-heading">Card Management</div>
                    {
                        localStorage.getItem("modules") &&
                        <ul className="user-profile-btns">
                            {
                                JSON.parse(localStorage.getItem("modules")).cardmanagement &&
                                <li>
                                    <Link to="/dashboard/cards" className={`${menuActive === "cards" && "active"}`}>
                                        <svg className="w-[32px] h-[32px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"/>
                                        </svg>
                                        My Cards
                                    </Link>
                                </li>
                            }
                            {
                                JSON.parse(localStorage.getItem("modules")).usermanagement &&
                                <li>
                                    <Link to="/dashboard/users" className={`${menuActive === "users" && "active"}`}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                        My Users
                                    </Link>
                                </li>
                            }
                        </ul>
                    }
                </div>
                <main>
                    { children }
                </main>
            </div>
        }
        </>
    )
}

export default Layout;