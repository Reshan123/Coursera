import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'

import NavBar from "../components/NavBar";

const SignUp = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        companyName: '',
        password: '',
        nationalIdentityCardNumber: '',
        role:''
    })

    const inputChange = (element) => {
        const { name, value } = element.target
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const formSubmit = async (e) => {
        e.preventDefault()
        formData.role = 'user'
        axios.post(
            'http://localhost:3001/user_api/user_register',
            formData
        ).then(
            setFormData({
                fullName: '',
                email: '',
                contactNumber: '',
                companyName: '',
                password: '',
                nationalIdentityCardNumber: '',
                role:''
            },
            navigate('/signin')
        )
        ).catch(error => console.log(error))
    }

    return ( 
        <>
            <div className="heroContainer">
                <NavBar />
                <div className="signInForm">
                    <div className="formTitle">Sign Up</div>
                    <form onSubmit={formSubmit}>
                    <div className="inputContainer">
                            <label htmlFor="fullName">Full Name <span>*</span></label>
                            <input type="text" name="fullName" id="fullName" onChange={inputChange} value={formData.fullName} />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="email">Email <span>*</span></label>
                            <input type="email" name="email" id="email" onChange={inputChange} value={formData.email} />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="contactNumber">Contact No. <span>*</span></label>
                            <input type="number" name="contactNumber" id="contactNumber" onChange={inputChange} value={formData.contactNumber}/>
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="nationalIdentityCardNumber">NIC <span>*</span></label>
                            <input type="number" name="nationalIdentityCardNumber" id="nationalIdentityCardNumber" onChange={inputChange} value={formData.nationalIdentityCardNumber} />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="password">Password <span>*</span></label>
                            <input type="password" name="password" id="password" onChange={inputChange} value={formData.password} />
                        </div>
                        <div className="inputContainer">
                            <label htmlFor="companyName">Company <span>*</span></label>
                            <select name="companyName" id="companyName" onChange={inputChange} value={formData.companyName}>
                                <option value="">Select a Company</option>
                                <option value="company1">Company 1</option>
                                <option value="company2">Company 2</option>
                            </select>
                        </div>
                        <div className="buttonContainer">
                            <button type="submit">Sign Up</button>
                        </div>
                        <div className="noAccount">Already have an account? <span><NavLink to="/signin">Sign In</NavLink></span></div>
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default SignUp;