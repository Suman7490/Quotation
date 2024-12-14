import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import logo from '../Images/new_logo.svg'
import Signature from '../Images/Signature.png';
import QR from '../Images/QR.jpeg';
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
        axios.get(`http://localhost:8000/pdf/${id}`)
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
     .footer{
      position: fixed; 
      bottom: 50px; 
      left: 80px; 
      right: 80px; 
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
                                                <img src={logo} alt="Logo" style={{ width: '200px' }} />
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
                                                    <p className='m-0' style={{ fontSize: '17px' }}><strong>Quotation To:</strong></p>
                                                    <p className='m-0' style={{ color: '#084B1B', fontWeight: '800', fontSize: '25px', textTransform: 'uppercase' }}>{data.name}</p>
                                                    <p className='m-0 pt-5' style={{ fontSize: '17px' }}><strong>Research Area/Domain:</strong> {data.domain}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <div className='header'>
                                                    <p className='m-0' style={{ fontSize: '17px' }}><strong>NO KRW/Q - </strong>{data.id}</p>
                                                    <p className='m-0' style={{ fontSize: '17px' }}><strong>DATE:</strong> {formatDate(data.date)}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </div>
                           
                            <div className='rows'>
                                <div className='row ml-1 mr-1 mb-0 border-bottom text-white' style={{ fontSize: '1.1em', padding: '0.7rem 0' }}>
                                    <div className='col-md-3'>
                                        <strong>SERVICES</strong>
                                    </div>
                                    <div className='col-md-3'>
                                        <strong>PRICE</strong>
                                    </div>
                                    <div className='col-md-3'>
                                        <strong>DISCOUNT</strong>
                                    </div>
                                    <div className='col-md-3'>
                                        <strong>GRAND TOTAL</strong>
                                    </div>
                                </div>
                                {data.services.map((service, idx) => (
                                    <div key={idx} className='row ml-1 mr-1 mb-0 border-bottom text-white' style={{ fontSize: '1.1em', padding: '0.7rem 0' }}>
                                        <div className='col-md-3'>
                                            <span className='mb-2 mt-2'>{service.service}</span>
                                        </div>
                                        <div className='col-md-3'>
                                            <span>{service.price}</span>
                                        </div>
                                        <div className='col-md-3'>
                                            <span>{service.discount}</span>
                                        </div>
                                        <div className='col-md-3'>
                                            <span>{service.grandTotal}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className='row ml-1 mr-1 mb-0 border-bottom text-white' style={{ fontSize: '1.1em', padding: '0.7rem 0'}}>
                                    <div className='col-md-6'></div>
                                    <div className='col-md-3'>
                                        <strong>SUBTOTAL :</strong>
                                    </div>
                                    <div className='col-md-3'>
                                        <span>{data.total}</span>
                                    </div>
                                </div>
                                <div className='row ml-1 mr-1 mb-0 border-bottom text-white' style={{ fontSize: '1.1em', padding: '0.7rem 0' }}>
                                    <div className='col-md-9'>
                                        <strong>TOTAL INSTALLMENTS :</strong>
                                    </div>
                                    <div className='col-md-3'>
                                        <span>{data.inputCount}</span>
                                    </div>
                                </div>
                                {data.installments.map((installment, idx) => (
                                    <div key={idx} className='row ml-1 mr-1 mb-0 border-bottom text-white' style={{ fontSize: '1.1em', padding: '0.7rem 0', textTransform: 'uppercase' }}>
                                        {/* {installment.label} : {installment.dueWhen} {installment.when} */}
                                        <div className='col-md-9 d-flex'>
                                            <div className='' style={{ width: '70px' }}>{installment.label}</div>
                                            <span className='pr-2'>:</span>
                                            <span>{installment.dueWhen}</span>
                                        </div>
                                        <div className='col-md-3'>{installment.installmentAmount}</div>
                                    </div>
                                ))}
                            </div>





                            <div className='row pt-5 mt-5 footer'>
                                <div className='col-md-12'>
                                    <Table className='border-0'>
                                        <TableRow>
                                            <TableCell className='border-0'>
                                                <div className='header'>
                                                    <h3 className='p-3' style={{ backgroundColor: '#7F9D34', width: '50%' }}>PAYMENT METHOD</h3>
                                                    <p className='m-0'>Account Type: Current Account</p>
                                                    <p className='m-0'>Account Holder Name: Kalp Squad Group</p>
                                                    <p className='m-0'>Account Number: 42188265333</p>
                                                    <p className='m-0'>IFSC: SBIN0002502</p>
                                                </div>
                                                <div className='header mt-4'>
                                                    <h3 className='p-3' style={{ backgroundColor: '#7F9D34', width: '50%' }}>TERMS AND CONDITION</h3>
                                                    <p className='m-0'>Please send payment within 30 days of receiving this invoice.</p>
                                                    <p className='m-0'>There will be a 10% interest charge per month on late invoices.</p>
                                                </div>
                                            </TableCell>
                                            <TableCell className='border-0 text-center'>
                                                <img src={Signature} alt='Signature' style={{ width: '100px' }} />
                                                <hr style={{ border: '1px solid black', marginTop: '-1rem', marginBottom: '0rem' }} />
                                                <h5 className='pt-0 pb-3 m-0'>AUTHORIZED SIGN</h5>
                                                <img src={QR} alt='Signature' style={{ width: '150px' }} />
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
