import { doGetRequest } from 'helpers/api';
import { format } from 'helpers/currency';

const currencyBaseUri = process.env.CURRENCY_BASE_URI;

const getPrice = async (currency) => {
    const dataResolver = response => format(response[0].bid, process.env.REAL_SYMBOL);
    
    return doGetRequest(`${currencyBaseUri}/${currency}`, {}, dataResolver);
}

const fetchData = async () => {
    const [usd, eur] = await Promise.all([
        getPrice('USD'),
        getPrice('EUR')
    ]);

    return {
        currency: {
            usd,
            eur
        }
    };
}

export default { fetchData };
