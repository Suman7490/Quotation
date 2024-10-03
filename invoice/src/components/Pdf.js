import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import companyLogo from './KRW.png';
import Signature from './Signature.png';
import ReactToPrint from 'react-to-print';
import { TableRow, TableCell, Table, Icon } from 'semantic-ui-react';
import '../App.css';

const Pdf = () => {
    const { id } = useParams(); // Get the id from the URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const componentRef = useRef();



    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        // Fetch the data from the server
        axios.get(`http://localhost:8081/pdf/${id}`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Error retrieving data');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;



    const pageStyle = `
    @page {
      size: auto;
      margin: 20mm;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }
      .table-header {
        background-color: red;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      
    td, th {
     color: black; 
    }
    }
  `;

    return (

        <>
            {data ? (
                <div>
                    <ReactToPrint trigger={() => <Icon name='print' size='large' style={{cursor: 'pointer'}}/>} content={() => componentRef.current} pageStyle={pageStyle} />
                    <div ref={componentRef}>
                        <div className='container pdf'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Table className='border-0 table-stripped'>
                                        <TableRow>
                                            <TableCell>
                                                <div className='header'>
                                                    <p style={{ fontSize: '25px' }}>
                                                        <span style={{ color: 'darkblue' }}>KALP </span>
                                                        <span style={{ color: 'red' }}>RESEARCH </span>
                                                        <span style={{ color: 'darkblue' }}>WORK</span>
                                                        <strong> - </strong>
                                                        <span style={{ color: 'darkblue' }}>K</span>
                                                        <span style={{ color: 'red' }}>R</span>
                                                        <span style={{ color: 'darkblue' }}>W</span>
                                                    </p>
                                                    <p className='m-0'>Link road Krishna Nagar Mathura Utter Pradesh 281003</p>
                                                    <p className='m-0'> +91 - 7037663686</p>
                                                    <p className='m-0'> info@kalpresearchwork.com</p>
                                                    <p className='m-0'> www.kalpresearchwork.com</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <img src={companyLogo} alt="Logo" style={{ width: '200px' }} />
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </div>
                            <hr style={{ border: '.2px solid black' }} />
                            <div className='row pt-5'>
                                <div className='col-md-12'>
                                    <Table className='border-0'>
                                        <TableRow>
                                            <TableCell>
                                                <div className='header'>
                                                    <p className='m-0'>Quotation To:</p>
                                                    <p className='m-0' style={{ color: 'red', fontWeight: '800', fontSize: '25px', textTransform: 'uppercase' }}>{data.name}</p>
                                                    <p className='m-0'>Research Area/Domain: {data.domain}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <div className='header'>
                                                    <p className='m-0'>NO KRW/Q-{data.id}</p>
                                                    <p className='m-0'>DATE: {formatDate(data.date)}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </div>
                            <div className='row pt-5 mt-5 mb-5 pb-5'>
                                <div className='col-12'>
                                    <table className='table table-stripped'>
                                        <thead>
                                            <tr className='table-header' style={{ backgroundColor: '#d70202', color: 'white' }}>
                                                <th>SERVICES</th>
                                                <th>PRICE</th>
                                                <th>DISCOUNT</th>
                                                <th>GRAND TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.services.map((service, idx) => (
                                                <tr key={idx}  style={{ backgroundColor: '#0722ad', color: 'white' }}>
                                                    <td>{service.service}</td>
                                                    <td>{service.price}</td>
                                                    <td>{service.discount}</td>
                                                    <td>{service.grandTotal}</td>
                                                </tr>
                                            ))}
                                            <tr style={{ backgroundColor: '#d70202', color: 'white' }}>
                                                <td colSpan={3}>TOTAL AMOUNT OF ALL SERVICES :</td>
                                                <td>{data.total}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#d70202', color: 'white' }}>
                                                <td colSpan={3}>TOTAL INSTALLMENTS :</td>
                                                <td>{data.inputCount}</td>
                                            </tr>
                                            {data.installments.map((installment, idx) => (
                                                <tr key={idx} style={{ backgroundColor: '#0722ad', color: 'white' }}>
                                                    <td colSpan={3} style={{ textTransform: 'uppercase' }}>
                                                        {installment.label} : {installment.dueWhen} {installment.when}
                                                    </td>
                                                    <td>Rs. {installment.installmentAmount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                            <div className='row pt-5 mt-5'>
                                <div className='col-md-12'>
                                    <Table className='border-0'>
                                        <TableRow>
                                            <TableCell className='border-0'>
                                                <div className='header'>
                                                    <h3 className='p-3' style={{ backgroundColor: 'lightpink', width: '50%' }}>PAYMENT METHOD</h3>
                                                    <p className='m-0'>Account Details: 20005393359</p>
                                                    <p className='m-0'>IFSC: SBIN0002502</p>
                                                    <p className='m-0'>Branch: Pratap Bajar Vrindavan Mathura</p>
                                                </div>
                                                <div className='header mt-4'>
                                                    <h3 className='p-3' style={{ backgroundColor: 'lightpink', width: '50%' }}>TERMS AND CONDITION</h3>
                                                    <p className='m-0'>Please send payment within 30 days of receiving this invoice.</p>
                                                    <p className='m-0'>There will be a 10% interest charge per month on late invoices.</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className='border-0 text-center'>
                                                <img src={Signature} alt='Signature' style={{ width: '100px' }} />
                                                <hr style={{ border: '1px solid black' }} />
                                                <h5 className='pt-0 m-0'>AUTHORIZED SIGN</h5>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>

    );
};

export default Pdf;
