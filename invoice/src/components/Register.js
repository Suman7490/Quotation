import React from 'react';
import { Form, FormGroup, FormField } from 'react-router-dom';
const genderOptions = [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
    { text: 'Other', value: 'other' },
]
const role = [
    { text: 'Life Science', value: 'Life Science' },
    { text: 'Engineering', value: 'Engineering' },
    { text: 'Management', value: 'Management' },
]

const Register = () => {

    return (
        <div>
            <Form className=''>
                <FormGroup widths='equal'>
                    <FormField control={Input} label='Full Name' placeholder='Full Name' />
                    <FormField control={Input} label='Email' placeholder='joe@schmoe.com' />
                    <FormField control={Select} label={{ children: 'Gender' }} placeholder='Gender' options={genderOptions} />
                    <FormField content={Select} label={{ children: 'Role' }} placeholder='Role' options={role} />
                </FormGroup>
            </Form>
        </div>
    )
}

export default Register
