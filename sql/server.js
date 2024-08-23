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
                    currentDate: row.current_date,
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
    const quotation_sql = "INSERT INTO quotation ('name', 'email', 'gender', 'current_date', 'designation', 'domain', 'entitle', 'description', 'price', 'quantity', 'total', 'discount', 'grand_total','input_count') VALUES (?)";
    const quotation_values = [
        req.body.name,
        req.body.email,
        req.body.gender,
        req.body.current_date,
        req.body.designation,
        req.body.domain,
        req.body.entitle,
        req.body.description,
        req.body.price,
        req.body.quantity,
        req.body.total,
        req.body.discount,
        req.body.grand_total,
        req.body.input_count
    ]

    const installmentsSql = `INSERT INTO payments 
    ('quotation_id', 'label', 'due_when', 'installment_amount') 
    VALUES ?`;

    const installmentValues = req.body.installments.map(installment => [
        null,  // Placeholder for quotation_id
        installment.label,
        installment.when,
        installment.installmentAmount
    ]);

    db.query(quotation_sql, installmentsSql, [quotation_values, installmentValues], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
})
app.listen(8081, () => {
    console.log("Listening")
})