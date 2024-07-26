import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/urls";
import $ from 'jquery';

const RequestChat = () => {
    const { id } = useParams();
    const [chats, setChats] = useState([]);
    const [req, setReq] = useState("");
    const [person, setPerson] = useState("");
    const [h, setH] = useState(0);
    const [msg, setmsg] = useState("");
    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const res = await axios.get(`${backendUrl}/request/getrequest/${id}`);
                setReq(res.data.request.request);
                setChats(res.data.request.chat);
                setPerson(res.data.person);
            } catch (error) {
                console.log(error);
            }
        }

        let pageHeight = window.innerHeight;
        let headerHeight = $("header").height() + 1;
        let extras = 32 + 32 + 24 + 15 + 84 + 10 + 10 + 10 + 35;
        let total = pageHeight - (headerHeight + extras);
        setH(total);

        fetchRequest();
    }, [id])
    const handleSendChat = async () => {
        try {
            const res = await axios.put(`${backendUrl}/request/chat/${id}`, {
                msg: msg,
                person: person
            });
            setmsg("");
            setChats(res.data.chat);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <div className="application-main-layout">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header-heading">
                                {id}
                            </div>
                        </div>
                        <div className="card-body req-body">
                            <div dangerouslySetInnerHTML={{ __html: req }}></div>
                        </div>
                        <div className="chats-wrapper" style={{ height: `${h}px` }}>
                            {chats.map((el, index) => {
                                return (
                                    el.person === person ?
                                    <div className="chat-row right" key={index}>
                                        <div className="chat-box">
                                            {el.text}
                                        </div>
                                    </div>
                                    :
                                    <div className="chat-row left" key={index}>
                                        <div className="chat-box">
                                            {el.text}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="chat-message-sender">
                            <input type="text" value={msg} placeholder="text" onChange={(e) => setmsg(e.target.value)}/>
                            <button onClick={handleSendChat}>Send <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 18-7 3 7-18 7 18-7-3Zm0 0v-5"/>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default RequestChat;