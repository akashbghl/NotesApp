"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = async (req, res) => {
    try {
        res.send('chal gya beta');
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
//# sourceMappingURL=Auth.js.map