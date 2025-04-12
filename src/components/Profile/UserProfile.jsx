import { useParams, Link } from "react-router"
import { useEffect, useState, useRef } from "react";
import assets from "../assets";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function UserProfile() {
    const [showUsername, setShowUsername] = useState(true);
    const [userDetails, setUserDetails] = useState({});
    const inputRef = useRef(null)

    const {providerValue} = useAuth();

    useEffect(() => {
        async function getUser() {
            try {
                await axios.post("http://localhost:3001/user", { user: providerValue.user })
                    .then(res => setUserDetails(res.data[0]  || {}))
            } catch (error) {
                console.error("Error fetching user details:", error);
                setUserDetails({})
            }
        }
    
        getUser();
    }, []);

    async function editUserInfo() {
        try {
            setShowUsername(true)

            await axios.post("http://localhost:3001/edituser", {...userDetails, user: providerValue.user})
                .then(res => console.log(res))
            
        }catch(err) {
            console.log(err)
        }
    }

    function handleEditInfo(e) {
        const {name, value} = e.target;

        setUserDetails((current) => {
            return {...current, [name]: value}
        })

    }

    

    // useEffect(() => {
    //     if(!showUsername && inputRef.current) {
    //         inputRef.current.focus();
    //     }
    // }, [showUsername])


    function handleShowUser() {
        setShowUsername((current) => !current)

        if(showUsername === false) {
            window.location.reload()
        }
        // if(showUsername === false) inputRef.current.focus()
        console.log(inputRef.current)
    }
    
    return (
        <div className="t-profile container">
            <div className="trainer">
                <div className="trainer-head mb2">
                    <img src={assets.profile} alt="image" className="t-image mr2" />

                    {showUsername ? <>
                        <h3 className="trainer-name">{userDetails.name}</h3>
                        <img src={assets.handMuscle} alt="trainer" className="icon mr2" />
                        <button onClick={handleShowUser}>
                            <img src={assets.pencil} alt="icon" className="icon" />
                        </button>
                        </> 
                        : <>
                            <input type='text' className='username-input mr1' ref={inputRef} value={userDetails.name} name='name' onChange={(e) => handleEditInfo(e)} />
                            <button onClick={handleShowUser}>
                                <img src={assets.ignore} alt="icon" className="icon" />
                            </button>
                        </>}

                </div>

                {/* <div className="trainer-social mb2">
                    {trainer.instagram ? <Link to="https//instagram.com" className="mr1"><img src={assets.instagram} alt="instagram" className="second-icon" /></Link> : ""}
                    {trainer.telegram ? <Link to="https//telegram.com"><img src={assets.telegram} alt="telegram" className="second-icon" /></Link> : ""}
                </div> */}

                <div className="mb2">
                    <h4 className="mb1">Bio:</h4>
                    <textarea id="bio" cols="70" rows="5" className="bio mr1" placeholder={userDetails.bio} disabled={showUsername} name='bio' onChange={(e) => handleEditInfo(e)} ></textarea>
                    <button onClick={handleShowUser}>
                        <img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" />
                    </button>
                </div>

                <div className="user-social mb2">
                    <div className="user-social-content mb1">
                        <img src={assets.instagram} alt="instagram" className="icon mr1" />
                        <input type="text" placeholder={userDetails.instagram} className="mr1" disabled={showUsername} name='instagram' onChange={(e) => handleEditInfo(e)} />
                        <button onClick={handleShowUser}>
                            <img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" />
                        </button> 
                    </div>
                    <div className="user-social-content mb1">
                        <img src={assets.telegram} alt="instagram" className="icon mr1" />
                        <input type="text" placeholder={userDetails.telegram} className="mr1" disabled={showUsername} name='telegram' onChange={(e) => handleEditInfo(e)} />
                        <button onClick={handleShowUser}>
                            <img src={showUsername ? assets.pencil : assets.ignore} alt="icon" className="icon" />
                        </button> 
                    </div>
                </div>

                <div className="apply">
                    {!showUsername && <button className="t-btn" onClick={editUserInfo}>Saqlash</button>}
                </div>
            </div>
        </div>
    )
}

export default UserProfile