import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo/logo.png'; // Import the logo

/**
 * Navbar component - Main navigation bar for the application
 * Handles navigation between different sections of the app
 */
export const Navbar = () => {

    const location = useLocation();
    // Track the previous path to detect navigation changes
    const [previousPath, setPreviousPath] = useState(location.pathname);

    // Effect to reload the page when navigation occurs
    // This ensures components are properly re-rendered when switching routes
    useEffect(() => {
        if (location.pathname !== previousPath) {
            window.location.reload();
            setPreviousPath(location.pathname);
        }
    }, [location.pathname, previousPath]);

    return (
        <section id="navbar">
            {/* Logo section with link to home page */}
            <div className="flex">
                <Link to="/" title="SignIt - Traduction">
                    <img src={logo} alt="Logo - SignIT" id="logo-main" />
                </Link>
            </div>
            {/* Navigation links section */}
            <div className="flex margin-right">
                <Link
                    to="/"
                    title="SignIt - Traduction"
                    className={!location.pathname.startsWith('/dictionary') ? 'nav-link-selected' : 'nav-link'}
                >
                    Traduction
                </Link>
            </div>
        </section>
    );
};

export default Navbar;