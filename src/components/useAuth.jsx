import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const[user, setUser] = useState(null);
    const[token,setToken] = useState({});

    useEffect(() => {
        setContextData();
    }, [])


    const setContextData = async () => {
       const t =  localStorage.getItem('token');
       const u = localStorage.getItem('user');
       setUser(u);
       setToken(t);
    }

    const logOut = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken('');
    }


    return (
        <AuthContext.Provider value = {{ token,user,setContextData, logOut }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
