import { createContext, useState  } from "react";
import 'firebase/auth'

export const FirebaseContext=createContext(null)
export const AuthContext=createContext(null);

export default function Context({children}){
    const [user,setUser]=useState('hello')
    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}