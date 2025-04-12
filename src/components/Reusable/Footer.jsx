import assets from "../assets";
import { Link } from "react-router"
import { useMediaQuery } from "@mui/system";

export default function Footer() {
    const date = new Date().getFullYear();
    const matches = useMediaQuery('(max-width:1024px)');

    return (
        <>
        {matches ? <footer className="footer">
                <div className="footer-head">
                    <img src={assets.logo} alt="logo" className="logo" />
                </div>
                <div className="footer-content">
                    <p className="mr2">+998 (91) 401 47 66</p>
                    <Link to="https//instagram.com">
                        <img src={assets.instagram} alt="instagram" className="icon" />
                    </Link>
                    <Link to="https//telegram.com">
                        <img src={assets.telegram} alt="telegram" className="icon" />
                    </Link>
                </div>
            </footer> : <footer className="footer">
                <div className="footer-head">
                    <img src={assets.logo} alt="logo" className="logo" />
                    <p className="fs8">Copyright &copy; Smart Fit {date}. All rights reserved</p>
                </div>
                <div className="footer-content">
                    <img src={assets.call} alt="call" className="icon" />
                    <p className="mr2">+998 (91) 401 47 66</p>
                    <Link to="https//instagram.com">
                        <img src={assets.instagram} alt="instagram" className="icon" />
                    </Link>
                    <Link to="https//telegram.com">
                        <img src={assets.telegram} alt="telegram" className="icon" />
                    </Link>
                </div>
            </footer>}
        </>
    )
}
