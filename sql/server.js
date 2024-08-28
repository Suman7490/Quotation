import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "KRW"
})
// ************* Get Data *************
app.get('/', (req, res) => {
    const sql = `
        SELECT q.quotation_id, q.name, q.email, q.gender, q.designation, q.domain, q.description, 
               q.price, q.quantity, q.current_date, q.entitle, q.total, q.discount, q.grand_total, q.input_count,
               p.label, p.due_when AS 'when', p.installment_amount
        FROM quotation q
        INNER JOIN payments p ON q.quotation_id = p.quotation_id
    `;



    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        const data = {}
        result.forEach(row => {
            // If the quotation_id is not already in the data object, create it
            if (!data[row.quotation_id]) {
                data[row.quotation_id] = {
                    id: row.quotation_id,
                    name: row.name,
                    email: row.email,
                    gender: row.gender,
                    date: row.current_date,
                    designation: row.designation,
                    domain: row.domain,
                    entitle: row.entitle,
                    description: row.description,
                    totalInstallment: 0,
                    price: row.price,
                    quantity: row.quantity,
                    total: row.total,
                    discount: row.discount,
                    grandTotal: row.grand_total,
                    inputCount: row.input_count,
                    installments: []
                };
            }

            // Add the installment data to the installments array
            if (row.label) {
                data[row.quotation_id].installments.push({
                    label: row.label,
                    when: row.when,
                    installmentAmount: row.installment_amount
                });
                data[row.quotation_id].totalInstallment++;
            }
        });

        // Convert the object into an array if necessary
        const response = Object.values(data);
        return res.json(response);
    });
});


// ************* Post Data ************







app.post('/create', (req, res) => {
    const quotation_sql = "INSERT INTO quotation (`name`, `email`, `gender`, `current_date`, `designation`, `domain`, `entitle`, `description`, `price`, `quantity`, `total`, `discount`, `grand_total`, `input_count`) VALUES (?)";
    const quotation_values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.date,
        req.body.designation,
        req.body.domain,
        req.body.entitle,
        req.body.description,
        req.body.price,
        req.body.quantity,
        req.body.total,
        req.body.discount,
        req.body.grandTotal,
        req.body.inputCount
    ];

    db.query(quotation_sql, [quotation_values], (err, result) => {
        if (err) return res.json(err);

        const quotationId = result.insertId;
        const installments = req.body.installments.map(installment => [
            quotationId,
            installment.label,
            installment.dueWhen,
            installment.installmentAmount
        ]);

        const installmentsSql = `INSERT INTO payments 
        (\`quotation_id\`, \`label\`, \`due_when\`, \`installment_amount\`) 
        VALUES ?`;

        db.query(installmentsSql, [installments], (err, result) => {
            if (err) return res.json(err);

            return res.json(result);
        });
    });
});

// ********************* Edit Data ****************
app.put('/edit/:id', (req, res) => {
    const quotationId = req.params.id;

    const updateQuotationSql = `
        UPDATE quotation 
        SET name = ?, email = ?, gender = ?, current_date = ?, designation = ?, domain = ?, 
            entitle = ?, description = ?, price = ?, quantity = ?, total = ?, discount = ?, 
            grand_total = ?, input_count = ?
        WHERE quotation_id = ?
    `;

    const quotationValues = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.date,
        req.body.designation,
        req.body.domain,
        req.body.entitle,
        req.body.description,
        req.body.price,
        req.body.quantity,
        req.body.total,
        req.body.discount,
        req.body.grandTotal,
        req.body.inputCount,
        quotationId
    ];

    db.query(updateQuotationSql, quotationValues, (err, result) => {
        if (err) {
            console.error('Error updating quotation:', err);
            return res.status(500).json({ message: 'Error updating quotation', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Quotation not found' });
        }


        const updatePaymentsSql = `
        UPDATE payments
        SET label = ?, due_when = ?, installment_amount = ?
        WHERE quotation_id = ? AND payment_id = ?;
    `;

        const installments = req.body.installments.map(installment => [
            installment.label,
            installment.dueWhen,
            installment.installmentAmount,
            quotationId,
            installment.paymentId
        ]);


        installments.forEach((installment, index) => {
            db.query(updatePaymentsSql, installment, (err, result) => {
                if (err) {
                    console.error(`Error updating installment ${index + 1}:`, err);
                    return res.status(500).json({ message: `Error updating installment ${index + 1}`, error: err });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: `Installment ${index + 1} not found` });
                }

                if (index === installments.length - 1) {
                    return res.json({ message: "Quotation and payments updated successfully" });
                }
            })
        })


    });
});








// ************** Delete data ***************
app.delete('/delete/:id', (req, res) => {
    const quotationId = req.params.id;

    // SQL query to delete the quotation
    const deleteQuotationSql = `DELETE FROM quotation WHERE quotation_id = ?`;

    db.query(deleteQuotationSql, [quotationId], (err, result) => {
        if (err) {
            console.error('Error deleting quotation:', err);
            return res.status(500).json({ message: 'Error deleting quotation', error: err });
        }

        // Check if any rows were affected (i.e., if the delete was successful)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Quotation not found' });
        }

        // Delete associated installments
        const deleteInstallmentsSql = `DELETE FROM payments WHERE quotation_id = ?`;
        db.query(deleteInstallmentsSql, [quotationId], (err, result) => {
            if (err) {
                console.error('Error deleting installments:', err);
                return res.status(500).json({ message: 'Error deleting installments', error: err });
            }

            return res.json({ message: "Quotation and installments deleted successfully" });
        });
    });
});


// ************* Get Data by Quotation ID *************
app.get('/pdf/:id', (req, res) => {
    const quotationId = req.params.id;
    const sql = `
        SELECT q.quotation_id, q.name, q.email, q.gender, q.designation, q.domain, q.description, 
               q.price, q.quantity, q.current_date, q.entitle, q.total, q.discount, q.grand_total, q.input_count,
               p.label, p.due_when AS 'when', p.installment_amount
        FROM quotation q
        LEFT JOIN payments p ON q.quotation_id = p.quotation_id
        WHERE q.quotation_id = ?
    `;

    db.query(sql, [quotationId], (err, result) => {
        if (err) return res.json({ Message: "Error retrieving data" });

        if (result.length === 0) {
            return res.json({ Message: "Quotation not found" });
        }

        const data = {
            id: result[0].quotation_id,
            name: result[0].name,
            email: result[0].email,
            gender: result[0].gender,
            date: result[0].current_date,
            designation: result[0].designation,
            domain: result[0].domain,
            entitle: result[0].entitle,
            description: result[0].description,
            totalInstallment: 0,
            price: result[0].price,
            quantity: result[0].quantity,
            total: result[0].total,
            discount: result[0].discount,
            grandTotal: result[0].grand_total,
            inputCount: result[0].input_count,
            installments: []
        };

        result.forEach(row => {
            if (row.label) {
                data.installments.push({
                    label: row.label,
                    when: row.when,
                    installmentAmount: row.installment_amount
                });
                data.totalInstallment++;
            }
        });

        return res.json(data);
    });
});


// *********************************************************************
app.listen(8081, () => {
    console.log("Listening")
})