import express from 'express';
import path from 'path'; //It can be used to manipulate file paths, normalize them, join them together, and extract information such as the directory name, file name, and file extension.
import { fileURLToPath } from 'url'; //The fileURLToPath() function is used to convert a file URL to a file path.
import GiftsController from '../controllers/gifts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', GiftsController.getGifts);


router.get('/:giftId', GiftsController.getGiftById);

export default router;