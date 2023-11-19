import { User } from "./user.type";

export type AuthContextType = {
    isLoggedIn: boolean | null;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
    logOut: Function;
};
