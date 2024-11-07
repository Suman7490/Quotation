import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import companyLogo from './new_logo.svg';
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
        axios.get(`https://railway-production-05a0.up.railway.app/pdf/${id}`)
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
                    <ReactToPrint trigger={() => <Icon name='print' size='large' style={{ cursor: 'pointer' }} />} content={() => componentRef.current} pageStyle={pageStyle} />
                    <div ref={componentRef}>
                        <div className='container pdf'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Table className='border-0 table-stripped'>
                                        <TableRow>
                                            <TableCell className='align-content-end'>
                                                <div className='header'>
                                                    <p style={{ fontSize: '25px', margin: '0' }}>
                                                        <strong style={{ color: '#084B1B' }}>KALP </strong>
                                                        <strong style={{ color: '#7F9D34' }}>RESEARCH </strong>
                                                        <strong style={{ color: '#084B1B' }}>WORK</strong>
                                                        <strong> - </strong>
                                                        <strong style={{ color: '#084B1B' }}>K</strong>
                                                        <strong style={{ color: '#7F9D34' }}>R</strong>
                                                        <strong style={{ color: '#084B1B' }}>W</strong>
                                                    </p>
                                                    <p className='m-0'><Icon className='home' />Link road Krishna Nagar Mathura Utter Pradesh 281003</p>
                                                    <p className='m-0'><Icon className='call' /> +91 - 7037663686</p>
                                                    <p className='m-0'><Icon className='mail' /> info@kalpresearchwork.com</p>
                                                    <p className='m-0'><Icon className='globe' /> www.kalpresearchwork.com</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-right align-content-end pb-0'>
                                                <img src={companyLogo} alt="Logo" style={{ width: '200px' }} />
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </div>
                            <hr style={{ border: '.2px solid black' }} />
                            <div className='row pt-1'>
                                <div className='col-md-12'>
                                    <Table className='border-0'>
                                        <TableRow>
                                            <TableCell>
                                                <div className='header'>
                                                    <p className='m-0'><strong>Quotation To:</strong></p>
                                                    <p className='m-0' style={{ color: '#084B1B', fontWeight: '800', fontSize: '25px', textTransform: 'uppercase' }}>{data.name}</p>
                                                    <p className='m-0'><strong>Research Area/Domain:</strong> {data.domain}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <div className='header'>
                                                    <p className='m-0'><strong>NO KRW/Q - </strong>{data.id}</p>
                                                    <p className='m-0'><strong>DATE:</strong> {formatDate(data.date)}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </div>
                            <div className='row pt-1 mt-5 mb-5 pb-5'>
                                <div className='col-12'>
                                    <table className='table table-stripped'>
                                        <thead>
                                            <tr className='table-header' style={{ backgroundColor: '#084B1B', color: 'white' }}>
                                                <th><strong>SERVICES</strong></th>
                                                <th><strong>PRICE</strong></th>
                                                <th><strong>DISCOUNT</strong></th>
                                                <th><strong>GRAND TOTAL</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.services.map((service, idx) => (
                                                <tr key={idx} style={{ backgroundColor: '#7F9D34', color: 'white' }}>
                                                    <td>{service.service}</td>
                                                    <td>{service.price}</td>
                                                    <td>{service.discount}</td>
                                                    <td>{service.grandTotal}</td>
                                                </tr>
                                            ))}
                                            <tr style={{ backgroundColor: '#084B1B', color: 'white' }}>
                                                <td colSpan={3}>SUBTOTAL:</td>
                                                <td>{data.total}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#084B1B', color: 'white' }}>
                                                <td colSpan={3}>TOTAL DISCOUNT :</td>
                                                <td>{data.totalDiscount}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#084B1B', color: 'white' }}>
                                                <td colSpan={3}>TOTAL PAYABLE AMOUNT :</td>
                                                <td>{data.finalAmount}</td>
                                            </tr>
                                            <tr style={{ backgroundColor: '#084B1B', color: 'white' }}>
                                                <td colSpan={3}>TOTAL INSTALLMENTS :</td>
                                                <td>{data.inputCount}</td>
                                            </tr>
                                            {data.installments.map((installment, idx) => (
                                                <tr key={idx} style={{ backgroundColor: '#7F9D34', color: 'white' }}>
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
                            <div className='row pt-5 mt-5 flex flex-wrap'>
                                <div className='col-md-12'>
                                    <Table className='border-0'>
                                        <TableRow>
                                            <TableCell className='border-0'>
                                                <div className='header'>
                                                    <h3 className='p-3' style={{ backgroundColor: '#7F9D34', width: '50%' }}>PAYMENT METHOD</h3>
                                                    <p className='m-0'>Account Details: 20005393359</p>
                                                    <p className='m-0'>IFSC: SBIN0002502</p>
                                                    <p className='m-0'>Branch: Pratap Bajar Vrindavan Mathura</p>
                                                </div>
                                                <div className='header mt-4'>
                                                    <h3 className='p-3' style={{ backgroundColor: '#7F9D34', width: '50%' }}>TERMS AND CONDITION</h3>
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
