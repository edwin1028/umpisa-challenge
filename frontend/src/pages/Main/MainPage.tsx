import { Outlet } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <h3>This is the Main page!</h3>
            <Outlet />
        </div>
    );
};

export default MainPage;
