"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaryServices = __importStar(require("../services/diarieService"));
const utils_1 = __importDefault(require("../services/utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    console.log('someone pinged here' + ' ' + new Date().toLocaleDateString());
    return res.status(200).json(diaryServices.getEntries());
});
router.get('/', (_req, res) => {
    res.send('fetching all entry diaries');
});
router.post('/', (req, res) => {
    try {
        const { date, weather, visibility, comment } = req.body;
        const addedDiaryEntry = diaryServices.addDiary((0, utils_1.default)({ date, weather, visibility, comment }));
        return res.status(200).json(addedDiaryEntry);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ diary: diaryServices.findById(parseInt(id)) });
});
exports.default = router;
