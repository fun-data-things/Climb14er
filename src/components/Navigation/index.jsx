import { useState } from 'react';
import { Link } from 'react-router-dom';
import HamburgerNav from './HamburgerNav';
import * as S from './style';

const Navigation = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen((prevState) => !prevState);
    };

    return (
        <>
            <div style={S.FormatNavContainer(hamburgerOpen)}>
                <div className='navigation'>
                    <Link to="/" style={S.NavLink}>Climb14er</Link>
                    <Link to="/plan" style={S.NavLink}>Plan</Link>
                    <Link to="/explore" style={S.NavLink}>Explore</Link>
                    <Link to="https://evidence-ov7neagfqq-uw.a.run.app" target="_blank" style={S.NavLink}>Analytics</Link>
                </div>
                <HamburgerNav hamburgerOpen={hamburgerOpen} onClick={toggleHamburger}> 
                    <div style={S.HamburgerLinkContainer}>
                        <Link to="/" style={S.HamburgerNavLink} onClick={toggleHamburger}>Climb14er</Link>
                        <Link to="/plan" style={S.HamburgerNavLink} onClick={toggleHamburger}>Plan</Link>
                        <Link to="/explore" style={S.HamburgerNavLink} onClick={toggleHamburger}>Explore</Link>
                        <Link to="https://evidence-ov7neagfqq-uw.a.run.app" target="_blank" style={S.HamburgerNavLink} onClick={toggleHamburger}>Analytics</Link>
                    </div>
                </HamburgerNav>
            </div>
        </>
    )
};

export default Navigation;