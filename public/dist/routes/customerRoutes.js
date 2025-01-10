"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerController_1 = require("../controllers/customerController");
const router = express_1.default.Router();
// Customer routes
router.get('/customers', customerController_1.customerController.getAllCustomers);
router.get('/customers/:id', customerController_1.customerController.getCustomerById);
router.post('/customers', customerController_1.customerController.createCustomer);
router.put('/customers/:id', customerController_1.customerController.updateCustomer);
router.delete('/customers/:id', customerController_1.customerController.deleteCustomer);
exports.default = router;
