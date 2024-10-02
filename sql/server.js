
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})





app.get('/', (req, res) => {
    res.send("Hello")
});
app.get('/test-db-connection', (req, res) => {
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err.message);
            return res.status(500).json({ error: 'Connection failed', details: err.message });
        }
        res.send('Successfully connected to MySQL!');
    });
});

// ************* Get Data *************
// app.get('/', (req, res) => {
//     const sql = `
//         SELECT q.quotation_id, q.name, q.email, q.gender, q.domain, q.date,  q.total, q.totalService, q.inputCount,
//                p.label, p.dueWhen, p.installmentAmount,
//                s.serviceName, s.price, s.discount, s.grandTotal
//         FROM quotation q
//         INNER JOIN services s ON q.quotation_id = s.quotation_id
//         INNER JOIN payments p ON q.quotation_id = p.quotation_id;
//     `;


//     db.query(sql, (err, result) => {
//         if (err) return res.json({ Message: "Error inside server" });

//         const data = {}
//         result.forEach(row => {
//             // If the quotation_id is not already in the data object, create it
//             if (!data[row.quotation_id]) {
//                 data[row.quotation_id] = {
//                     id: row.quotation_id,
//                     name: row.name,
//                     email: row.email,
//                     gender: row.gender,
//                     date: row.date,
//                     domain: row.domain,
//                     total: row.total,
//                     totalService: row.totalService,
//                     inputCount: row.inputCount,
//                     services: [],
//                     installments: [],
//                     totalServices: 0,
//                     totalInstallment: 0
//                 };
//             }

//             // Add the services data to the services array
//             if (row.serviceName && !data[row.quotation_id].services.some(s => s.serviceName === row.serviceName && s.price === row.price)) {
//                 data[row.quotation_id].services.push({
//                     serviceName: row.serviceName,
//                     price: row.price,
//                     discount: row.discount,
//                     grandTotal: row.grandTotal
//                 });
//                 data[row.quotation_id].totalServices++;
//             }

//             // Add the installment data to the installments array
//             if (row.label && !data[row.quotation_id].installments.some(i => i.label === row.label && i.installmentAmount === row.installmentAmount)) {
//                 data[row.quotation_id].installments.push({
//                     label: row.label,
//                     dueWhen: row.dueWhen,
//                     installmentAmount: row.installmentAmount
//                 });
//                 data[row.quotation_id].totalInstallment++;
//             }
//         });

//         // Convert the object into an array if necessary
//         const response = Object.values(data);
//         return res.json(response);
//     });
// });






// ************* Post Data ************
// app.post('/create', (req, res) => {
//     const quotation_sql = "INSERT INTO quotation (`name`, `email`, `gender`, `date`, `domain`, `total`, `totalService`, `inputCount`) VALUES (?)";
//     const quotation_values = [
//         req.body.name,
//         req.body.email,
//         req.body.gender,
//         req.body.date,
//         req.body.domain,
//         req.body.total,
//         req.body.totalService,
//         req.body.inputCount
//     ];

//     db.query(quotation_sql, [quotation_values], (err, result) => {
//         if (err) return res.json(err);

//         const quotationId = result.insertId;
//         const installments = req.body.installments.map(installment => [
//             quotationId,
//             installment.label,
//             installment.dueWhen,
//             installment.installmentAmount
//         ]);

//         const services = req.body.services.map(service => [
//             quotationId,
//             service.service,
//             service.price,
//             service.discount,
//             service.grandTotal
//         ]);

//         const installmentsSql = `INSERT INTO payments 
//         (\`quotation_id\`, \`label\`, \`dueWhen\`, \`installmentAmount\`) 
//         VALUES ?`;

//         const servicesSql = `INSERT INTO services 
//         (\`quotation_id\`, \`serviceName\`, \`price\`, \`discount\`, \`grandTotal\`) 
//         VALUES ?`;

//         db.query(servicesSql, [services], (err, servicesResult) => {
//             if (err) return res.json(err);

//             // Insert into the services table
//             db.query(installmentsSql, [installments], (err, installmentsResult) => {
//                 if (err) return res.json(err);

//                 return res.json({
//                     message: 'Quotation, Installments, and Services added successfully!',
//                     quotationId: quotationId,
//                     servicesResult,
//                     installmentsResult
//                 });
//             });
//         });
//     });
// });

// ********************* Edit Data ****************

// app.put('/edit/:id', async (req, res) => {
//     const quotationId = req.params.id;
//     const { name, email, gender, date, domain, total, totalService, inputCount, services, installments } = req.body;

//     console.log('Received data for update:', req.body);

//     const updateQuotationSql = `
//       UPDATE quotation 
//       SET name = ?, email = ?, gender = ?, date = ?, domain = ?, total = ?, totalService = ?, inputCount = ?
//       WHERE quotation_id = ?
//     `;

//     const quotationValues = [name, email, gender, date, domain, total, totalService, inputCount, quotationId];

