import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FormGroup, FormField, Form, Input, Button, Header, Select, Dropdown, TableHeader, TableHeaderCell, TableRow, TableCell, Table, TableBody } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

const genderOptions = [
  { text: 'Male', value: 'male' },
  { text: 'Female', value: 'female' },
  { text: 'Other', value: 'other' },
]
const ResearchDomain = [
  { text: 'Account & Management', value: 'Account & Management' },
  { text: 'Agricultural Science', value: 'Agricultural Science' },
  { text: 'Artificial Intelligence', value: 'Artificial Intelligence' },
  { text: 'Arts & Humanities', value: 'Arts & Humanities' },
  { text: 'Biotechnology', value: 'Biotechnology' },
  { text: 'Botany', value: 'Botany' },
  { text: 'Business & Mangement ', value: 'Business & Mangement ' },
  { text: 'Chemistry', value: 'Chemistry' },
  { text: 'Civil Engineering', value: 'Civil Engineering' },
  { text: 'Computer Science Engineering', value: 'Computer Science Engineering' },
  { text: 'Economics', value: 'Economics' },
  { text: 'Educational Studies', value: 'Educational Studies' },
  { text: 'Electrical Engineering', value: 'Electrical Engineering' },
  { text: 'English Literature', value: 'English Literature' },
  { text: 'Environmental Science', value: 'Environmental Science' },
  { text: 'Finance', value: 'Finance' },
  { text: 'Food & Nutrition Science', value: 'Food & Nutrition Science' },
  { text: 'Health Science', value: 'Health Science' },
  { text: 'Hindi Literature', value: 'Hindi Literature' },
  { text: 'History', value: 'History' },
  { text: 'Law', value: 'Law' },
  { text: 'Life Science', value: 'Life Science' },
  { text: 'Machine Learning', value: 'Machine Learning' },
  { text: 'Mathematics', value: 'Mathematics' },
  { text: 'Mechanical Engineering', value: 'Mechanical Engineering' },
  { text: 'Medical Science', value: 'Medical Science' },
  { text: 'Microbiology', value: 'Microbiology' },
  { text: 'Multidisciplinary Subject', value: 'Multidisciplinary Subject' },
  { text: 'Pharmacy', value: 'Pharmacy' },
  { text: 'Physics', value: 'Physics' },
  { text: 'Physiotherapy', value: 'Physiotherapy' },
  { text: 'Political Science', value: 'Political Science' },
  { text: 'Psychology', value: 'Psychology' },
  { text: 'Social Science', value: 'Social Science' },
  { text: 'Zoology', value: 'Zoology' },
  { text: 'Other', value: 'Other' },
]

