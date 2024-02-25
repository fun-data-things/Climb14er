import { Link } from 'react-router-dom';
import { NavContainer, NavLink } from './style';

const Navigation = () => {
    return (
        <div style={NavContainer}>
            <Link to="/" style={NavLink}>Climb14er</Link>
            <Link to="/plan" style={NavLink}>Plan</Link>
            <Link to="/explore" style={NavLink}>Explore</Link>
            <Link to="https://evidence-ov7neagfqq-uw.a.run.app" target="_blank" style={NavLink}>Analytics</Link>
        </div>
    )
};

export default Navigation;