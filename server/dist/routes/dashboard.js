"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../middlewares/Auth");
const router = express_1.default.Router();
router.get("/dashboard", Auth_1.verifyToken, (req, res) => {
    const user = req.user;
    return res.status(200).json({ success: true, user });
});
exports.default = router;
//# sourceMappingURL=dashboard.js.map