const WritingService = [
  { text: "Book Editing", value: "Book Editing" },
  { text: "Book Publishing", value: "Book Publishing" },
  { text: "Book Writing", value: "Book Writing" },
  { text: "Conference Research paper Editing", value: "Conference Research paper Editing" },
  { text: "Conference Research paper writing", value: "Conference Research paper writing" },
  { text: "Conference Review paper Editing", value: "Conference Review paper Editing" },
  { text: "Conference Review paper writing", value: "Conference Review paper writing" },
  { text: "Dissertation Editing", value: "Dissertation Editing" },
  { text: "Dissertation Writing", value: "Dissertation Writing" },
  { text: "Implementation", value: "Implementation" },
  { text: "NAAS Paper Submission", value: "NAAS Paper Submission" },
  { text: "NAAS rating Journal Selection", value: "NAAS rating Journal Selection" },
  { text: "Peer-review Journal Selection", value: "Peer-review Journal Selection" },
  { text: "Peer-Review Paper Submission", value: "BoPeer-Review Paper Submissionok" },
  { text: "Pubmed Journal Selection", value: "Pubmed Journal Selection" },
  { text: "Pubmed Paper Submission", value: "Pubmed Paper Submission" },
  { text: "Research proposal Editing", value: "Research proposal Editing" },
  { text: "Research Proposal Writing", value: "Research Proposal Writing" },
  { text: "Results & Analysis", value: "Results & Analysis" },
  { text: "SCI Research paper Editing", value: "SCI Research paper Editing" },
  { text: "SCI Research paper Writing", value: "SCI Research paper Writing" },
  { text: "SCI Review paper Editing", value: "SCI Review paper Editing" },
  { text: "SCI Review paper Writing", value: "SCI Review paper Writing" },
  { text: "SCI Systematic Review paper Editing", value: "SCI Systematic Review paper Editing" },
  { text: "SCI Systematic Review paper Writing", value: "SCI Systematic Review paper Writing" },
  { text: "Scopus Journal Selection", value: "Scopus Journal Selection" },
  { text: "Scopus Paper Submission", value: "Scopus Paper Submission" },
  { text: "Scopus Research paper Editing", value: "Scopus Research paper Editing" },
  { text: "Scopus Research paper Writing", value: "Scopus Research paper Writing" },
  { text: "Scopus Review paper Editing", value: "Scopus Review paper Editing" },
  { text: "Scopus Review paper Writing", value: "Scopus Review paper Writing" },
  { text: "Scopus Systematic Review paper Editing", value: "Scopus Systematic Review paper Editing" },
  { text: "Scopus Systematic Review paper Writing", value: "Scopus Systematic Review paper Writing" },
  { text: "Synopsis Editing", value: "Synopsis Editing" },
  { text: "Synopsis Writing", value: "Synopsis Writing" },
  { text: "BThesis Editingok", value: "Thesis Editing" },
  { text: "Thesis Writing", value: "Thesis Writing" },
  { text: "UGC Journal Selection", value: "UGC Journal Selection" },
  { text: "UGC Paper Submission", value: "UGC Paper Submission" },
  { text: "UGC Research paper Editing", value: "UGC Research paper Editing" },
  { text: "UGC Research paper Writing", value: "UGC Research paper Writing" },
  { text: "UGC Review paper Editing", value: "UGC Review paper Editing" },
  { text: "UGC Review paper Writing", value: "UGC Review paper Writing" },
  { text: "UGC Systematic Review paper Editing", value: "UGC Systematic Review paper Editing" },
  { text: "UGC Systematic Review paper Writing", value: "UGC Systematic Review paper Writing" },
  { text: "WOS Journal Selection", value: "WOS Journal Selection" },
  { text: "WOS Paper Submission", value: "WOS Paper Submission" },
  { text: "Other", value: "Other" },
];

const discountTypeOptions = [
  { key: 'amount', value: 'amount', text: 'Rs.' },
  { key: 'percentage', value: 'percentage', text: '%' },
];

