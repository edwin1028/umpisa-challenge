import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGet } from "../services/axios.service";
import { AuthContextType } from "../types/authcontext.type";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const checkIfLoggedIn = async () => {
        const { data: response } = await httpGet(`/user/login`);
        const [status, message, data] = response;
        if (data) {
            setIsLoggedIn(true);
            navigate("/dashboard");
        } else {
            setIsLoggedIn(false);
        }
    };

    const logOut = async () => {
        await httpGet(`/user/logout`);
        setIsLoggedIn(false);
        navigate("/login");
    };

    useEffect(() => {
        checkIfLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
