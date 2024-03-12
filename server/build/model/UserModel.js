"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: {
        type: "String",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    lastActive: {
        type: Date,
        // default: Date.now,
    },
}, { timestamps: true });
exports.User = mongoose_1.default.model("User", userSchema);
