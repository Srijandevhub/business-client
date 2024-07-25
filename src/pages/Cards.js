import { Link } from "react-router-dom";
import CardBox from "../components/CardBox";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/urls";

const Cards = () => {
    const [cards, setcards] = useState([]);
    useEffect(() => { 
        const fetchData = async () => {
            try {
                const res = await axios.get(`${backendUrl}/card/getcards`);
                setcards(res.data.cards);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    if (localStorage.getItem("modules")) {
        if (!JSON.parse(localStorage.getItem("modules")).cardmanagement) {
            return <div>Access Denied</div>
        }
    }
    return (
        <Layout menuActive={"cards"}>
            <div className="application-main-layout">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header-heading">
                                My Cards
                            </div>
                            {
                                localStorage.getItem("modules") &&
                                <>
                                {
                                    JSON.parse(localStorage.getItem("modules")).cardmanagementaccess.create &&
                                    <Link to="/dashboard/newcard" className="btn btn-primary">
                                        <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                        </svg>
                                        Create Card
                                    </Link>
                                }
                                </>
                            }
                        </div>
                        {
                            cards.length !== 0 ?
                            <div className="card-body">
                                <div className="row">
                                    {
                                        cards.map((el, index) => {
                                            return (
                                                <div className="col-4" key={index}>
                                                    <CardBox data={el}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            : <div className="card-header-heading card-heading-no-record">No Records Found...</div>
                        }
                    </div>
                </div>
            </div>  
        </Layout>
    )
}

export default Cards;