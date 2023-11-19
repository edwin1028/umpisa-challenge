import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/Auth.provider";
import { AuthContextType } from "../types/authcontext.type";

interface Props {
    children?: any;
}

export const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const authContext = useContext<AuthContextType | null>(AuthContext);
    if (!authContext?.isLoggedIn) {
        return <Navigate to={"/login"} state={{ from: location }} />;
    } else {
        return children;
    }
};
