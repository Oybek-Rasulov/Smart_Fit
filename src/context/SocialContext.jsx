import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

export const SocialContext = createContext();

export function SocialProvider({ children }) { 
    const [dataComment, setDataComment] = useState([]);
    const [likes, setLikes] = useState([]);
    const [save, setSave] = useState([]);
    const [userid, setUserId] = useState(null);
    const [response, setResponse] = useState("");

    useEffect(() => {
        async function getData() {
            const user = JSON.parse(localStorage.getItem("user"));

            const data = await axios.post("https://smartfitbackend.onrender.com/data", {user: user})
            setDataComment(data.data.comments);
            setLikes(data.data.likes)
            setSave(data.data.saves)
            setUserId(data.data.userid)
        }

        getData()
    }, [response])

    const socialValue = useMemo(() => ({dataComment, likes, save, setUserId, userid, setResponse}), [dataComment, response, likes, userid, save]);

    return (
        <SocialContext.Provider value={{socialValue}}>
            {children}
        </SocialContext.Provider>
    )
}

export function useSocial() {
    return useContext(SocialContext);
}