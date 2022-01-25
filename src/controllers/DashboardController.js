import express from 'express';
import BitcoinService from 'services/BitcoinService';

const router = express.Router();

router.get('/', async (req, res) => {
    const response = await BitcoinService.fetchData();
    
    return res.status(200).json(response);
});

export default router;