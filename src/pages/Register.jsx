import { Link } from "react-router"
import { useState } from "react"
import Title from "../components/Reusable/Title"
import Error from "../components/Reusable/Error"
import assets from "../components/assets"
import { useNavigate } from "react-router"
import axios from "axios"

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({phone: "", password: ""})
    const [error, setError] = useState("");


    function storeUser(e) {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function sendDetails(e) {
        try{
            e.preventDefault();
            await axios.post("http://localhost:3001/register", user)  
                .then(res => {
                    res.data.message === 'success' && navigate("/login")
                })
        }catch(err) {
            if(err.response.data.message === "available") setError("Bu foydalanuvchi mavjud! Iltimos, boshqa raqam kiriting!")
        }
    }

    return (
        <div className="login">
            <div className="login-content">
                
                <button className="close-btn" to="/" onClick={() => navigate(-1)}><img className="close-icon" src={assets.close} alt="close" /></button>
                <Title title="Registratsiya" font={1.4} className={'mb2'} />

                <form className="login-form">
                    <label htmlFor="phone">Telefon raqamingizni kiritng!</label>
                    <input type="text" placeholder="+998914014766" name="phone" className="login-input" value={user.phone} onChange={storeUser} />
                    <label htmlFor="phone">Parolingizni kiritng!</label>
                    <input type="password" placeholder="********" name="password" className="login-input" value={user.password} onChange={storeUser} />
                    <div className="checkbox-remember mb1">
                        <input type="checkbox" className="mr1" />
                        <p className="fs7">Eslab qolish!</p>
                    </div>
                    <button type="submit" className="login-form-btn mb1" onClick={sendDetails}>Tasdiqlash!</button>
                    {<Error message={error} />}
                </form>
                <div className="login-under">
                    <div className="login-links">
                        <Link to="/login">Kirish</Link>
                        <Link to="/tlogin">Treyner</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register