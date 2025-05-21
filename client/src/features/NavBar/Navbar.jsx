import "./navbar.css"; // Assuming you have a CSS file for styling
import logo from "./../../assets/logo.svg"; // Replace with your logo path
import {Navitem} from "./NavItem";
import classNames from "classnames";
import {useSelector} from "react-redux";

const NavBar = () => {
    const days = useSelector((state) => state.app.days);
    const currentDay = useSelector((state) => state.app.currentDay);
    return (
        <nav className="px-4 py-2 flex gap-10 content-center justify-center items-center ">
            <div className="flex items-center gap-3 text-[#84cc16]">
                <img src={logo} alt="Logo" className="navbar__logo-image"/>
                <h1>TIKERA</h1>
            </div>
            <ul className="navbar__links">
                {days.map((day, index) => {
                    const actualClassNames = classNames({
                        leftlink: index === 0,
                        rightlink: index === 6,
                        active: currentDay === index + 1,
                    });

                    return (
                        <Navitem
                            key={index}
                            classNames={actualClassNames}
                            day={day}
                            index={index}
                        />
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavBar;
