import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FormGroup, FormField, Form, Input, Button, Header, Select, Dropdown, Icon, TableHeader, TableHeaderCell, TableRow, TableCell, Table, TableBody, Checkbox } from 'semantic-ui-react';
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
  { text: "Thesis", value: "Thesis", price: 150000 },
  { text: "Research Proposal", value: "Research Proposal", price: 50000 },
  { text: "Book", value: "Book", price: 80000 },
];

const discountTypeOptions = [
  { key: 'amount', value: 'amount', text: 'Rs.' },
  { key: 'percentage', value: 'percentage', text: '%' },
];

const CreateInvoice = () => {
  const { id: quotationId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(null);
  const [domain, setDomain] = useState("");
  const [total, setTotal] = useState(0);
  const [installments, setInstallments] = useState([]);
  const [inputCount, setInputCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("amount");
  const [finalAmount, setFinalAmount] = useState(0);
  const [totalDiscountType, setTotalDiscountType] = useState("amount");
  const [show, hide] = useState(true)
  const [services, setServices] = useState([
    { service: '', price: 0, discount: 0, grandTotal: 0 }
  ])
  const [totalService, setTotalService] = useState(1)
  const labels = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH', 'EIGHTH', 'NINTH', 'TENTH'];




  // *************** Form Validations **************
  const Validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) { newErrors.email = 'Email is required'; }
    else if (!/\S+@\S+\.\S+/.test(email)) { newErrors.email = 'Email is invalid'; }
    if (!gender) newErrors.gender = 'Gender is required';
    if (!date) newErrors.date = 'Date is required';
    if (!domain) newErrors.domain = 'Research Area / Domain is required';
    if (!inputCount) newErrors.inputCount = 'At least 1 installment is required';

    services.forEach((service, index) => {
      if (!service.service) newErrors[`service_${index}`] = 'Service is required';
      if (!service.price && service.price !== 0) newErrors[`price_${index}`] = 'Price is required';
      if (!service.grandTotal && service.grandTotal !== 0) newErrors[`grandTotal_${index}`] = 'Grand Total is required';
    });

    if (inputCount > 0) {
      rows.forEach((row, index) => {
        if (!row.dueWhen) {
          newErrors[`installment_${index}_dueWhen`] = `Installment ${index + 1} due date is required`;
        }
        if (!row.installmentAmount) {
          newErrors[`installment_${index}_installmentAmount`] = `Installment ${index + 1} amount is required`;
        }
      });
    }

    setErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  // *************** Date Formate ***************
  const handleDateChange = (event, data) => {
    const selectedDate = data.value; // Capturing the selected date
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



  // ******************* Show or Hide Discount **********
  const changeIcon = () => {
    if (show == true) { hide(false) }
    else (hide(true))
  }

  // ******************* Discount Calculation for each service ************
  const handleDiscount = (index, value) => {
    const discountValue = value === '' ? 0 : parseFloat(value);
    let updatedRow = [];

    if (discountType === 'percentage') {
      // If discount is percentage, calculate n% of price
      updatedRow = services.map((row, i) =>
        i === index
          ? { ...row, discount: discountValue, grandTotal: row.price - (row.price * discountValue) / 100 }
          : row
      );
    } else {
      // If discount is amount, directly subtract the discount from price
      updatedRow = services.map((row, i) =>
        i === index ? { ...row, discount: discountValue, grandTotal: row.price - discountValue } : row
      );
    }

    setServices(updatedRow);
  };

  // ***************** Handle Total Discount for total Amount *****************
  const handleTotalDiscount = (value) => {
    const discountValue = value === '' ? 0 : parseFloat(value);

    // Calculate total discount based on the selected total discount type (amount or percentage)
    let discountAmount = 0;
    const total = totalAmount();

    if (totalDiscountType === 'percentage') {
      discountAmount = (total * discountValue) / 100; // Calculate percentage discount
    } else {
      discountAmount = discountValue; // Flat discount amount
    }

    const finalTotal = total - discountAmount; // Deduct discount from the total amount
    setFinalAmount(finalTotal < 0 ? 0 : finalTotal); // Ensure finalAmount doesn't go below 0
    setTotalDiscount(discountValue);
  };
  // ****************** Total of grandtotals *****************
  const totalAmount = () => {
    return services.reduce((total, row) => total + row.grandTotal, 0)
  }

  //  *************** Handle Writing Service Change for each row ***************
  const handleServiceChange = (index, value) => {
    const selected = WritingService.find((service) => service.value === value);
    const updatedRow = services.map((row, i) =>
      i === index ? { ...row, service: value, price: selected ? selected.price : 0, grandTotal: selected ? selected.price - (row.discount || 0) : 0 } : row)
    setServices(updatedRow)
  }
  // **************** Add Service ************
  const addService = () => {
    setServices([...services, { service: '', price: 0, discount: 0, grandTotal: 0 }]);
    setTotalService(totalService + 1);
  }
  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
    setTotalService(totalService - 1);
  }






  // ************** Start Row Increament on change the Total Installment ****************
  // const handleInputChange = (event) => {
  //   const value = parseInt(event.target.value, 10);
  //   if (!isNaN(value)) {
  //     setInputCount(value);

  //     const total = totalAmount(); // Get the total amount from services
  //     const installmentValue = Math.floor(total / value / 100) * 100; // Calculate each installment rounded to the nearest 100
  //     const remainder = total - (installmentValue * value); // Calculate any remaining amount after rounding

  //     // Distribute the remainder to the first installment
  //     const updatedRows = Array(value).fill('').map((_, index) => ({
  //       label: labels[index],
  //       dueWhen: index === 0 ? 'On Advance' : '',
  //       installmentAmount: index === 0 ? installmentValue + remainder : installmentValue, // Add remainder to first installment
  //     }));
  //     // setRows(Array(value).fill(''));
  //     setRows(updatedRows)
  //   } else {
  //     setInputCount(0);
  //     setRows([]);
  //   }
  // };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10); // Number of installments
    if (!isNaN(value)) {
      setInputCount(value);
  
      // Determine which amount to use: finalAmount or totalAmount
      const amount = finalAmount > 0 ? finalAmount : totalAmount(); 
  
      // Calculate the installment amount
      const installmentValue = Math.floor(amount / value / 100) * 100; // Round to nearest 100
      const remainder = amount - (installmentValue * value); // Calculate remaining amount
  
      // Distribute the remainder to the first installment
      const updatedRows = Array(value).fill('').map((_, index) => ({
        label: labels[index],
        dueWhen: index === 0 ? 'On Advance' : '',
        installmentAmount: index === 0 ? installmentValue + remainder : installmentValue, // Add remainder to first installment
      }));
  
      setRows(updatedRows); // Set rows to the calculated values
    } else {
      setInputCount(0);
      setRows([]); // Reset if invalid input
    }
  };
  



  const handleInstallmentChange = (index, field, value) => {
    const updatedRows = [...rows]; // Clone the current rows state
    const updatedInstallments = [...installments]; // Clone the current installments state
    const updatedErrors = { ...errors };

    // Ensure the row exists before updating
    if (!updatedRows[index]) {
      updatedRows[index] = { label: labels[index] };
    }
    if (!updatedRows[index]) {
      updatedRows[index] = {}
    }

    // Update the field in the row
    updatedRows[index][field] = value;
    setRows(updatedRows);

    // Ensure the installment exists before updating
    if (!updatedInstallments[index]) {
      updatedInstallments[index] = { label: labels[index] };
    }

    if (!updatedInstallments[index]) {
      updatedInstallments[index] = {};
    }
    // Update the field in the corresponding installment
    updatedInstallments[index][field] = value;
    setInstallments(updatedInstallments);
  };



  // **************** Add Installments **************

  const removeInstallment = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    const updatedInstallments = installments.filter((_, i) => i !== index);

    setRows(updatedRows);
    setInstallments(updatedInstallments);
    setInputCount(inputCount - 1);
  };



  
  const postData = async (e) => {
    e.preventDefault();
  
    // Validate input data
    if (Validate()) {
      // Ensure that all rows have correct data
      console.log("Final rows before submission:", rows);
      
      // Format the date before sending
      const formattedDate = formatDate(date);
  
      try {
        const payload = {
          name,
          email,
          gender,
          date: formattedDate,
          domain,
          total: totalAmount(),
          totalService,
          inputCount,
          services,
          installments: rows,  // Send the rows data containing installments
        };
  
        // Check if we're updating an existing quotation
        if (quotationId) {
          const response = await axios.put(`http://localhost:8081/update/${quotationId}`, payload);
          alert('Quotation updated successfully');
          window.location.href = '/';
        } else {
          const response = await axios.post(`http://localhost:8081/create`, payload);
          alert('Quotation created successfully');
          window.location.href = '/';
        }
      } catch (error) {
        console.error('Error during API request:', error);
        alert('Failed to update or create quotation');
      }
    }
  };
  
 
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
          setTotal(data.total || 0);
          setServices(data.services || []);
          setInstallments(data.installments || []);
          setInputCount(data.inputCount || 0);
          setTotalService(data.totalService || 0);

          const serviceData = data.services.map(service => ({
            serviceName: service.service,
            price: service.price,
            discount: service.discount,
            grandTotal: service.grandTotal,
          }));
          const rowsData = data.installments.map(installment => ({
            dueWhen: installment.dueWhen,
            installmentAmount: installment.installmentAmount,
          }));
          console.log("service Data: ", serviceData)
          setRows(rowsData, serviceData);
        })
        .catch((error) => console.log('Error fetching data:', error));
    }
  }, [quotationId]);


  return (
    <>
      <div className='container border rounded p-5 ui blue'>
        <div className='row'>
          <div className='col-md-12 text-center pb-5'>
            <Header as='h1' color='blue'>Quotation Manager</Header>
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
                <SemanticDatepicker control={Date} label='Date' value={date ? new Date(date) : null} onChange={handleDateChange} error={errors.date ? { content: errors.date } : null} />
                <FormField control={Select} label={{ children: 'Research Area / Domain' }} placeholder='Research Area/Domain' value={domain} options={ResearchDomain} onChange={(e, { value }) => setDomain(value)} error={errors.domain ? { content: errors.domain } : null} />
              </FormGroup>
              <Table celled padded>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell singleLine>SERVICES</TableHeaderCell>
                    <TableHeaderCell>PRICE</TableHeaderCell>
                    <TableHeaderCell>DISCOUNT</TableHeaderCell>
                    <TableHeaderCell>GRAND TOTAL</TableHeaderCell>
                    <TableHeaderCell>Delete</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>

                  {services.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell width={10}><FormField><Dropdown placeholder="Services" fluid selection options={WritingService} value={row.service} onChange={(e, { value }) => handleServiceChange(index, value)} error={errors.domain ? { content: errors.domain } : null} /></FormField></TableCell>
                      <TableCell><FormField control={Input} placeholder="Price" value={row.price ? `${row.price}` : ""} error={errors.price ? { content: errors.price } : null} /></TableCell>
                      <TableCell>
                        <FormField className='d-flex'>
                          <Select options={discountTypeOptions} value={discountType} onChange={(e, { value }) => setDiscountType(value)} style={{ minWidth: '5em' }} />
                          <Input placeholder="Discount" value={row.discount} onChange={(e) => handleDiscount(index, e.target.value)} />
                        </FormField>
                      </TableCell>
                      <TableCell><FormField control={Input} placeholder="Grand Total" value={row.grandTotal ? `${row.grandTotal}` : ""} error={errors.grandTotal ? { content: errors.grandTotal } : null} /></TableCell>
                      <TableCell><Button className='ui red button w-100' onClick={() => removeService(index)} >Delete Row</Button></TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan="4">ADD SERVICE:</TableCell>
                    <TableCell className='border'><Button className='ui green button w-100' onClick={addService}>Add Service</Button></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan="4">TOTAL:</TableCell>
                    <TableCell><FormField control={Input} value={totalAmount()} /></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan="5"> <Checkbox label='Do you want to provide discount on total amount ?' onClick={changeIcon} /></TableCell>
                  </TableRow>


                  {show ?
                    (console.log('notjhing')) : (
                      <>
                        <TableRow>
                          <TableCell colSpan="4">DISCOUNT:</TableCell>
                          <TableCell>
                            <FormField className='d-flex'>
                              <Select options={discountTypeOptions} value={totalDiscountType} onChange={(e, { value }) => setTotalDiscountType(value)} style={{ minWidth: '5em' }} />
                              <Input placeholder="Discount" value={totalDiscount} onChange={(e) => handleTotalDiscount(e.target.value)} />
                            </FormField>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell colSpan="4">AMOUNT TO BE PAID:</TableCell>
                          <TableCell><FormField>
                            <Input value={finalAmount} readOnly />
                          </FormField></TableCell>
                        </TableRow></>
                    )
                  }

                  <TableRow>
                    <TableCell colSpan={4}><p>TOTAL INSTALLMENT:</p></TableCell>
                    <TableCell><FormField type="number" control={Input} min="0" max="10" value={inputCount} onChange={handleInputChange} error={errors.inputCount ? { content: errors.inputCount } : null} /></TableCell> {/* <TableCell className='text-right border'><Button className='btn' onClick={addInsallments} onChange={handleInputChange} >Add Service</Button></TableCell> */}
                  </TableRow>

                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell><p>{labels[index]}:</p></TableCell>
                      <TableCell colSpan={2}><FormField name='Installment' control={Input} placeholder='Installment' value={row.dueWhen || ''} onChange={(e) => handleInstallmentChange(index, 'dueWhen', e.target.value)} /></TableCell>
                      <TableCell><FormField name='Total' type='number' control={Input} placeholder='Amount' value={row.installmentAmount || ''} onChange={(e) => handleInstallmentChange(index, 'installmentAmount', parseFloat(e.target.value))} /></TableCell>
                      <TableCell><Button className='ui red button w-100' onClick={() => removeInstallment(index)}>Delete Row</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <center> <Button className='ui blue button w-75 text-large' onClick={postData}>Submit</Button></center>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateInvoice
