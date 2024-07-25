import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { backendUrl, imageUrl } from "../utils/urls";
import SocialLink from "../components/SocialLink";

const DynamicCard = () => {
    const { id } = useParams();
    const [card, setCard] = useState(null);
    const [editor, setEditor] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${backendUrl}/card/getcard/${id}`);
                setCard(res.data.card);
                setEditor(res.data.editor);
                document.title = `${res.data.card.first_name} ${res.data.card.last_name} | ${res.data.card.company_name} - ${res.data.card.designation}`
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);
    if (!card) {
        return <div className="dynamiccard_wrapper"></div>
    }
    return (
        <div className="preview  dynamiccard_wrapper theme1">
            {
                (editor && JSON.parse(localStorage.getItem("modules")).cardmanagementaccess.edit) &&
                <Link to={`/dashboard/editcard/${id}`} className="edit-btn">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
                    </svg>
                    Edit
                </Link>
            }
            <div className="dynamic_card_container">
                <div className="card-box">
                    <div className="card-image">
                        <img src={`${imageUrl}/${card.profileimage}`} alt="profile"/>
                    </div>
                    <div className="card-content">
                        <div className="name">{card.first_name} {card.last_name}</div>
                        <div className="company-desination">{card.company_name} - {card.designation}</div>
                        {
                            card.social_links.length !== 0 &&
                            <ul className="social-links">
                                {
                                    card.social_links.map((el, index) => {
                                        return (
                                            <li key={index}>
                                                {el.name === "facebook" && 
                                                    <SocialLink link={el.link}>
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"/>
                                                        </svg>
                                                    </SocialLink>
                                                }
                                                {
                                                    el.name === "twitter" &&
                                                    <SocialLink link={el.link}>
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clipRule="evenodd"/>
                                                        </svg>
                                                    </SocialLink>
                                                }
                                                {
                                                    el.name === "instagram" &&
                                                    <SocialLink link={el.link}>
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                                                        </svg>
                                                    </SocialLink>
                                                }
                                                {
                                                    el.name === "linkedin" &&
                                                    <SocialLink link={el.link}>
                                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd"/>
                                                        <path d="M7.2 8.809H4V19.5h3.2V8.809Z"/>
                                                        </svg>
                                                    </SocialLink>
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        }
                        <ul className="contact-box">
                            <li>
                                <i>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4Zm12 12V5H7v11h10Zm-5 1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z" clipRule="evenodd"/>
                                    </svg>
                                </i>
                                <Link className="contact-link" to={`tel:${card.phonenumber}`}>{card.phonecode} {card.phonenumber}</Link>
                            </li>
                            <li>
                                <i>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                                    </svg>
                                </i>
                                <Link className="contact-link" to={`mailto:${card.email}`}>{card.email}</Link>
                            </li>
                            <li>
                                <i>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
                                    </svg>
                                </i>
                                <span className="contact-link">{card.country}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default DynamicCard;