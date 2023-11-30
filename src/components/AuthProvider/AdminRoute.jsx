import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    if(loading || isAdminLoading){
        return <p>Loading...</p>
    }
    if(user && isAdmin){
        return children
    }
    <Navigate to="/signin"></Navigate>
    return (
        <div>

        </div>
    );
};

export default AdminRoute;