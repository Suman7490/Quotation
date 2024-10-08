import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Icon} from 'semantic-ui-react';

const ServiceView = () => {
    const [data, setData] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/servicesData')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);



    const deleteService = (id) => {
        if (window.confirm(`Are you sure you want to delete the quotation with ID ${id}?`)) {
            axios.delete(`http://localhost:8081/serviceDelete/${id}`)
                .then(response => {
                    alert(response.data.message);
                    // Remove the deleted quotation from the state
                    setServices(services.filter(services => services.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting quotation:', error);
                    alert('Failed to delete the quotation');
                });
        }
    };
    console.log(deleteService)
    return (
        <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                <Table width="100%" className='table'>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ID</TableHeaderCell>
                        <TableHeaderCell>Quotation ID</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>discount</TableHeaderCell>
                        <TableHeaderCell>Total</TableHeaderCell>
                        <TableHeaderCell>Action</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((service, idx) => (
                        <TableRow key={idx}>
                            <TableCell>{service.id}</TableCell>
                            <TableCell>{service.quotation_id}</TableCell>
                            <TableCell> {service.serviceName}</TableCell>
                            <TableCell>{service.price}</TableCell>
                            <TableCell>{service.discount}</TableCell>
                            <TableCell>{service.grandTotal}</TableCell>
                            <TableCell className='text-center'><Icon className='trash text-danger' size='large' style={{ cursor: 'pointer' }} onClick={() => deleteService(service.id)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
                </div>
            </div>
        </div>
            
        </>
    )
}

export default ServiceView
