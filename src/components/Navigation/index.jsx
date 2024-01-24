import { Link } from 'react-router-dom';
import { NavContainer, NavLink } from './style';

const Navigation = () => {
    return (
        <div style={NavContainer}>
            <Link to="/" style={NavLink}>Climb14er</Link>
            <Link to="/plan" style={NavLink}>Plan</Link>
            <Link to="/explore" style={NavLink}>Explore</Link>
        </div>
    )
};

export default Navigation;