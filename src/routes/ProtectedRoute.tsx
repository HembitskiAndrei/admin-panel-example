import type { TProtectedRouteProps } from "../types";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ auth: { isAuthenticated } }: TProtectedRouteProps) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export {ProtectedRoute};