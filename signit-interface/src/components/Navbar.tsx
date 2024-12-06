import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/logo/logo-main.png'; // Import du logo
import { useTheme } from '../ThemeContext';

export const Navbar = () => {

    const location = useLocation();

    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <section id="navbar">
            <div className="flex">
                <Link to="/" title="SignIt - Traduction">
                    <img src={logo} alt="Logo - SignIT" id="logo-main" />
                </Link>
            </div>
            <div className="flex margin-right">
                <Link
                    to="/"
                    title="SignIt - Traduction"
                    className={!location.pathname.startsWith('/dictionary') ? 'nav-link-selected' : 'nav-link'}
                >
                    Traduction
                </Link>
                <Link
                    to="/dictionary"
                    title="SignIt - Dictionnaire"
                    className={location.pathname.startsWith('/dictionary') ? 'nav-link-selected' : 'nav-link'}
                >
                    Dictionnaire
                </Link>
                <span className='nav-link' onClick={() => toggleTheme()}>
                    {!isDarkMode ? "Mode sombre" : "Mode clair"}
                </span>
            </div>
        </section>
    );
};

export default Navbar;