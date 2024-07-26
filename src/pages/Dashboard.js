import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import axios from "axios";
import { backendUrl } from "../utils/urls";

const Dashboard = () => {
    const [cards, setCards] = useState("0");
    const [users, setUsers] = useState("0");

    useEffect(() => {
        const fetchPaneCounts = async () => {
            try {
                const res = await axios.get(`${backendUrl}/dashboard/panecounts`);
                setCards(res.data.cards);
                setUsers(res.data.users);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPaneCounts();
    }, [])

    return (
        <Layout menuActive={"dashboard"}>
            <div className="application-main-layout">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header-heading">
                                Dashboard
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="top-pane">
                                {
                                    localStorage.getItem("modules") &&
                                    <>
                                    {
                                        JSON.parse(localStorage.getItem("modules")).cardmanagement &&
                                        <div className="pane-col">
                                            <div className="pane-box">
                                                <div className="pane-heading">Cards</div>
                                                <div className="pane-count">{cards}</div>
                                            </div>
                                        </div>
                                    }
                                    </>
                                }
                                {
                                    localStorage.getItem("modules") &&
                                    <>
                                    {
                                        JSON.parse(localStorage.getItem("modules")).usermanagement &&
                                        <div className="pane-col">
                                            <div className="pane-box">
                                                <div className="pane-heading">Users</div>
                                                <div className="pane-count">{users}</div>
                                            </div>
                                        </div>
                                    }
                                    </>
                                }
                                <div className="pane-col"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;