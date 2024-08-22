import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Form, FormGroup, FormField, Input, Select, Table, TableHeader, TableBody, TableHeaderCell, TableRow, TableCell, Button, Checkbox } from 'semantic-ui-react'


const Update = () => {


    const genderOptions = [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
        { text: 'Other', value: 'other' },
    ]
    const ResearchDomain = [
        { text: 'Life Science', value: 'Life Science' },
        { text: 'Engineering', value: 'Engineering' },
        { text: 'Management', value: 'Management' },
    ]

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
      }

    // ****** Start Set the input values ******
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [designation, setDesignation] = useState("");
    const [domain, setDomain] = useState("");
    const [entitle, setEntitle] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [currentDate, setCurrentDate] = useState(getDate());
    const [errors, setErrors] = useState({});
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [totalInstallment, setTotalInstallment] = useState(0);
    const [installments, setInstallments] = useState([]);
    const [inputCount, setInputCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [id, setID] = useState(null);
    const labels = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];

   
    // ******** End Set the input values ********

    useEffect(() => {
        setID(localStorage.getItem('ID') || "");
        setName(localStorage.getItem('name') || "");
        setEmail(localStorage.getItem('email') || "");
        setGender(localStorage.getItem('gender') || "");
        setCurrentDate(localStorage.getItem('date') || "");
        setDomain(localStorage.getItem('domain') || "");
        setDesignation(localStorage.getItem('designation') || "");
        setEntitle(localStorage.getItem('entitle') || "");
        setDescription(localStorage.getItem('description') || "");
        setPrice(parseInt(localStorage.getItem('price')) || 0);
        setQuantity(parseInt(localStorage.getItem('quantity')) || 0);
        setTotal(parseInt(localStorage.getItem('total')) || 0);
        setDiscount(parseInt(localStorage.getItem('discount')) || 0);
        setGrandTotal(parseInt(localStorage.getItem('grandtotal')) || 0);
        setInstallments(JSON.parse(localStorage.getItem('installments')) || []);
        setInputCount(parseInt(localStorage.getItem('inputCount')) || 0);
        setRows(Array(parseInt(localStorage.getItem('inputCount')) || 0).fill(''));
    }, []);

    // *************** Form Validations **************


    const Validate = () => {
        const newErrors = {};

        if (!name) newErrors.name = 'Name is required';
        if (!description) newErrors.description = 'Description is required';
        if (!designation) newErrors.designation = 'Desingnation is required';
        if (!domain) newErrors.domain = 'Research Area / Domain is required';
        if (!gender) newErrors.gender = 'Gender is required';
        if (!currentDate) newErrors.currentDate = 'Current date is required';
        if (!price) newErrors.price = 'Price is required';
        if (!quantity) newErrors.quantity = 'Quantity is required';
        if (!total) newErrors.total = 'Total is required';
        if (!discount) newErrors.discount = 'Discount is required';
        if (!grandTotal) newErrors.grandTotal = 'GrandTotal is required';
        if (!inputCount) newErrors.inputCount = 'Installment is required';
        if (!installments) newErrors.installments = 'When will be the installment paid';

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!checkbox) newErrors.checkbox = 'You must agree to the terms & conditions';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

   




 //   ********************************************************************
    const update = () => {
        if (Validate()) {
            axios.put(`https://66b1ede41ca8ad33d4f5c78f.mockapi.io/invoice/Invoice/${id}`, {
                name,
                email,
                gender,
                currentDate,
                designation,
                domain,
                entitle,
                description,
                totalInstallment,
                price,
                quantity,
                total,
                discount,
                grandTotal,
                inputCount,
                totalInstallment,
                installments
            })
                .then((response) => {
                    alert('Data updated successfully');
                    window.location.href = '/'; 
                })
                .catch((error) => {
                    console.log('Error posting data:', error)
                })
        }
    }









    // ********************* Calculation of Price and Quantity ****************************
    const handlePrice = (event) => {
        const value = parseInt(event.target.value) || 0;
        setPrice(value);
        const subtotal = value * quantity;
        setTotal(subtotal);
        setGrandTotal(subtotal - discount);
    }

    const handleQuantity = (event) => {
        const value = parseInt(event.target.value) || 0;
        setQuantity(value);
        const subtotal = value * price;
        setTotal(subtotal);
        setGrandTotal(subtotal - discount);
    }

    const handleDiscount = (event) => {
        const value = parseInt(event.target.value) || 0;
        setDiscount(value);
        setGrandTotal(total - value);
    }



    // ************** Start Row Increament on change the Total Installment ****************


    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setInputCount(value);
            setRows(Array(value).fill(''));
        } else {
            setInputCount(0);
            setRows([]);
        }
    };

    const handleInstallmentChange = (index, field, value) => {
        const updatedInstallments = [...installments];
        if (!updatedInstallments[index]) {
            updatedInstallments[index] = { label: labels[index] };
        }
        updatedInstallments[index][field] = value;
        setInstallments(updatedInstallments);
    };












    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <Form className=''>
                            <FormGroup widths='equal'>
                                <FormField control={Input} label='Full Name' value={name} onChange={(e) => setName(e.target.value)} error={errors.name ? { content: errors.name } : null} />
                                <FormField control={Input} label='Email' value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email ? { content: errors.email } : null} />
                                <FormField control={Select} label={{ children: 'Gender' }} value={gender} options={genderOptions} onChange={(e, { value }) => setGender(value)} error={errors.gender} />
                                {/* <SemanticDatepicker control={Date} label='Date' onChange={(e) => setDate(e.target.value)}/> */}
                            </FormGroup>

                            <FormGroup widths='equal'>
                                <FormField control={Select} label={{ children: 'Research Area / Domain' }} value={domain} options={ResearchDomain} onChange={(e, { value }) => setDomain(value)} error={errors.domain ? { content: errors.domain } : null} />
                                <FormField control={Input} label='Designation' value={designation} onChange={(e) => setDesignation(e.target.value)} error={errors.designation ? { content: errors.designation } : null} />
                                <FormField control={Input} label='Entitle' value={entitle} onChange={(e) => setEntitle(e.target.value)} />
                            </FormGroup>

                            <Table celled padded>
                                <TableHeader>
                                    <TableRow>
                                        <TableHeaderCell singleLine>DESCRIPTION</TableHeaderCell>
                                        <TableHeaderCell>PRICE</TableHeaderCell>
                                        <TableHeaderCell>QUANTITY</TableHeaderCell>
                                        <TableHeaderCell>SUBTOTAL</TableHeaderCell>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    <TableRow>
                                        <TableCell><FormField type='text' control={Input} value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description ? { content: errors.description } : null} /></TableCell>
                                        <TableCell><FormField type='number' control={Input} value={price} onChange={handlePrice} error={errors.price ? { content: errors.price } : null} /></TableCell>
                                        <TableCell><FormField type='number' control={Input} value={quantity} onChange={handleQuantity} error={errors.quantity ? { content: errors.quantity } : null} /></TableCell>
                                        <TableCell><FormField value={total} onChange={(e) => setTotal(e.target.value)} error={errors.total ? { content: errors.total } : null} />{total}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={3}><p>DISCOUNT:</p></TableCell>
                                        <TableCell><FormField control={Input} type='number' value={discount} onChange={handleDiscount} error={errors.discount ? { content: errors.discount } : null} /></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={3}><p>GRAND TOTAL:</p></TableCell>
                                        <TableCell><FormField placeholder="Grand Total" value={grandTotal} onChange={(e) => setGrandTotal(e.target.value)} error={errors.grandTotal ? { content: errors.grandTotal } : null} />{grandTotal}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={3}><p>TOTAL INSTALLMENT:</p></TableCell>
                                        <TableCell><FormField type="number" control={Input} min="0" max="10" value={inputCount} onChange={handleInputChange} error={errors.inputCount ? { content: errors.inputCount } : null} /></TableCell>
                                    </TableRow>

                                    {rows.map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><p>{labels[index]}:</p></TableCell>
                                            <TableCell colSpan={2}><FormField name='Installment' control={Input} placeholder='Installment' onChange={(e) => handleInstallmentChange(index, 'when', e.target.value)} error={errors.when ? { content: errors.when } : null} /></TableCell>
                                            <TableCell><FormField name='Total' type='number' placeholder='Amount' control={Input} onChange={(e) => handleInstallmentChange(index, 'installmentAmount', e.target.value)} error={errors.installmentAmount ? { content: errors.installmentAmount } : null} /></TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>

                            <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)} error={errors.checkbox ? { content: errors.checkbox } : null} />
                           <FormField control={Button} content='Update' onClick={update} />
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update
