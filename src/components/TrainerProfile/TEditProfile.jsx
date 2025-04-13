import { useParams, Link } from "react-router"
import { useEffect, useState, useRef } from "react";
import assets from "../assets";
import User from "../Reusable/User"; 
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function TEditProfile() {
    const [showUsername, setShowUsername] = useState(true);
    const [trainer, setTrainer] = useState({});
    const inputRef = useRef(null)

    const {providerValue} = useAuth();
    console.log(trainer)

    useEffect(() => {
        if(!providerValue?.user) return

        async function getUser() {
            try {
                await axios.post("https://smartfitbackend.onrender.com/tuser", { user: providerValue.user })
                    .then(res => setTrainer(res.data[0]  || {}))
            } catch (error) {
                console.error("Error fetching user details:", error);
                setTrainer({})
            }
        }
    
        getUser();
    }, [providerValue.user]);

    function handleShowUser() {
        setShowUsername((current) => !current)
        if(showUsername === false) {
            window.location.reload()
        }
        console.log(trainer)
        // if(showUsername === false) inputRef.current.focus()
        console.log(inputRef.current)
    }

    async function editUserInfo() {
        try {
            setShowUsername(true)

            await axios.post("https://smartfitbackend.onrender.com/editTrainer", {...trainer, user: providerValue.user})
                .then(res => console.log(res))
            
        }catch(err) {
            console.log(err)
        }
    }

    
    function handleEditInfo(e) {
        const {name, value} = e.target;

        setTrainer((current) => {
            return {...current, [name]: value}
        })

    }
    

    return (
        <div className="t-profile container">
             <div className="account-container">
                <div></div>
                <User />
            </div>
            <div className="trainer">
                <div className="trainer-head mb2">
                    <img src={trainer.image ? trainer.image : assets.profile} alt="image" className="t-image mr2" />
                    {showUsername ? <>
                        <h3 className="trainer-name">{trainer.name}</h3>
                        {/* <img src={assets.handMuscle} alt="trainer" className="icon mr2" /> */}
                        <button onClick={handleShowUser}>
                            <img src={assets.pencil} alt="icon" className="icon mr1" />
                        </button>
                    </> 
                    : <>
                        <input type='text' className='username-input mr1' ref={inputRef} value={trainer.name} name='name' onChange={(e) => handleEditInfo(e)} />
                        <button onClick={handleShowUser}>
                            <img src={assets.ignore} alt="icon" className="icon mr1" />
                        </button>
                    </>}
                    <img src={assets.trainer} alt="trainer" className="icon mr2" />
                    <p>4.7</p>
                    <img className="icon mr2" src={assets.star} alt="rate" />
                </div>

                <div className="trainer-social mb2">
                    {trainer.instagram ? <Link to={trainer.instagram} className="mr1"><img src={assets.instagram} alt="instagram" className="second-icon" /></Link> : ""}
                    {trainer.telegram ? <Link to={trainer.telegram} ><img src={assets.telegram} alt="telegram" className="second-icon" /></Link> : ""}
                </div>

                <div className="mb2">
                    <h4 className="mb1">Bio:</h4>
                    <textarea id="bio" cols="70" rows="5" className="bio mr1" placeholder={trainer.bio} disabled={showUsername} name='bio' onChange={(e) => handleEditInfo(e)} ></textarea>
                    <button onClick={handleShowUser}>
                        <img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" />
                    </button>     
                </div>

                <div className="user-social mb2">
                    <div className="user-social-content mb1">
                        <img src={assets.instagram} alt="instagram" className="icon mr1" />
                        <input type="text" placeholder={trainer.instagram} className="mr1" disabled={showUsername} name='instagram' onChange={(e) => handleEditInfo(e)} />
                        <button onClick={handleShowUser}>
                            <img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" />
                        </button> 
                    </div>
                    <div className="user-social-content mb1">
                        <img src={assets.telegram} alt="instagram" className="icon mr1" />
                        <input type="text" placeholder={trainer.telegram} className="mr1" disabled={showUsername} name='telegram' onChange={(e) => handleEditInfo(e)} />
                        <button onClick={handleShowUser}>
                            <img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" />
                        </button> 
                        
                    </div>
                </div>

                {
                  showUsername ? <div className="trainer-details mb1">
                    <div><img src={assets.muscle} alt="icon" className="icon" /><p className="mr1"> <b> O'quvchilar soni: </b> {trainer.students}</p>  <button onClick={handleShowUser}><img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" /></button></div>
                    <div><img src={assets.experience} alt="icon" className="icon" /><p className="mr1"> <b> Tajribasi: </b> {Math.floor(trainer.experience)} yil</p> <button onClick={handleShowUser}><img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" /></button> </div>
                    <div><img src={assets.age} alt="icon" className="icon" /><p className="mr1"> <b> Yoshi: </b> {trainer.age} yosh</p> <button onClick={handleShowUser}><img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" /></button> </div>
                    <div><img src={assets.gender} alt="icon" className="icon" /><p className="mr1"> <b> Jinsi: </b> {trainer.gender}</p></div>
                  </div>

                : <div className="trainer-details mb1">
                    <div><img src={assets.muscle} alt="icon" className="icon" /><p className="mr1"> <b> O'quvchilar soni: </b> </p> <input type="number" onChange={(e) => handleEditInfo(e)} name="students" placeholder={trainer.students} />  <button onClick={handleShowUser}><img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" /></button></div>
                    <div><img src={assets.experience} alt="icon" className="icon" /><p className="mr1"> <b> Tajribasi: </b></p><input type="number" onChange={(e) => handleEditInfo(e)} name="experience" placeholder={Math.floor(trainer.experience)} /> <button onClick={handleShowUser}><img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" /></button> </div>
                    <div><img src={assets.age} alt="icon" className="icon" /><p className="mr1"> <b> Yoshi: </b></p> <input type="number" onChange={(e) => handleEditInfo(e)} name="age" placeholder={trainer.age} /> <button onClick={handleShowUser}><img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" /></button> </div>
                    <div><img src={assets.gender} alt="icon" className="icon" /><p className="mr1"> <b> Jinsi: </b> {trainer.gender}</p></div>
                </div>
                    
                }

                <div className="apply">
                    {!showUsername && <button className="t-btn" onClick={editUserInfo}>Saqlash</button>}
                </div>
            </div>
        </div>
    )
}

export default TEditProfile
