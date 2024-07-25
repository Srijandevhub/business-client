import { Link } from "react-router-dom";
import Profile from "../assets/images/user.png";
import { imageUrl } from "../utils/urls";
const UserBox = ({ data }) => {
    
    return (
        <div className="card-box">
            <div className="card-box-top">
                <i><img src={data.image ? `${imageUrl}/${data.image}` : Profile} alt="profile"/></i>
                <div className="card-details">
                    <div className="card-name mb-20px">{data.name}</div>
                    <div className="card-link">{data.email} | {data.phonecode} {data.phonenumber}</div>
                </div>
            </div>
            <ul>
                {
                    localStorage.getItem("modules") &&
                    <li>
                        {
                            JSON.parse(localStorage.getItem("modules")).usermanagementaccess.edit &&
                            <Link to={`/dashboard/edituser/${data._id}`}>
                                <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                                Edit
                            </Link>
                        }
                    </li>
                }
                <li>
                    <Link>
                        <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                        <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        View
                    </Link>
                </li>
                {
                    localStorage.getItem("modules") &&
                    <li>
                        {
                            JSON.parse(localStorage.getItem("modules")).usermanagementaccess.delete &&
                            <button className="bg-delete">
                                <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                </svg>
                                Delete
                            </button>
                        }
                    </li>
                }
            </ul>
        </div>
    )
}

export default UserBox;