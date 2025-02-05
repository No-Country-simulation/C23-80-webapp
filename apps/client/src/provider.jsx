import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("access_token"));
    const [user, setUser] = useState(token ? jwtDecode(token) : null);
    
    useEffect(() => {
        if(token && !user) {
            setUser(jwtDecode(token));
        } else if(!token) {
            setUser(null);
        }
    },[token]);
    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;