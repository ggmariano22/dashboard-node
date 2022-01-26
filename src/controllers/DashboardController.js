import express from 'express';
import BitcoinService from 'services/BitcoinService';
import BovespaService from 'services/BovespaService';
import CurrencyService from 'services/CurrencyService';
import GoogleTrendsService from 'services/GoogleTrendsService';

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await Promise.all([
        BitcoinService.fetchData(),
        BovespaService.fetchData(),
        CurrencyService.fetchData(),
        GoogleTrendsService.fetchData()
    ]);
    
    return res.status(200).json(result);
});

export default router;
