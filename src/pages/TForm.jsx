import { useState } from "react";
import Title from "../components/Reusable/Title";
import assets from "../components/assets";
import { useNavigate } from "react-router";
import axios from "axios";

const TForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        age: "",
        experience: "",
        studentNumbers: "",
        gender: "",
        uzbek: false,
        russian: false,
        directions: [],
    });
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const directionsOptions = [
        "lose weight",
        "muscle gain",
        "flexibility",
        "general fitness",
        "rehabilitation"
    ];
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleDirectionsChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            if (checked) {
                return { ...prev, directions: [...prev.directions, value] };
            } else {
                return { ...prev, directions: prev.directions.filter((dir) => dir !== value) };
            }
        });
    };

    async function sendTDetails(e) {
        try{
            e.preventDefault()
            await axios.post("http://localhost:3001/tform", formData)  
                .then(res => setError(res.data.message))
                .then(setFormData({name: "", phone: "", password: "", age: "", experience: "", studentNumbers: "", gender: "", uzbek: false, russian: false}))
                .then(error === 'success' && navigate("/"))
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="tform form-container">
            <button className="close-btn" to="/" onClick={() => navigate(-1)}><img className="close-icon" src={assets.close} alt="close" /></button>
            <Title title="Trainer" font={1.4} className={'mb2'} />
            <form onSubmit={sendTDetails}>
                <label>
                    To'liq ismingiz:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                </label>

                <label>
                    Telefon raqamingiz:
                    <input type="number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+99891404766" />
                </label>

                <label>
                    Parol qo'ying:
                    <input type="text" name="password" value={formData.password} onChange={handleChange} required placeholder="*******" />
                </label>

                <label>
                    Yoshingiz:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="41" />
                </label>

                <label>
                    Tajribangiz (yil):
                    <input type="number" name="experience" value={formData.experience} onChange={handleChange} required placeholder="3" />
                </label>

                <label>
                    O'quchilaringiz soni:
                    <input type="number" name="studentNumbers" value={formData.studentNumbers} onChange={handleChange} required placeholder="25" />
                </label>

                <label>
                    <b> Jinsingiz: </b>
                    <div className="gender">
                        <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Erkak
                        <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Ayol
                    </div>
                </label>

                <label>
                    <b> Qaysi tillarni bilasiz? </b>
                    <div className="gender">
                        <input type="checkbox" name="uzbek" checked={formData.uzbek} onChange={handleChange} /> O'zbek
                        <input type="checkbox" name="russian" checked={formData.russian} onChange={handleChange} /> Rus
                    </div>
                </label>

                <label>
                    <b>Yo'nalishlaringiz (bir nechta tanlashingiz mumkin):</b>
                    <div className="gender">
                        {directionsOptions.map((goal, idx) => (
                            <label key={idx} style={{ marginRight: "1rem" }}>
                                <input
                                    type="checkbox"
                                    name="directions"
                                    value={goal}
                                    checked={formData.directions.includes(goal)}
                                    onChange={handleDirectionsChange}
                                />{" "}
                                {goal}
                            </label>
                        ))}
                    </div>
                </label>

                <p className="error fs8 mb1">{error === 'failed' && "Bu raqam oldin ro'yxatdan o'tgan!"}</p>

                <button type="submit" onClick={() => navigate('/')}>Yuborish</button>
            </form>
        </div>
    );
};

export default TForm;
