import { createContext, useState, useContext, useMemo, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser)
    }, [])

    function login(check) {
        localStorage.setItem("user", JSON.stringify(check));
        setUser(check)
    }

    function getUser() {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser.user);
    }

    function removeUser() {
        localStorage.removeItem("user");
        setUser("");
    }

    const providerValue = useMemo(() => ({login, getUser, removeUser, user}), [user, removeUser, login, getUser]);

    return (
        <AuthContext.Provider value={{providerValue}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}