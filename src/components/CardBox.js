import { Link } from "react-router-dom";
import Profile from "../assets/images/user.png";
import { backendUrl, imageUrl } from "../utils/urls";
import axios from "axios";
import { Flip, toast } from "react-toastify";
const CardBox = ({ data }) => {
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${backendUrl}/card/deletecard/${id}`);
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
                    onClose: () => window.location.reload()
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleShare = async () => {
        try {
          if (navigator.share) {
            navigator.share({
              title: `${data.first_name} ${data.last_name} | ${data.company_name} - ${data.designation}`,
              text: 'Sharing my business details with bussinesscard.com.',
              url: `${window.location.href.split("/")[0]}//${window.location.href.split("/")[2]}/card/${data._id}`
            });
          } else {
            alert('Web Share API is not supported in your browser.');
          }
        } catch (error) {
            toast.success("Something Went wrong!", {
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
      };

    return (
        <div className="card-box">
            <div className="card-box-top">
                <i><img src={`${imageUrl}/${data.profileimage}` || Profile} alt="profile"/></i>
                <div className="card-details">
                    <div className="card-link">{window.location.href.split("/")[0]}//{window.location.href.split("/")[2]}/card/{data._id}</div>
                    <div><span className="capsule">{data.isPublished ? "Published": "Draft"}</span></div>
                </div>
            </div>
            <ul>
                <li>
                    {
                        localStorage.getItem("modules") &&
                        <>
                        {
                            JSON.parse(localStorage.getItem("modules")).cardmanagementaccess.edit &&
                            <Link to={`/dashboard/editcard/${data._id}`}>
                                <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                </svg>
                                Edit
                            </Link>
                        }
                        </>
                    }
                </li>
                <li>
                    <Link to={`/card/${data._id}`}>
                        <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                        <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        View
                    </Link>
                </li>
                <li>
                {
                    localStorage.getItem("modules") &&
                    <>
                    {
                        (JSON.parse(localStorage.getItem("modules")).cardmanagementaccess.share && data.isPublished) &&
                        <button onClick={handleShare}>
                            <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                            </svg>
                            Share
                        </button>
                    }
                    </>
                }
                </li>
                <li>
                {
                    localStorage.getItem("modules") &&
                    <>
                    {
                        JSON.parse(localStorage.getItem("modules")).cardmanagementaccess.delete &&
                        <button className="bg-delete" onClick={() => handleDelete(data._id)}>
                            <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                            Delete
                        </button>
                    }
                    </>
                }
                </li>
            </ul>
        </div>
    )
}

export default CardBox;