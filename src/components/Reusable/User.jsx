import { Link } from "react-router"
import assets from "../assets"
import { useAuth } from "../../context/AuthContext"
import useMediaQuery from '@mui/material/useMediaQuery';
function User() {
    const {providerValue} = useAuth();
  const matches = useMediaQuery('(min-width: 1024px)');

    return (
        <div className="user">
            {/* <Link className="mr1" to="/"><img className="second-icon" src={assets.eng} alt="language" /></Link> */}
            {/* {providerValue.trainers.role === "trainer" ? "" : <Link to="tform" className="bg-dark login-btn mr1"><img className="mr1" src={assets.trainer} alt="account" />Treynermisiz ?</Link>} */}

            {providerValue.user ? <Link to="/profile"> {matches === false ? "" : <h4 className="mr1">{providerValue.user.name}</h4>}<img className="mr1 second-icon" src={providerValue.user.photo} alt="account" /></Link> : <Link to="login" className="login-btn"><img className="mr1" src={assets.login} alt="account" />Kirish</Link>}
        </div>
    )
}

export default User
