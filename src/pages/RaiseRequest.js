import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import TinyMCEEditor from "../components/TinyMCEEditor";
import axios from "axios";
import { backendUrl } from "../utils/urls";
import { Flip, toast } from "react-toastify";
import { Link } from "react-router-dom";

const RaiseRequest = () => {
    const [request, setRequest] = useState("");
    const [reqs, setReqs] = useState([]);
    const handleRequestChange = (content) => {
        setRequest(content);
    }

    const handleRaiseRequest = async () => {
        try {
            const res = await axios.post(`${backendUrl}/request/saverequest`, {
                request: request
            });
            if (res.status === 200) {
                toast.success(`${res.data.message}, your ticket id is: ${res.data.request._id}. Click here to copy the ticket id`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                    onClick: () => copyClipboard(res.data.request._id),
                    onClose: () => window.location.reload()
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    function copyClipboard(content) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(content);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${backendUrl}/request/getrequests`);
                setReqs(res.data.requests);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])
    return (
        <Layout>
            <div className="application-main-layout">
                <div className="container-fluid">
                    <div className="card mb-20px">
                        <div className="card-header">
                            <div className="card-header-heading">
                                Raise A Request
                            </div>
                        </div>
                        <div className="card-body">
                            <p>Write your request in details</p>
                            <div className="mb-20px">
                                <TinyMCEEditor onChange={handleRequestChange}/>
                            </div>
                            <div className="d-flex justify-end">
                                <button className="btn btn-primary" onClick={handleRaiseRequest}>
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z"/>
                                    </svg>
                                    Raise
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        reqs.length !== 0 &&
                        <>
                        <div className="card-header-heading">
                            Pending Requests
                        </div>
                        {
                            reqs.map((el, index) => {
                                return (
                                    <div className="request-box" key={index}>
                                        <div className="request-id">{el._id}</div>
                                        <Link to={`/dashboard/requestchat/${el._id}`} className="btn btn-primary">GO TO</Link>
                                    </div>
                                )
                            })
                        }
                        </>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default RaiseRequest;