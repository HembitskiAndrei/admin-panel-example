import { Outlet, Navigate } from "react-router-dom";

interface IProtectedRouteProps {
    auth: {
        isAuthenticated: boolean
    };    
}

const ProtectedRoute = ({ auth: { isAuthenticated } }: IProtectedRouteProps) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export {ProtectedRoute};