const CreateInvoice = () => {
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const { id: quotationId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState(null);
  const [domain, setDomain] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false)
  const [customDomain, setCustomDomain] = useState('')
  const [domainOptions, setDomainOptions] = useState(ResearchDomain)
  const [services, setServices] = useState([
    { service: '', price: 0, discount: 0, grandTotal: 0 }
  ])
  const [isCustomService, setIsCustomService] = useState([]);
  const [customService, setCustomService] = useState('');
  const [serviceOptions, setServiceOptions] = useState(WritingService);
  const [totalService, setTotalService] = useState(1);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalDiscountType, setTotalDiscountType] = useState("amount");
  const [finalAmount, setFinalAmount] = useState(0);
  const [discountType, setDiscountType] = useState("amount");
  const [total, setTotal] = useState(0);
  const [installments, setInstallments] = useState([]);
  const [inputCount, setInputCount] = useState(0);

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
        if (!row.dueWhen) { newErrors[`installment_${index}_dueWhen`] = `Installment ${index + 1} due date is required`; }
        if (!row.installmentAmount) { newErrors[`installment_${index}_installmentAmount`] = `Installment ${index + 1} amount is required`; }
      });
    }

    setErrors(newErrors);
    console.log(newErrors)
    return Object.keys(newErrors).length === 0;
  }

  // *************** Date Formate ***************
  const handleDateChange = (event, data) => {
    const selectedDate = data.value;
    const formattedDate = formatDate(selectedDate);
    setDate(formattedDate);
  };
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };


  // ********** Handle Domain Change *******************
  const handleDomainChange = (e, { value }) => {
    if (value === 'Other') {
      setIsCustomDomain(true);
      setTimeout(() => document.getElementById('customDomainInput')?.focus(), 0);
    } else {
      setDomain(value);
      setIsCustomDomain(false);
    }
  };
  const handleAddCustomDomain = () => {
    if (customDomain.trim()) {
      const newOption = { text: customDomain, value: customDomain.toLowerCase() };
      setDomainOptions([...domainOptions, newOption]);
      setDomain(customDomain.toLowerCase());
      setCustomDomain('');
      setIsCustomDomain(false);
    }
  };

  //  ******* Handle Writing Service Change for each row *******
  const handleServiceChange = (index, value) => {
    if (value === 'Other') {
      const newIsCustomService = [...isCustomService];
      newIsCustomService[index] = true;
      setIsCustomService(newIsCustomService);
      setTimeout(() => document.getElementById(`customServiceInput_${index}`)?.focus(), 0);
    } else {
      const updatedServices = services.map((service, i) =>
        i === index ? { ...service, service: value, price: service.price || 0 } : service
      );
      setServices(updatedServices);
      const newIsCustomService = [...isCustomService];
      newIsCustomService[index] = false;
      setIsCustomService(newIsCustomService);
    }
  };
  // ************* Handle CustomeService Add Option **************
  const handleAddCustomService = (index) => {
    if (customService.trim()) {
      const newOption = { text: customService, value: customService.toLowerCase() };
      setServiceOptions([...serviceOptions, newOption]);

      const updatedServices = services.map((service, i) =>
        i === index ? { ...service, service: customService, price: 0 } : service
      );
      setServices(updatedServices);

      setCustomService('');

      const newIsCustomService = [...isCustomService];
      newIsCustomService[index] = false;
      setIsCustomService(newIsCustomService);
    }
  };
  // **************** Add Service ************
  const addService = () => {
    setServices([...services, { service: '', price: 0, discount: 0, grandTotal: 0 }]);
    setIsCustomService([...isCustomService, false]);
  }
  const removeService = (index) => {
    setServices(services.filter((_, i) => i !== index));
    setIsCustomService(isCustomService.filter((_, i) => i !== index));
  }


  // ******************* Discount Calculation for each service ************
  const handleDiscount = (index, value) => {
    const discountValue = value === '' ? 0 : parseFloat(value);
    let updatedRow = [];

    if (discountType === 'percentage') {
      updatedRow = services.map((row, i) =>
        i === index
          ? { ...row, discount: discountValue, grandTotal: row.price - (row.price * discountValue) / 100 }
          : row
      );
    } else {
      updatedRow = services.map((row, i) =>
        i === index ? { ...row, discount: discountValue, grandTotal: row.price - discountValue } : row
      );
    }
    setServices(updatedRow);
  };



  const totalAmount = () => {
    return services.reduce((total, row) => total + row.grandTotal, 0)
  }


  // ***** Start Row Increament on change the Total Installment ******
  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setInputCount(value);
      const amount = finalAmount > 0 ? finalAmount : totalAmount();
      const installmentValue = Math.floor(amount / value / 100) * 100;
      const remainder = amount - (installmentValue * value);
      const updatedRows = Array(value).fill('').map((_, index) => ({
        label: labels[index],
        dueWhen: index === 0 ? 'On Advance' : '',
        installmentAmount: index === 0 ? installmentValue + remainder : installmentValue,
      }));

      setRows(updatedRows);
    } else {
      setInputCount(0);
      setRows([]);
    }
  };

  const handleInstallmentChange = (index, field, value) => {
    const updatedRows = [...rows];
    const updatedInstallments = [...installments];

    if (!updatedRows[index]) { updatedRows[index] = { label: labels[index] }; }
    if (!updatedRows[index]) { updatedRows[index] = {} }

    updatedRows[index][field] = value;
    setRows(updatedRows);
    if (!updatedInstallments[index]) { updatedInstallments[index] = { label: labels[index] }; }
    if (!updatedInstallments[index]) { updatedInstallments[index] = {}; }
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
    const calculatedFinalAmount = totalAmount() - (totalDiscountType === 'percentage' ? (totalAmount() * totalDiscount) / 100 : totalDiscount);
    setFinalAmount(calculatedFinalAmount);

    console.log("Calculated Final Amount before sending:", calculatedFinalAmount);

    // Validate input data
    if (Validate()) {
      console.log("Final rows before submission:", rows);
      const formattedDate = formatDate(date);

      try {
        const payload = {
          name,
          email,
          gender,
          date: formattedDate,
          domain,
          total: totalAmount(),
          totalDiscount,
          finalAmount: calculatedFinalAmount,
          totalService,
          inputCount,
          services,
          installments: rows,
        };
        console.log("posted data:", payload);
        // Check if we're updating an existing quotation
        if (quotationId) {
          const response = await axios.put(`https://backend-three-xi-82.vercel.app/update/${quotationId}`, payload);
          alert('Quotation updated successfully');
          window.location.href = '/';
        } else {
          console.log("Final Amount before sending:", finalAmount);
          const response = await axios.post(`https://backend-three-xi-82.vercel.app/create`, payload);
          console.log("Final Amount before sending:", finalAmount);
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
      axios.get(`https://backend-three-xi-82.vercel.app/pdf/${quotationId}`)
        .then((response) => {
          const data = response.data;

          // Set basic fields
          setName(data.name || "");
          setEmail(data.email || "");
          setGender(data.gender || "");
          setDate(new Date(data.date));

          // Set domain, including custom domain handling
          if (data.domain === 'Other') {
            setDomain('Other');
            setIsCustomDomain(true);  // Show custom domain input
            setCustomDomain(data.customDomain || ""); // Set custom domain value from API if available
          } else {
            setDomain(data.domain || "");
            setIsCustomDomain(false);  // Hide custom domain input if not 'Other'
            setCustomDomain("");  // Clear any previous custom domain
          }

          setTotal(data.total || 0);
          setTotalDiscount(data.totalDiscount || 0);
          setTotalService(data.totalService || 0);

          const finalTotal = data.totalDiscount === 0 ? data.total : data.finalAmount || 0;
          setFinalAmount(finalTotal);

          // Map services, handling custom services as needed
          const serviceData = data.services.map(service => {
            if (service.service === 'Other') {
              setCustomService(service.customService || ''); // Set custom service from API if available
              return { ...service, service: 'Other' };
            }
            return service;
          });

          setServices(serviceData);

          // Set the isCustomService array to reflect custom services in fetched data
          const customServiceFlags = serviceData.map(service => service.service === 'Other');
          setIsCustomService(customServiceFlags);

          const rowsData = data.installments.map(installment => ({
            label: installment.label,
            dueWhen: installment.dueWhen,
            installmentAmount: installment.installmentAmount,
          }));

          setRows(rowsData);
          console.log("Received data:", data);
        })
        .catch((error) => console.log('Error fetching data:', error));
    }
  }, [quotationId]);

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center pb-5'>
            <Header as='h1' style={{ color: '#443F11' }}>Quotation Manager</Header>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 border rounded p-5 ui blue'>
            <Form className=''>
              <FormGroup widths='equal'>
                <FormField control={Input} label='Full Name' placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} error={errors.name ? { content: errors.name } : null} />
                <FormField control={Input} label='Email' placeholder='joe@schmoe.com' value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email ? { content: errors.email } : null} />
                <FormField control={Select} label={{ children: 'Gender' }} placeholder='Gender' value={gender} options={genderOptions} onChange={(e, { value }) => setGender(value)} error={errors.gender} />
              </FormGroup>

              <FormGroup widths='equal'>
                <SemanticDatepicker control={Date} label='Date' value={date ? new Date(date) : null} onChange={handleDateChange} error={errors.date ? { content: errors.date } : null} />
                <FormField
                  control={Select}
                  label={{ children: 'Research Area / Domain' }}
                  placeholder='Research Area/Domain'
                  value={domain}
                  search
                  clearable
                  options={domainOptions}
                  onChange={handleDomainChange}
                  error={errors.domain ? { content: errors.domain } : null} />
                {isCustomDomain && (
                  <FormField
                    control={Input}
                    id="customDomainInput"
                    label={{ children: 'Custom Domain' }}
                    placeholder="Enter custom domain"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    action={{
                      color: 'blue',
                      icon: 'plus',
                      onClick: handleAddCustomDomain,
                    }}
                  />
                )}
              </FormGroup>

              <Table celled padded className='service-table'>
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
                      <TableCell>
                        <FormField>
                          <Dropdown
                            placeholder="Services"
                            name="services"
                            fluid
                            selection
                            search
                            clearable
                            options={serviceOptions}
                            value={row.service}
                            onChange={(e, { value }) => handleServiceChange(index, value)}
                            error={errors[`service_${index}`] ? { content: errors[`service_${index}`] } : null} />
                        </FormField>
                        {isCustomService[index] && (
                          <FormField
                            control={Input}
                            id={`customServiceInput_${index}`}
                            width="75%"
                            placeholder="Add"
                            value={customService}
                            onChange={(e) => setCustomService(e.target.value)}
                            action={{
                              color: 'blue',
                              icon: 'plus',
                              onClick: () => handleAddCustomService(index),
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={Input}
                          name="Price"
                          placeholder="Price"
                          value={row.price}
                          onChange={(e) => {
                            const priceValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
                            const updatedServices = services.map((serviceRow, i) =>
                              i === index ? { ...serviceRow, price: priceValue, grandTotal: priceValue - (serviceRow.discount || 0) } : serviceRow
                            );
                            setServices(updatedServices);
                          }} error={errors[`price_${index}`] ? { content: errors[`price_${index}`] } : null}
                        /></TableCell>
                      <TableCell>
                        <FormField className='d-flex'>
                          <Select options={discountTypeOptions} name="discountType" value={discountType} onChange={(e, { value }) => setDiscountType(value)} style={{ minWidth: '2em' }} />
                          <Input placeholder="Discount" name="discount" value={row.discount} onChange={(e) => handleDiscount(index, e.target.value)} />
                        </FormField>
                      </TableCell>
                      <TableCell width={2}><FormField control={Input} name="grandTotal" placeholder="Grand Total" value={row.grandTotal || ''} error={errors.grandTotal ? { content: errors.grandTotal } : null} /></TableCell>
                      <TableCell><Button className='ui red button w-100' onClick={() => removeService(index)} >Delete Row</Button></TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan="4">ADD SERVICE:</TableCell>
                    <TableCell className='border'><Button className='ui green button w-100' onClick={addService}>Add Service</Button></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan="4">TOTAL:</TableCell>
                    <TableCell><FormField control={Input} name="totalAmount" value={totalAmount()} /></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4}><p>TOTAL INSTALLMENT:</p></TableCell>
                    <TableCell><FormField type="number" name="totalInstallments" control={Input} min="0" max="10" value={inputCount} onChange={handleInputChange} error={errors.inputCount ? { content: errors.inputCount } : null} /></TableCell>
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

              <center> <Button className='button w-75 text-large pt-3 pb-3 shadow' style={{ backgroundColor: '#443F11', color: 'white', fontSize: '20px' }} onClick={postData}>Submit</Button></center>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateInvoice
