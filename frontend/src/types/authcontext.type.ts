import { ToastProps } from "./toast.type";
import { User } from "./user.type";

export type AuthContextType = {
    isLoggedIn: boolean | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
    logOut: Function;
    handleOpenToast: Function;
    handleCloseToast: Function;
    changeThemeMode: Function;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
};
