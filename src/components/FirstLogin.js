import axios from "axios";
import { useState } from "react"
import { backendUrl } from "../utils/urls";
import { Flip, toast } from "react-toastify";

const FirstLogin = () => {
    const [current, setCurrent] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleFirstLogin = async () => {
        try {
            
            let valid = true;

            if (current === newPassword) {
                toast.warning("Passwords cannot be same", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Flip
                })
            }

            if (valid) {

                const res = await axios.put(`${backendUrl}/user/firstlogin`, {
                    currPassword: current,
                    newPassword: newPassword
                });
                if (res.status === 200) {
                    toast.success(res.data.message, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        transition: Flip,
                        onClose : () => window.location.reload()
                    })
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="first-login-wrapper">
            <div className="first-login-box">
                <div className="signup-form-wrapper mb-20px">
                    <label htmlFor="currpass" className="signup-label form-label">Current Password</label>
                    <input type="password" id="currpass" value={current} className="signup-input" onChange={(e) => setCurrent(e.target.value)}/>
                </div>
                <div className="signup-form-wrapper">
                    <label htmlFor="newpass" className="signup-label form-label">New Password</label>
                    <input type="password" id="newpass" value={newPassword} className="signup-input" onChange={(e) => setNewPassword(e.target.value)}/>
                </div>
                <div className="signup-submit">
                    <button onClick={handleFirstLogin}>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default FirstLogin;