import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import assets from "../assets";
import { useAuth } from "../../context/AuthContext";
import useMediaQuery from '@mui/material/useMediaQuery';

function Sidebar() {
  const navigate = useNavigate();
  const { providerValue } = useAuth();
  const [status, setStatus] = useState("");
  const matches = useMediaQuery('(max-width:1024px)');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem("status"));
    setStatus(role);
  }, []);

  function exitUser() {
    localStorage.clear();
    window.location.href = "/";
  }

  const user = providerValue.user;

  return (
    <>
      {matches ? (
        open ? (
          // Sidebar for small screens (open state)
          <nav className="navbar">
            <div className="sidebar-menu">
              <Link to="/">
                <img className="logo" src={assets.logo} alt="logo" />
              </Link>

              <ul>
                <li>
                  <NavLink to="/">
                    <img className="icon" src={assets.home} alt="icon" /> Bosh
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/trainer">
                    <img className="icon" src={assets.train} alt="icon" /> Trenerlar
                  </NavLink>
                </li>
                {providerValue.user ? (
                  <li>
                    <NavLink to="/community">
                      <img className="icon" src={assets.community} alt="icon" /> Community
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink to="/login">
                      <img className="icon" src={assets.community} alt="icon" /> Community
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/food">
                    <img className="icon" src={assets.food} alt="icon" /> Sog'lom ovqatlanish
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/exercise">
                    <img className="icon" src={assets.exercise} alt="icon" /> Exercises
                  </NavLink>
                </li>

                {providerValue.user?.userid && (
                  <li>
                    <NavLink to={status === "trainer" ? `/tuser` : `/profile`}>
                      <img className="icon" src={assets.profil} alt="icon" /> Profile
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            {user && (
              <button className="btn-logout" onClick={exitUser}>
                <img className="icon" src={assets.exit} alt="exit" /> Logout
              </button>
            )}

            {/* Close Button inside Sidebar */}
            {open ? <button className="close-btn" onClick={() => setOpen(false)}>X</button> : ""}
          </nav>
        ) : (
          // Menu Button when Sidebar is closed
          <button className="menu-button" onClick={() => setOpen(true)}>
            <img src={assets.menuIcon} alt="Menu" className="menu-icon icon" />
          </button>
        )
      ) : (
        // Sidebar for larger screens
        <nav className="navbar">
          <div className="sidebar-menu">
            <Link to="/">
              <img className="logo" src={assets.logo} alt="logo" />
            </Link>

            <ul>
              <li>
                <NavLink to="/">
                  <img className="icon" src={assets.home} alt="icon" /> Bosh
                </NavLink>
              </li>
              <li>
                <NavLink to="/trainer">
                  <img className="icon" src={assets.train} alt="icon" /> Trenerlar
                </NavLink>
              </li>
              {providerValue.user ? (
                <li>
                  <NavLink to="/community">
                    <img className="icon" src={assets.community} alt="icon" /> Community
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/login">
                    <img className="icon" src={assets.community} alt="icon" /> Community
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/food">
                  <img className="icon" src={assets.food} alt="icon" /> Sog'lom ovqatlanish
                </NavLink>
              </li>
              <li>
                <NavLink to="/exercise">
                  <img className="icon" src={assets.exercise} alt="icon" /> Exercises
                </NavLink>
              </li>

              {providerValue.user?.userid && (
                <li>
                  <NavLink to={status === "trainer" ? `/tuser` : `/profile`}>
                    <img className="icon" src={assets.profil} alt="icon" /> Profil
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {user && (
            <button className="btn-logout" onClick={exitUser}>
              <img className="icon" src={assets.exit} alt="exit" /> Chiqish
            </button>
          )}
        </nav>
      )}
    </>
  );
}

export default Sidebar;
