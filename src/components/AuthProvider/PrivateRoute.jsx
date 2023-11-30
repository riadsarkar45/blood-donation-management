import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { isLoading, user } = useContext(AuthContext);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <img
                    src="https://i.ibb.co/kqB1PZ5/23358104-2464-removebg-preview.png"
                    alt=""
                />
            </div>
        );
    }


    if (user) {
        return children;
    }

    return <Navigate to="/signin"></Navigate>
};

export default PrivateRoute;