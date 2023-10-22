import { Link } from 'react-router-dom';
import './footer.css';

export function Footer() {
    return (
        <footer className="footer">
            <nav className="footer_navigation">
                <ul className="footer_navigation_list">
                    <li className="footer_navigation_item">
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}
