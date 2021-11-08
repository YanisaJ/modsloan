import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import firebaseConfig from '../config'

const DashBoard = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <div className="container mt-5">
                <h1>ยินดีต้อนรับ</h1>
                <p>ท่านได้ทำการเข้าสู่ระบบเรียบร้อยแล้ว</p>
                <button onClick={() => firebaseConfig.auth().signOut()} class="btn btn-danger">Sign Out</button>
            </div>
        </div>
    )
}

export default DashBoard;