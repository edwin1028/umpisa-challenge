import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContextType } from "../types/authcontext.type";
import { AuthContext } from "../provider/Auth.provider";

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
