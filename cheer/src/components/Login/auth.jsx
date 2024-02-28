import { createContext, useState, useContext } from 'react';

// create context to store email to be retrieved by other .jsx files
const AuthContext = createContext();

// used to access authentication context
export const useAuth = () => useContext(AuthContext);

// wraps App.js and provides authentication context
export const AuthProvider = ({ children }) => { // children represents content wrap by AuthProvider
    const [userEmail, setUserEmail] = useState('');

    const login = (email) => {
        setUserEmail(email);
    };

    const logout = () => {
        setUserEmail('');
    };

    return (
        <AuthContext.Provider value={{ userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}