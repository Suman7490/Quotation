import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FormGroup, FormField, Form, Input, Checkbox, Button, Select, TableHeader, TableHeaderCell, TableRow, TableCell, Table, TableBody } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

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

const CreateInvoice = () => {
  // ****** Start Set the input values ******
  const { id: quotationId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(null);
  const [domain, setDomain] = useState("");
  const [designation, setDesignation] = useState("");
  const [entitle, setEntitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [installments, setInstallments] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const labels = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH', 'NINTH', 'TENTH'];




  // *************** Form Validations **************
  const Validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!designation) newErrors.designation = 'Desingnation is required';
    if (!domain) newErrors.domain = 'Research Area / Domain is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!date) newErrors.setDate = 'Current date is required';
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

  // *************** Date Formate ***************
  const handleDateChange = (event, data) => {
    const selectedDate = data.value; // Capturing the selected date
    console.log('Selected date:', selectedDate);
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
 


  // **************** Calculation Events *******************
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



  // ****** Post Data into API ******
  const postData = (e) => {
    e.preventDefault();
    if (Validate()) {
      const formattedDate = formatDate(date);

      if (quotationId) {
        axios.put(`http://localhost:8081/edit/${quotationId}`, {
          name, email, gender, date: formattedDate, designation, domain, entitle, description, price, quantity, total, discount, grandTotal, inputCount,
          installments,
        })
          .then((response) => {
            alert('Quotation updated successfully');
            window.location.href = '/';
          })
          .catch((error) => {
            console.error('Error updating quotation:', error);
            alert('Failed to update quotation');
          });
      }else {
        // Create new quotation
        axios.post(`http://localhost:8081/create`, {
          name, email, gender, date: date, designation, domain, entitle, description, price, quantity, total, discount, grandTotal, inputCount,
          installments,
        })
          .then((response) => {
            alert('Quotation created successfully');
            window.location.href = '/';
          })
          .catch((error) => {
            console.log('Error posting data:', error)
          })
      }
    }
  };



  // **************** Upadate **************
  useEffect(() => {
    if (quotationId) {
      // Fetch the existing data for the quotation
      axios.get(`http://localhost:8081/pdf/${quotationId}`)
        .then((response) => {
          const data = response.data;
          console.log("fatched data:", data)
          setName(data.name || "");
          setEmail(data.email || "");
          setGender(data.gender || "");
          setDate(new Date(data.date));
          setDesignation(data.designation || "");
          setDomain(data.domain || "");
          setEntitle(data.entitle || "");
          setDescription(data.description || "");
          setPrice(data.price || 0);
          setQuantity(data.quantity || 0);
          setTotal(data.total || 0);
          setDiscount(data.discount || 0);
          setGrandTotal(data.grandTotal || 0);
          setInputCount(data.inputCount || 0);
          setInstallments(data.installments || []);
          const rowsData = data.installments.map(installment => ({
            dueWhen: installment.dueWhen,
            installmentAmount: installment.installmentAmount,
          }));
          console.log("Rows Data: ", rowsData);
          setRows(rowsData);
        })
        .catch((error) => console.log('Error fetching data:', error));
    }
  }, [quotationId]);



  return (
    <>
      <div className='container border border-warning rounded p-5'>
        <div className='row'>
          <div className='col-md-12 text-center pb-5'>
            <h2 className='text-warning'>Quotation Manager</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <Form className=''>
              <FormGroup widths='equal'>
                <FormField control={Input} label='Full Name' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} error={errors.name ? { content: errors.name } : null} />
                <FormField control={Input} label='Email' placeholder='joe@schmoe.com' value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email ? { content: errors.email } : null} />
                <FormField control={Select} label={{ children: 'Gender' }} placeholder='Gender' value={gender} options={genderOptions} onChange={(e, { value }) => setGender(value)} error={errors.gender} />
                <SemanticDatepicker control={Date} label='Date' value={date ? new Date(date) : null}  onChange={handleDateChange} error={errors.date ? { content: errors.date, pointing: 'below' } : null} />
              </FormGroup>
              <FormGroup widths='equal'>
                <FormField control={Select} label={{ children: 'Research Area / Domain' }} placeholder='Research Area/Domain' value={domain} options={ResearchDomain} onChange={(e, { value }) => setDomain(value)} error={errors.domain ? { content: errors.domain } : null} />
                <FormField control={Input} label='Designation' placeholder='Designation' value={designation} onChange={(e) => setDesignation(e.target.value)} error={errors.designation ? { content: errors.designation } : null} />
                <FormField control={Input} label='Entitle' placeholder='Entitle' value={entitle} onChange={(e) => setEntitle(e.target.value)} />
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
                    <TableCell><FormField type='text' placeholder='Enter Description' control={Input} value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description ? { content: errors.description } : null} /></TableCell>
                    <TableCell><FormField type='number' placeholder='Enter Price' control={Input} value={price} onChange={handlePrice} error={errors.price ? { content: errors.price } : null} /></TableCell>
                    <TableCell><FormField type='number' placeholder='Enter Price' control={Input} value={quantity} onChange={handleQuantity} error={errors.quantity ? { content: errors.quantity } : null} /></TableCell>
                    <TableCell><FormField placeholder='BasePrice' onChange={(e) => setTotal(e.target.value)} error={errors.total ? { content: errors.total } : null} />{total}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}><p>DISCOUNT:</p></TableCell>
                    <TableCell><FormField placeholder="Enter Descount" control={Input} type='number' value={discount} onChange={handleDiscount} error={errors.discount ? { content: errors.discount } : null} /></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}><p>GRAND TOTAL:</p></TableCell>
                    <TableCell><FormField placeholder="Grand Total" onChange={(e) => setGrandTotal(e.target.value)} error={errors.grandTotal ? { content: errors.grandTotal } : null} />{grandTotal}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}><p>TOTAL INSTALLMENT:</p></TableCell>
                    <TableCell><FormField type="number" control={Input} min="0" max="10" value={inputCount} onChange={handleInputChange} error={errors.inputCount ? { content: errors.inputCount } : null} /></TableCell>
                  </TableRow>

                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell><p>{labels[index]}:</p></TableCell>
                      <TableCell colSpan={2}><FormField name='Installment' control={Input} placeholder='Installment' value={row.dueWhen} onChange={(e) => handleInstallmentChange(index, 'dueWhen', e.target.value)} error={errors.installments ? { content: errors.installments } : null} /></TableCell>
                      <TableCell><FormField name='Total' type='number' control={Input} placeholder='Amount' value={row.installmentAmount} onChange={(e) => handleInstallmentChange(index, 'installmentAmount', e.target.value)} error={errors.installmentAmount ? { content: errors.installmentAmount } : null} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)} error={errors.checkbox ? { content: errors.checkbox } : null} />
              <FormField control={Button} content='Submit' onClick={postData} />
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateInvoice
