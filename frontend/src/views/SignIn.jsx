import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import NavBar from "../components/NavBar";

const signin = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const inputChange = (element) => {
        const { name, value } = element.target
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const submitForm = async (e) => {
        e.preventDefault()
        axios.post(
            'http://localhost:3001/user_api/user_login',
            formData
        ).then( res => {
            const json = JSON.stringify(res.data)
            localStorage.setItem('userToken', json),
            navigate('/')
        }).catch(error => console.log(error))

    }

    return ( 
        <>
            <div className="heroContainer">
                <NavBar />
                <div className="signInForm">
                    <div className="formTitle">Sign In</div>
                    <form onSubmit={submitForm}>
                    <div className="inputContainer">
                            <label htmlFor="email">Email :</label>
                            <input type="email" name="email" id="email" onChange={inputChange} value={formData.email} />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="password">Password :</label>
                            <input type="password" name="password" id="password" onChange={inputChange} value={formData.password} />
                        </div>
                        <div className="buttonContainer">
                            <button type="submit">Sign In</button>
                        </div>
                        <div className="noAccount">Dont have an account? <span><NavLink to="/signup">Sign Up</NavLink></span></div>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default signin;