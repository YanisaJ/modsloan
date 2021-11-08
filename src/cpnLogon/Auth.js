import React, { useState, useEffect } from 'react'
import firebaseConfig from '../config'

export const AuthContext = React.createContext(); //ใช้ตรวจสอบเมื่อยูเซอร์ทำการออเทน

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebaseConfig.auth().onAuthStateChanged((user) => { //onAuthStateChanged คือตัวสังเกตการ์ณการเข้าและออกของ ยูเซอ
            setCurrentUser(user);
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider> //แชร์ข้อมูลหรือส่งสถานะ ของ current user ไปให้กับ components ตัวอื่นๆที่เราสร้างมา
    )
}