//     try {
//         // Update quotation
//         const result = await db.query(updateQuotationSql, quotationValues);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Quotation not found' });
//         }

//         // Delete old services and installments
//         await db.query(`DELETE FROM services WHERE quotation_id = ?`, [quotationId]);
//         await db.query(`DELETE FROM payments WHERE quotation_id = ?`, [quotationId]);

//         // Insert new services
//         const insertServicesSql = `
//             INSERT INTO services (quotation_id, serviceName, price, discount, grandTotal) 
//             VALUES ?
//         `;
//         const serviceData = services.map(service => [
//             quotationId,
//             service.service,
//             service.price,
//             service.discount,
//             service.grandTotal
//         ]);
//         await db.query(insertServicesSql, [serviceData]);

//         // Insert new installments
//         const insertInstallmentsSql = `
//             INSERT INTO payments (quotation_id, label, dueWhen, installmentAmount) 
//             VALUES ?
//         `;
//         const installmentsData = installments.map(installment => [
//             quotationId,
//             installment.label,
//             installment.dueWhen,
//             installment.installmentAmount
//         ]);
//         await db.query(insertInstallmentsSql, [installmentsData]);

//         // Everything was successful
//         return res.json({ message: 'Quotation, services, and installments updated successfully' });

//     } catch (err) {
//         console.error('Error during update:', err);
//         return res.status(500).json({ message: 'Error during update process', error: err });
//     }
// });






// ************** Delete data ***************
// app.delete('/delete/:id', (req, res) => {
//     const quotationId = req.params.id;

//     // SQL query to delete the quotation
//     const deleteQuotationSql = `DELETE FROM quotation WHERE quotation_id = ?`;

//     db.query(deleteQuotationSql, [quotationId], (err, result) => {
//         if (err) {
//             console.error('Error deleting quotation:', err);
//             return res.status(500).json({ message: 'Error deleting quotation', error: err });
//         }

//         // Check if any rows were affected (i.e., if the delete was successful)
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Quotation not found' });
//         }

//         // Delete associated installments
//         const deleteInstallmentsSql = `DELETE FROM payments WHERE quotation_id = ?`;
//         const deleteServicesSql = `DELETE FROM services WHERE quotation_id = ?`;
//         db.query(deleteInstallmentsSql, [quotationId], (err, result) => {
//             if (err) {
//                 console.error('Error deleting installments:', err);
//                 return res.status(500).json({ message: 'Error deleting installments', error: err });
//             }

//             db.query(deleteServicesSql, [quotationId], (err, result) => {
//                 if (err) {
//                     console.error('Error deleting services:', err);
//                     return res.status(500).json({ message: 'Error deleting services', error: err });
//                 }

//                 return res.json({ message: "Quotation, installments, and services deleted successfully" });
//             });
//         });
//     });
// });


// ************* Get Data by Quotation ID *************
// app.get('/pdf/:id', (req, res) => {
//     const quotationId = req.params.id;
//     const sql = `
//          SELECT q.quotation_id, q.name, q.email, q.gender, q.domain, q.date,  q.total, q.totalService, q.inputCount,
//                p.label, p.dueWhen, p.installmentAmount,
//                s.serviceName, s.price, s.discount, s.grandTotal
//         FROM quotation q
//         LEFT JOIN payments p ON q.quotation_id = p.quotation_id
//         LEFT JOIN services s ON q.quotation_id = s.quotation_id
//         WHERE q.quotation_id = ?
//     `;

//     db.query(sql, [quotationId], (err, result) => {
//         if (err) return res.json({ Message: "Error retrieving data" });

//         if (result.length === 0) {
//             return res.json({ Message: "Quotation not found" });
//         }

//         const data = {
//             id: result[0].quotation_id,
//             name: result[0].name,
//             email: result[0].email,
//             gender: result[0].gender,
//             date: result[0].date,
//             domain: result[0].domain,
//             total: result[0].total,
//             inputCount: result[0].inputCount,
//             services: [],
//             installments: [],
//             totalServices: 0,
//             totalInstallment: 0
//         };

//         const addedInstallments = new Set();

//         result.forEach(row => {
//             if (row.serviceName && !addedInstallments.has(row.serviceName)) {
//                 data.services.push({
//                     service: row.serviceName,
//                     price: row.price,
//                     discount: row.discount,
//                     grandTotal: row.grandTotal
//                 });
//                 addedInstallments.add(row.serviceName);
//                 data.totalServices++;
//             }
//             if (row.label && !addedInstallments.has(row.label)) {
//                 data.installments.push({
//                     label: row.label,
//                     dueWhen: row.dueWhen,
//                     installmentAmount: row.installmentAmount
//                 });
//                 addedInstallments.add(row.label);
//                 data.totalInstallment++;
//             }
//         });

//         return res.json(data);
//     });
// });








// *********************************************************************
// const port = process.env.PORT || 8081
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})