/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { NEW_LOGO_1 } from "../utils/constant";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const onlineStatus = useOnline();
    const [showNavItems, setShowNavItems] = useState(false);


    const { logggedInUser } = useContext(UserContext)

    const cartItems = useSelector((store) => store.cart.items);

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const toggleNavItems = () => {
        setShowNavItems(!showNavItems);
      };

    return (
        <div className='header'>
            <div className='logo-container'>
                <img className='logo' src={NEW_LOGO_1} alt="logo" />
            </div>
            <div className='nav-items'>
                <div className="menu-icon" onClick={toggleNavItems}>
                    <span>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                </div>
                <ul className={`nav-list ${showNavItems ? "show" : ""}`}>
                    <li>
                        <Link to="/" className="dropdown-item">
                            <span style={{ padding: "7px" }}>
                                <i className="fa-solid fa-house"></i>
                            </span>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="dropdown-item">
                            <span style={{ padding: "7px" }}>
                                <i className="fa-brands fa-react"></i>
                            </span>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="dropdown-item h-cart">
                            <span style={{ padding: "7px" }}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </span>{" "}
                            Cart<p>{totalQuantity}</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="dropdown-item">
                            <span style={{ padding: "7px" }}>
                                <i className="fa-solid fa-address-book"></i>
                            </span>
                            contact
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/grocery" className="dropdown-item">
                            <span style={{ padding: "7px" }}>
                                <i className="fa-solid fa-address-book"></i>
                            </span>
                            Grocery
                        </Link>
                    </li> */}
                </ul>
            </div>
            <div className="logout-container" onClick={() => {
                btnName === "Login" ? (setBtnName("Logout"), toast.success("User Logged In")) : (setBtnName("Login"), toast.success("User Logged Out"));
            }}>
                <div className="h-online">
                    Online: {onlineStatus ? "🟢" : "🔴"}
                </div>
                <a href="https://github.com/nerdsuraj/master-food" className="dropdown-item">
                    <span style={{ padding: "7px" }}>
                        <i className="fa-solid fa-user"></i>
                    </span>{btnName}
                </a>

            </div>
        </div>
    )
}


export default Header;