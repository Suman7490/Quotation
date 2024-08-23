import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);


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
                            <td>{row.current_date}</td>
                            <td>{row.designation}</td>
                            <td>{row.domain}</td>
                            <td>{row.description}</td>
                            <td>{row.price}</td>
                            <td>{row.discount}</td>
                            <td>{row.grandTotal}</td>
                            <td>
                                <span>{row.inputCount}</span>
                                <ul>
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
