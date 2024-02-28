const FormatNavContainer = (hamburgerOpen) => {
    return {
        display: 'flex', 
        justifyContent: 'start', 
        backgroundColor: '#104b0e', 
        color: 'white',
        height: '45px',
        width: hamburgerOpen ? '0' : 'auto'
    }
};

const NavLink = {
    textDecoration: 'none',
    color: 'white',
    marginTop: '6px',
    fontSize: '22px',
    padding: '0 22px'
};

const HamburgerNavLink = {
    ...NavLink,
    display: 'inline-block',
    margin: '20px',
    width: '50%'
};

const HamburgerContainter = {
    width: '2rem',
    height: '2rem',
    display: 'flex',
    justifyContent: 'space-around',
    flexFlow: 'wrap',
    zIndex: '10',
    cursor: 'pointer',
    position: 'fixed'
};

const Burger = {
    width: '2rem',
    height: '3px',
    borderRadius: '6px',
    backgroundColor: 'white',
    transformOrigin: '1px',
    transition: 'all 0.3s linear'
};

const HamburgerLinkContainer = {
    backgroundColor: '#104b0e',
    width: '50%',
    left: '0',
    position: 'fixed',
    marginTop: '-22px',
    height: '100%',
    paddingTop: '60px',
    zIndex: '9'
}

export {
    NavLink,
    HamburgerContainter,
    Burger,
    HamburgerLinkContainer,
    HamburgerNavLink,
    FormatNavContainer
};