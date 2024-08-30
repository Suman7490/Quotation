import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup, FormField, Form, Input, Select, Checkbox, Button, } from 'semantic-ui-react';




const genderOptions = [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
    { text: 'Other', value: 'other' },
]
const Role = [
    { text: 'Admin', value: 'Admin' },
    { text: 'Team Head', value: 'Team Head' },
    { text: 'Employee', value: 'Employee' },
]
const Register = () => {
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [gender, setGender] = useState("");
    // const [role, setRole] = useState("");
    // const [password, setPassword] = useState("");
    // const [checkbox, setCheckbox] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        gender: '',
        role: '',
        password: '',
        checkbox: false,
    });


    const Validations = () => {
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const password_pattern = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
        const error = {};
        if (values.name === "") { error.name = "Name should not be empty" }
        else { error.name = ""; }
        if (values.gender === "") { error.gender = "Gender should not be empty" }
        else { error.gender = ""; }
        if (values.role === "") { error.role = "role should not be empty" }
        else { error.role = ""; }
        if (values.password === "") { error.password = "password should not be empty" }
        else if (!password_pattern.test(values.password)) { error.password = "Password didn't match" }
        else { error.password = "" }
        if (values.email === "") { error.email = "Email should not be empty" }
        else if (!email_pattern.test(values.email)) { error.email = "Email pattern didn't match" }
        else { error.email = "" }
        if (values.checkbox === false) { error.checkbox = "You must agree to the terms & conditions" }
        else { error.checkbox = "" }
        return error;
    }

    const handleInput = (e) => {
        setValues(prev => ({
            ...prev, [e.target.name]: [e.target.value]
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const err = Validations(values);
        setErrors(err);
        if(err.name === "" && err.email === "" && err.password === "" && err.gender === "" && err.role === "" && err.checkbox === true){
            
        }
    }





 

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'></div>

                    <div className='col-md-8 border border-warning rounded p-5'>
                        <h1 className='text-center'>Register Form</h1>
                        <Form className=''>
                            <FormGroup widths='equal'>
                                <FormField control={Input} label='Full Name' placeholder='Full Name' />
                                <FormField control={Input} label='Email' placeholder='joe@schmoe.com' />
                                <FormField control={Select} label={{ children: 'Gender' }} placeholder='Gender' options={genderOptions} />
                            </FormGroup>
                            <FormGroup widths='equal'>
                                <FormField control={Select} label={{ children: 'Role' }} placeholder='Role' options={Role} />
                                <FormField control={Input} label='Password' placeholder='Password' />
                            </FormGroup>
                            <Checkbox label='I agree to the Terms and Conditions' /><br />
                            <Button color='yellow'>Register</Button>
                        </Form>
                    </div>

                    <div className='col-md-2'></div>
                </div>
            </div>
        </>
    )
}

export default Register
