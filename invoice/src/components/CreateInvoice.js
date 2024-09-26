import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FormGroup, FormField, Form, Input, Button, Select, Dropdown, Icon, TableHeader, TableHeaderCell, TableRow, TableCell, Table, TableBody } from 'semantic-ui-react';
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


const WritingService = [
  { text: "Research Paper", value: "Research Paper", price: 100000 },
  { text: "Thesis", value: "Thesis", price: 300 },
  { text: "Research Proposal", value: "Research Proposal", price: 200 },
  { text: "Book", value: "Book", price: 150 },
];

const CreateInvoice = () => {
  const { id: quotationId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(null);
  const [domain, setDomain] = useState("");
  const [selectService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [installments, setInstallments] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [addNumberOfService, setAddNumberOfService] = useState([
    { service: '', price: 0, discount: 0, grandTotal: 0 }
  ])
  const labels = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH', 'NINTH', 'TENTH'];




  // *************** Form Validations **************
  const Validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!description) newErrors.description = 'Description is required';
    if (!selectService) newErrors.selectService = 'Service is required';
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
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };





  // ******************* Discount Calculation ************
  const handleDiscount = (index, value) => {
    const discountValue = value === '' ? 0 : parseInt(value);
    const updatedRow = addNumberOfService.map((row, i) =>
      i === index ? { ...row, discount: discountValue, grandTotal: row.price - discountValue } : row
    )
    setAddNumberOfService(updatedRow)
    setGrandTotal(price - discountValue);
  }

  // ****************** Total of grandtotals *****************
  const totalAmount = () => {
    return addNumberOfService.reduce((total, row)=> total + row.grandTotal, 0)
  }

  //  *************** Handle Writing Service Change for each row ***************
  const handleServiceChange = (index, value) => {
    const selected = WritingService.find((service) => service.value === value);
    const updatedRow = addNumberOfService.map((row, i) =>
      i === index ? { ...row, service: value, price: selected ? selected.price : 0, grandTotal: selected ? selected.price - (row.discount || 0) : 0 } : row)
    setAddNumberOfService(updatedRow)
  }
  // **************** Add Service ************
  const addService = () => {
    setAddNumberOfService([...addNumberOfService, { service: '', price: 0, discount: 0, grandTotal: 0 }]);
  }
  const removeService = (index) => {
    setAddNumberOfService(addNumberOfService.filter((_, i) => i !== index));
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
    const updatedRows = [...rows]; // Clone the current rows state
    const updatedInstallments = [...installments]; // Clone the current installments state

    // Ensure the row exists before updating
    if (!updatedRows[index]) {
      updatedRows[index] = { label: labels[index] };
    }

    // Update the field in the row
    updatedRows[index][field] = value;

    // Ensure the installment exists before updating
    if (!updatedInstallments[index]) {
      updatedInstallments[index] = { label: labels[index] };
    }

    // Update the field in the corresponding installment
    updatedInstallments[index][field] = value;

    // Update state with the modified rows and installments
    setRows(updatedRows);
    setInstallments(updatedInstallments);
  };




  // ****** Post Data into API ******
  const postData = (e) => {
    e.preventDefault();
    if (Validate()) {
      const formattedDate = formatDate(date);

      if (quotationId) {
        axios.put(`http://localhost:8081/edit/${quotationId}`, {
          name, email, gender, date: formattedDate, domain, description, price, quantity, total, discount, grandTotal, inputCount,
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
      } else {
        // Create new quotation
        axios.post(`http://localhost:8081/create`, {
          name, email, gender, date: date, domain, description, price, quantity, total, discount, grandTotal, inputCount,
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
          setDomain(data.domain || "");
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
              </FormGroup>
              <FormGroup widths='equal'>
                <SemanticDatepicker control={Date} label='Date' value={date ? new Date(date) : null} onChange={handleDateChange} error={errors.date ? { content: errors.date, pointing: 'below' } : null} />
                <FormField control={Select} label={{ children: 'Research Area / Domain' }} placeholder='Research Area/Domain' value={domain} options={ResearchDomain} onChange={(e, { value }) => setDomain(value)} error={errors.domain ? { content: errors.domain } : null} />
              </FormGroup>
              <Table celled padded>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell singleLine>DESCRIPTION</TableHeaderCell>
                    <TableHeaderCell>PRICE</TableHeaderCell>
                    <TableHeaderCell>DISCOUNT</TableHeaderCell>
                    <TableHeaderCell>GRAND TOTAL</TableHeaderCell>
                    <TableHeaderCell>Delete</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>

                  {addNumberOfService.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell><FormField><Dropdown placeholder="Select a service" fluid selection options={WritingService} value={row.service} onChange={(e, { value }) => handleServiceChange(index, value)} /></FormField></TableCell>
                      <TableCell><FormField control={Input} placeholder="Price" value={row.price ? `${row.price}` : ""} /></TableCell>
                      <TableCell><FormField placeholder="Enter Descount" control={Input} type='number' value={row.discount} onChange={(e, { value }) => handleDiscount(index, e.target.value)} error={errors.discount ? { content: errors.discount } : null} /></TableCell>
                      <TableCell><FormField placeholder="Grand Total" onChange={(e) => setGrandTotal(e.target.value)} error={errors.grandTotal ? { content: errors.grandTotal } : null} />{row.grandTotal}</TableCell>
                      <TableCell><Icon className="trash text-danger" size="large" style={{cursor: "pointer"}} onClick={() => removeService(index)} /></TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan="4">ADD SERVICE:</TableCell>
                    <TableCell className='text-right border'><Button className='btn' onClick={addService}>Add Service</Button></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan="3">TOTAL:</TableCell>
                    <TableCell><FormField control={Input} value={totalAmount()} /></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={3}><p>TOTAL INSTALLMENT:</p></TableCell>
                    <TableCell><FormField type="number" control={Input} min="0" max="10" value={inputCount} onChange={handleInputChange} error={errors.inputCount ? { content: errors.inputCount } : null} /></TableCell>
                  </TableRow>

                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell><p>{labels[index]}:</p></TableCell>
                      <TableCell colSpan={2}><FormField name='Installment' control={Input} placeholder='Installment' value={row.dueWhen || ''} onChange={(e) => handleInstallmentChange(index, 'dueWhen', e.target.value)} error={errors.installments ? { content: errors.installments } : null} /></TableCell>
                      <TableCell><FormField name='Total' type='number' control={Input} placeholder='Amount' value={row.installmentAmount || ''} onChange={(e) => handleInstallmentChange(index, 'installmentAmount', e.target.value)} error={errors.installmentAmount ? { content: errors.installmentAmount } : null} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <FormField control={Button} content='Submit' onClick={postData} />
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateInvoice
