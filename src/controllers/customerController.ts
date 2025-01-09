import { Request, Response } from 'express';
import Customer, { ICustomer } from '../models/Customer';

export const customerController = {
    // Hent alle kunder
    getAllCustomers: async (req: Request, res: Response) => {
        try {
            const customers = await Customer.find();
            res.json(customers);
        } catch (error) {
            res.status(500).json({ message: 'Fejl ved hentning af kunder', error });
        }
    },

    // Hent specifik kunde
    getCustomerById: async (req: Request, res: Response) => {
        try {
            const customer = await Customer.findOne({ id: req.params.id });
            if (!customer) {
                return res.status(404).json({ message: 'Kunde ikke fundet' });
            }
            res.json(customer);
        } catch (error) {
            res.status(500).json({ message: 'Fejl ved hentning af kunde', error });
        }
    },

    // Opret ny kunde
    createCustomer: async (req: Request, res: Response) => {
        try {
            const newCustomer = new Customer(req.body);
            await newCustomer.save();
            res.status(201).json(newCustomer);
        } catch (error) {
            res.status(400).json({ message: 'Fejl ved oprettelse af kunde', error });
        }
    },

    // Opdater kunde
    updateCustomer: async (req: Request, res: Response) => {
        try {
            const updatedCustomer = await Customer.findOneAndUpdate(
                { id: req.params.id },
                req.body,
                { new: true }
            );
            if (!updatedCustomer) {
                return res.status(404).json({ message: 'Kunde ikke fundet' });
            }
            res.json(updatedCustomer);
        } catch (error) {
            res.status(400).json({ message: 'Fejl ved opdatering af kunde', error });
        }
    },

    // Slet kunde
    deleteCustomer: async (req: Request, res: Response) => {
        try {
            const deletedCustomer = await Customer.findOneAndDelete({ id: req.params.id });
            if (!deletedCustomer) {
                return res.status(404).json({ message: 'Kunde ikke fundet' });
            }
            res.json({ message: 'Kunde slettet' });
        } catch (error) {
            res.status(500).json({ message: 'Fejl ved sletning af kunde', error });
        }
    }
};
