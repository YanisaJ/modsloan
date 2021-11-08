import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import firebaseConfig from '../config' //รับเอาตัว คอนฟิค.js ไฟล์เบสมา

const SignUp = () => {
    const [currentUser, setCurrentUser] = useState(null); //ฟังค์ชั่นการสร้างสเตทในฟังค์ชั่นได้

    const handleSubmit = (e) => { //รับอีเว้นท์การสร้างสมาชิก
        e.preventDefault(); //ป้องกันฟอร์ม เมื่อมีการสัมมิทจะไม่รีเฟสหน้าจอ
        const { email, password } = e.target.elements;

        try {
            firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);
            setCurrentUser(true);
        } catch(error) {
            alert(error);
        }
    }

    if (currentUser) {
        return <Redirect to="/dashboard" /> //การเช็คจากตัวดอมที่เรียกใช้มา
    }

    return ( //
        <>
            <div className="container mt-5">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        </>
    )
}

export default SignUp;