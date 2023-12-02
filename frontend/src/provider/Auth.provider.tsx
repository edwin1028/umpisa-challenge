import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpGet } from "../services/axios.service";
import { AuthContextType } from "../types/authcontext.type";
import Toast from "../component/Toast/Toast";
import { ToastProps } from "../types/toast.type";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
    const [themeMode, setThemeMode] = useState<any>("light");
    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: themeMode,
            },
        });
    }, [themeMode]);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [toastConfig, setToastConfig] = useState<ToastProps>(
        {} as ToastProps
    );
    const navigate = useNavigate();

    const handleCloseToast = () => {
        setToastConfig((prevState) => ({ ...prevState, open: false }));
    };

    const handleOpenToast = (newProps: ToastProps) => {
        setToastConfig((prevState) => ({ ...prevState, ...newProps }));
    };

    const checkIfLoggedIn = async () => {
        try {
            const { data: response } = await httpGet(`/user/login`);
            const [status, message, data] = response;
            if (data) {
                setIsLoggedIn(true);
                navigate("/dashboard");
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
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

        const storedThemeMode = localStorage.getItem("themeMode");
        localStorage.setItem("themeMode", storedThemeMode || "light");
        setThemeMode(storedThemeMode);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                logOut,
                handleOpenToast,
                handleCloseToast,
                setThemeMode,
            }}
        >
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}

                <Toast
                    open={toastConfig.open}
                    handleClose={toastConfig.handleClose}
                    message={toastConfig.message}
                    position={
                        toastConfig.position
                            ? toastConfig.position
                            : {
                                  vertical: "top",
                                  horizontal: "right",
                              }
                    }
                    action={toastConfig.action}
                    autoHideDuration={toastConfig.autoHideDuration || 6000}
                    severity={toastConfig.severity}
                />
            </ThemeProvider>
        </AuthContext.Provider>
    );
};
