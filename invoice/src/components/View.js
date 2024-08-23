import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const View = () => {
    const [APIData, setAPIData] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const navigate = useNavigate();
    const componentRef = useRef();


    // ******** Store data into locaStorage/ Read Data ***********

    const setData = (data) => {
        console.log(data);
        let { id, name, email, gender, currentDate, designation, domain, entitle, description, price, quantity, total, discount, grandTotal, inputCount, totalInstallment } = data;

        localStorage.setItem('ID', id);
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('gender', gender);
        localStorage.setItem('date', currentDate);
        localStorage.setItem('domain', domain);
        localStorage.setItem('designation', designation);
        localStorage.setItem('entitle', entitle);
        localStorage.setItem('description', description);
        localStorage.setItem('price', price);
        localStorage.setItem('quantity', quantity);
        localStorage.setItem('total', total);
        localStorage.setItem('discount', discount);
        localStorage.setItem('grandtotal', grandTotal);
        localStorage.setItem('inputcount', inputCount);
        localStorage.setItem('installment', totalInstallment);
    }

    useEffect(() => {
        axios.get(`https://66b1ede41ca8ad33d4f5c78f.mockapi.io/invoice/Invoice`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])


    const handleRowClick = (id) => {
        setSelectedRowId(id);
        // Navigate to another page with the selected row ID as a query parameter
        navigate(`/print?id=${id}`);
    };


    // ********************* Delete Function ***************************

    const getData = () => {
        axios.get(`https://66b1ede41ca8ad33d4f5c78f.mockapi.io/invoice/Invoice`)
            .then((getData) => {
                setAPIData(getData.data);
            })
    }

    const onDelete = (id) => {
        axios.delete(`https://66b1ede41ca8ad33d4f5c78f.mockapi.io/invoice/Invoice/${id}`)
            .then(() => {
                getData();
            })
    }





    return (
        <>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell>Designation</TableHeaderCell>
                        <TableHeaderCell>Research Domain</TableHeaderCell>
                        <TableHeaderCell>Description</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Discount</TableHeaderCell>
                        <TableHeaderCell>Grand Total</TableHeaderCell>
                        <TableHeaderCell>Total Installments</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {APIData.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell className='p-0 m-0'>{data.id}</TableCell>
                            <TableCell className='p-0 m-0'>{data.name}</TableCell>
                            <TableCell className='p-0 m-0'>{data.email}</TableCell>
                            <TableCell className='p-0 m-0'>{data.currentDate}</TableCell>
                            <TableCell className='p-0 m-0'>{data.designation}</TableCell>
                            <TableCell className='p-0 m-0'>{data.domain}</TableCell>
                            <TableCell className='p-0 m-0'>{data.description}</TableCell>
                            <TableCell className='p-0 m-0'>{data.price}</TableCell>
                            <TableCell className='p-0 m-0'>{data.discount}</TableCell>
                            <TableCell className='p-0 m-0'>{data.grandTotal}</TableCell>
                            <TableCell className='p-0 m-0'>
                                <ul className='p-0 m-0' style={{ listStyle: 'none', }}>
                                    <span>{data.inputCount}</span>
                                    {data.installments.map((installment, idx) => (

                                        <li key={idx}>
                                            {installment.label}:{installment.when} - {installment.installmentAmount}
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell>
                                <Link to='/update'><Icon name='edit' size='large' onClick={() => setData(data)} /></Link>
                                <Icon name='trash' size='large' onClick={() => onDelete(data.id)} style={{ cursor: 'pointer' }} className='text-danger' />
                                <Icon name='eye' size='large' onClick={() => handleRowClick(data.id)} style={{ cursor: 'pointer' }} className='text-success' />
                            </TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default View
