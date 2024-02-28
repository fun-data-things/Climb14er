import * as S from './style';

const HamburgerNav = ({ hamburgerOpen, onClick, children }) => {
    return (
        <>
            <div className="hamburger" style={S.HamburgerContainter} onClick={onClick}>
                <div className="burger burger1" style={S.Burger} />
                <div className="burger burger2" style={S.Burger} />
                <div className="burger burger3" style={S.Burger} />
            </div>

            {hamburgerOpen && (
                <div>
                    {children}
                </div>
            )}

            <style jsx>{`
                .burger1 {
                    transform: ${hamburgerOpen ? 'rotate(45deg)' : 'rotate(0)'};
                }
                .burger2 {
                    transform: ${hamburgerOpen ? 'translateX(100%)' : 'translateX(0)'};
                    opacity: ${hamburgerOpen ? 0 : 1};
                }
                .burger3 {
                    transform: ${hamburgerOpen ? 'rotate(-45deg)' : 'rotate(0)'}
                }
            `}</style>
        </>
    )
};

export default HamburgerNav;
