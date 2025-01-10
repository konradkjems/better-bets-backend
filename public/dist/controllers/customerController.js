"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const Customer_1 = __importDefault(require("../models/Customer"));
exports.customerController = {
    // Hent alle kunder
    getAllCustomers: async (req, res) => {
        try {
            const customers = await Customer_1.default.find();
            res.json(customers);
        }
        catch (error) {
            res.status(500).json({ message: 'Fejl ved hentning af kunder', error });
        }
    },
    // Hent specifik kunde
    getCustomerById: async (req, res) => {
        try {
            const customer = await Customer_1.default.findOne({ id: req.params.id });
            if (!customer) {
                return res.status(404).json({ message: 'Kunde ikke fundet' });
            }
            res.json(customer);
        }
        catch (error) {
            res.status(500).json({ message: 'Fejl ved hentning af kunde', error });
        }
    },
    // Opret ny kunde
    createCustomer: async (req, res) => {
        try {
            const newCustomer = new Customer_1.default(req.body);
            await newCustomer.save();
            res.status(201).json(newCustomer);
        }
        catch (error) {
            res.status(400).json({ message: 'Fejl ved oprettelse af kunde', error });
        }
    },
    // Opdater kunde
    updateCustomer: async (req, res) => {
        try {
            const updatedCustomer = await Customer_1.default.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
            if (!updatedCustomer) {
                return res.status(404).json({ message: 'Kunde ikke fundet' });
            }
            res.json(updatedCustomer);
        }
        catch (error) {
            res.status(400).json({ message: 'Fejl ved opdatering af kunde', error });
        }
    },
    // Slet kunde
    deleteCustomer: async (req, res) => {
        try {
            const deletedCustomer = await Customer_1.default.findOneAndDelete({ id: req.params.id });
            if (!deletedCustomer) {
                return res.status(404).json({ message: 'Kunde ikke fundet' });
            }
            res.json({ message: 'Kunde slettet' });
        }
        catch (error) {
            res.status(500).json({ message: 'Fejl ved sletning af kunde', error });
        }
    }
};
