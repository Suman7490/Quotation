import mongoose from 'mongoose';





const installmentSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    when: {
        type: String,
        required: true
    },
    installmentAmount: {
        type: Number,  // Assuming the installment amount is a number
        required: true
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    currentDate: {
        type: Date,  // Consider storing dates in ISO format (e.g., "2024-08-16T00:00:00Z")
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    domain: {
        type: String,  // Assuming you meant to use String instead of Selection
        required: true
    },
    entitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalInstallment: {
        type: Number,  // Added totalInstallment field
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    inputCount: {
        type: Number,
        required: true
    },
    installments: [installmentSchema]  // Array of objects with the installment schema
});

const User = mongoose.model('User', userSchema);

export default User;
