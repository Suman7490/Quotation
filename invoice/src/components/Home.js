import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [data, setData] = useState([]);

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

        return `${year}-${month}-${day}`;
    };


    return (
        <>
            <table className='table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Designation</th>
                        <th>Domain</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Grand Total</th>
                        <th>Total Installments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        return <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{formatDate(row.date)}</td>
                            <td>{row.designation}</td>
                            <td>{row.domain}</td>
                            <td>{row.description}</td>
                            <td>{row.price}</td>
                            <td>{row.discount}</td>
                            <td>{row.grandTotal}</td>
                            <td>
                                <ul className='p-0 m-0' style={{ listStyle: 'none', }}>
                                    <span>{row.inputCount}</span>
                                    {row.installments.map((installment, idx) => (
                                        <li key={idx}>
                                            {installment.label}: {installment.when} - {installment.installmentAmount}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td><button>Edit</button></td>
                        </tr>

                    })}
                </tbody>
            </table>
        </>
    )
}

export default Home
