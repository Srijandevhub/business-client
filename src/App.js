import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cards from "./pages/Cards";
import CreateCard from "./pages/CreateCard";
import ProtectedRoute from "./components/ProtectedRoute";
import DynamicCard from "./pages/DynamicCard";
import EditCard from "./pages/EditCard";
import Users from "./pages/Users";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import RaiseRequest from "./pages/RaiseRequest";
import RequestChat from "./components/RequestChat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Application */}
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/dashboard/cards" element={<ProtectedRoute><Cards /></ProtectedRoute>}/>
        <Route path="/dashboard/newcard" element={<ProtectedRoute><CreateCard /></ProtectedRoute>}/>
        <Route path="/dashboard/editcard/:id" element={<ProtectedRoute><EditCard /></ProtectedRoute>}/>
        <Route path="/dashboard/users" element={<ProtectedRoute><Users /></ProtectedRoute>}/>
        <Route path="/dashboard/newuser" element={<ProtectedRoute><CreateUser /></ProtectedRoute>}/>
        <Route path="/dashboard/edituser/:id" element={<ProtectedRoute><EditUser /></ProtectedRoute>}/>
        <Route path="/dashboard/userprofile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
        <Route path="/dashboard/raiserequest" element={<ProtectedRoute><RaiseRequest /></ProtectedRoute>}/>
        <Route path="/dashboard/requestchat/:id" element={<ProtectedRoute><RequestChat /></ProtectedRoute>}/>
        <Route path="/card/:id" element={<DynamicCard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;