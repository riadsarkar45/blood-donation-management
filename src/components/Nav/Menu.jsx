import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from 'react-hot-toast';
import Footer from "../Pages/Footer";
const Menu = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster></Toaster>
        </div>
    );
};

export default Menu;