import { Link } from "react-router"
import { useState } from "react"
import Title from "../components/Reusable/Title"
import Error from "../components/Reusable/Error"
import assets from "../components/assets"
import { useNavigate } from "react-router"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

function TLogin() {
    const {providerValue} = useContext(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState({phone: "", password: ""})
    const [error, setError] = useState("");

    function storeUser(e) {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function sendDetails(e) {
        try{
            e.preventDefault()

            const response = await axios.post("http://localhost:3001/tlogin", user);

            if (response.data.message) {
                providerValue.login(response.data.message);
                localStorage.setItem("status", JSON.stringify("trainer"));
                navigate("/")
            }
        }catch(err) {
            if(err.response.data.message === "not available") setError("Foydalanuvchi mavjud emas! Formani to'ldiring!")
            if(err.response.data.message === "incorrect") setError("Parolingiz noto'g'ri!")
        }
    }

    return (
        <div className="login">
            <div className="login-content">
                
                <button className="close-btn" to="/" onClick={() => navigate(-1)}><img className="close-icon" src={assets.close} alt="close" /></button>
                <Title title="Trainer" font={1.4} className={'mb2'} />

                <form className="login-form" onSubmit={sendDetails}>
                    <label htmlFor="phone">Telefon raqamingizni kiritng!</label>
                    <input type="text" placeholder="+998914014766" name="phone" value={user.phone} className="login-input" onChange={storeUser} />
                    <label htmlFor="phone">Parolingizni kiritng!</label>
                    <input type="password" placeholder="********" name="password" value={user.password} className="login-input" onChange={storeUser} />
                    <div className="checkbox-remember mb1">
                        <input type="checkbox" className="mr1" />
                        <p className="fs7">Eslab qolish!</p>
                    </div>
                    <button type="submit" className="login-form-btn mb1" onClick={sendDetails}>Tasdiqlash!</button>
                    {<Error message={error} />}
                </form>
                <div className="login-under">
                    <div className="login-links">
                        <Link to="/tform">Register yourself as a trainer</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TLogin
