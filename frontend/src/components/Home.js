import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Icon, FormField, Input } from 'semantic-ui-react';

const Home = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const navigate = useNavigate();
    const [quotations, setQuotations] = useState([]);

    const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )
    if (filteredItems.length === 0) {
        console.log(true)
    } else {
        // console.log("Filtered Items:", filteredItems)
        console.log(false)
    }

    useEffect(() => {
        axios.get('https://backend-three-xi-82.vercel.app')
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
        navigate(`/update/${id}`); // Pass the selected row ID to the next page
    };

    const deleteQuotation = (quotationId) => {
        if (window.confirm('Are you sure you want to delete this quotation?')) {
            axios.delete(`https://backend-three-xi-82.vercel.app/delete/${quotationId}`)
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
            <div className='container-fluid h-100'>
                <div className='row'>
                    <div className='col-md-12 pt-5'>
                        <FormField
                            control={Input}
                            name="search"
                            placeholder="Seacrh by name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Table celled striped className='table-responsive'>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderCell>ID</TableHeaderCell>
                                    <TableHeaderCell>Name</TableHeaderCell>
                                    <TableHeaderCell>Email</TableHeaderCell>
                                    <TableHeaderCell>Date</TableHeaderCell>
                                    <TableHeaderCell>Research Domain</TableHeaderCell>
                                    <TableHeaderCell>Services</TableHeaderCell>
                                    {/* <TableHeaderCell>Total Discount</TableHeaderCell> */}
                                    <TableHeaderCell>Final Amount</TableHeaderCell>
                                    <TableHeaderCell>Total Installments</TableHeaderCell>
                                    <TableHeaderCell>Action</TableHeaderCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.length === 0 ? (
                                    <p>No record found</p>
                                ) : (
                                   
                                        filteredItems.map((row, index) => {
                                            return <TableRow key={index}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{formatDate(row.date)}</TableCell>
                                                <TableCell>{row.domain}</TableCell>
                                                <TableCell>
                                                    <ul className='p-0 m-0' style={{ listStyle: 'none', }}>
                                                        {/* <span>{row.totalServices}</span> */}
                                                        {row.services.map((service, idx) => (
                                                            <li key={idx}>
                                                                {service.serviceName} = P: {service.price}, D: {service.discount}, G: {service.grandTotal}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </TableCell>
                                                {/* <TableCell>{row.totalDiscount}</TableCell> */}
                                                <TableCell>{row.total}</TableCell>
                                                <TableCell>
                                                    <ul className='p-0 m-0' style={{ listStyle: 'none', }}>
                                                        {/* <span>{row.inputCount}</span> */}
                                                        {row.installments.map((installment, idx) => (
                                                            <li key={idx}>
                                                                {installment.label}: {installment.dueWhen} - {installment.installmentAmount}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </TableCell>
                                                <TableCell>
                                                    <Icon name='edit' size='large' onClick={() => edit(row.id)} className='text-primary' style={{ cursor: 'pointer' }} />
                                                    <Icon name='trash' size='large' onClick={() => deleteQuotation(row.id)} className='text-danger' style={{ cursor: 'pointer' }} />
                                                    <Icon name='eye' size='large' onClick={() => pdf(row.id)} className='text-success' style={{ cursor: 'pointer' }} />
                                                </TableCell>
                                            </TableRow>
                                        })
                                    
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
