"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envPath = __dirname.includes('dist')
    ? path_1.default.resolve(__dirname, '../.env') // Running from dist/
    : path_1.default.resolve(__dirname, '../.env'); // Running from src/
dotenv_1.default.config({ path: envPath });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/auth', AuthRoutes_1.default);
app.get('/', (req, res) => {
    res.send("Hello from the server!");
});
(0, db_1.default)();
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map