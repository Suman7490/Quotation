import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Icon } from 'semantic-ui-react';

const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [quotations, setQuotations] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);


    // ****************** Date fromate ******************
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };


    // ***************** print *****************
    const pdf = (id) => {
        navigate(`/pdf/${id}`); // Pass the selected row ID to the next page
    };
    const edit = (id) => {
        navigate(`/edit/${id}`); // Pass the selected row ID to the next page
    };

    const deleteQuotation = (quotationId) => {
        if (window.confirm('Are you sure you want to delete this quotation?')) {
            axios.delete(`http://localhost:8081/delete/${quotationId}`)
                .then((response) => {
                    alert('Quotation deleted successfully');
                    // Remove the deleted quotation from the state
                    setQuotations(quotations.filter(quotation => quotation.id !== quotationId));
                    window.location.href = '/';
                })
                .catch((error) => {
                    console.error('Error deleting data:', error);
                    alert('Error deleting quotation');
                });
        }
    };


    return (
        <>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Date</TableHeaderCell>
                        <TableHeaderCell>Research Domain</TableHeaderCell>
                        <TableHeaderCell>Services</TableHeaderCell>
                        <TableHeaderCell>Total Installments</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row, index) => {
                        return <TableRow key={index}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{formatDate(row.date)}</TableCell>
                            <TableCell>{row.domain}</TableCell>
                            <TableCell>
                                <ul className='p-0 m-0' style={{ listStyle: 'none', }}> 
                                     <span>{row.totalServices}</span>
                                    {row.services.map((service, idx) => (
                                        <li key={idx}>
                                            {service.serviceName} = P: {service.price}, D: {service.discount}, G: {service.grandTotal}
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell>
                                <ul className='p-0 m-0' style={{ listStyle: 'none', }}>
                                    <span>{row.inputCount}</span>
                                    {row.installments.map((installment, idx) => (
                                        <li key={idx}>
                                            {installment.label}: {installment.dueWhen} - {installment.installmentAmount}
                                        </li>
                                    ))}
                                </ul>
                            </TableCell>
                            <TableCell>
                                <Icon name='edit' size='large' onClick={() => edit(row.id)} className='text-primary' style={{ cursor: 'pointer' }} />
                                <Icon name='trash' size='large' className='text-danger' onClick={() => deleteQuotation(row.id)} />
                                <Icon name='eye' size='large' onClick={() => pdf(row.id)} className='text-success' style={{ cursor: 'pointer' }} />
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export default Home
