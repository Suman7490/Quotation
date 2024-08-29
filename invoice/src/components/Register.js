import React, {useState} from 'react';
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
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [errors, setErrors] = useState({});

    const Validate = () => {
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!gender) errors.gender = 'Name is required';
        if (!role) errors.role = 'Name is required';
        if (!password) errors.password = 'Name is required';
        if (!checkbox) errors.checkbox = 'You must agree to the terms & conditions';

        if (!email) {
            errors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }


        if (password.length < 8) {
            errors.length = "Password must be at least 8 characters long.";
        }
        else if (!/[A-Z]/.test(password)) {
            errors.uppercase = "Password must contain at least one uppercase letter.";
        }
        else if (!/[a-z]/.test(password)) {
            errors.lowercase = "Password must contain at least one lowercase letter.";
        }
        else if (!/[0-9]/.test(password)) {
            errors.number = "Password must contain at least one number.";
        }
        else if (!/[!@#$%^&*]/.test(password)) {
            errors.specialChar = "Password must contain at least one special character (!@#$%^&*).";
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
