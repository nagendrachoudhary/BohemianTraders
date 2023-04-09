import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import {getLoginuser, LoginApi}from '../Api'

const AuthContext = React.createContext({
    user: {fname:""},
    setUser: (user) => {},
    showLoginForm: true,
    setShowLoginForm: (show) => {},
    login: (email, password) => {},
    logout: () => {},
})

export function AuthContextProvider({children}) {
    const [user, setUser] = useState({fname:""});
    const [showLoginForm, setShowLoginForm] = useState(true);
   async function login(email, password) {
        LoginApi(email, password)
        .then(response => {
            const {token} = response.data;
            localStorage.setItem('token', JSON.stringify(token));
            setShowLoginForm(false);
            
        })
        .catch(err => {
            alert(err, {
                type: 'error'
            })
        });
    }
 
    function logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }
    useEffect(() => {
        getLoginuser()
        .then(response => {
            // console.log(response)
            setShowLoginForm(false);
            const user = response.data
            setUser(user);
        })
    }, [showLoginForm])

    return <AuthContext.Provider value={{
        user, setUser,
        showLoginForm, setShowLoginForm,
        login, logout,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;