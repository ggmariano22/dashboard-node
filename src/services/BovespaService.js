import { doGetRequest } from 'helpers/api';
import { format } from 'helpers/currency'

const bovespaBaseUri = process.env.BOVESPA_BASE_URI;

const getPrice = async code => {
    const dataResolver = response => format(response.price, process.env.REAL_SYMBOL);
    const price = await doGetRequest(`${bovespaBaseUri}/${code}`, {}, dataResolver);

    return { code, price };
}

const fetchData = async () => {
    const result = await Promise.all([
        getPrice('MGLU3'),
        getPrice('VVAR3'),
        getPrice('EVEN3')
    ]);

    return {
        bovespa: result
    };
}

export default { fetchData };
