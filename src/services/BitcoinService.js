import { doGetRequest } from "helpers/api";
import { format } from "helpers/currency";

const coinBaseUri = process.env.COIN_BASE_URI;
const bitcoinBaseUri = process.env.BITCOIN_BASE_URI;

const getPriceBitcoinTrade = async () => {
    const dataResolver = response => format(response.data.last, process.env.REAL_SYMBOL);
    
    return doGetRequest(bitcoinBaseUri, {}, dataResolver);
}

const getPriceCoinBase = () => {
    const dataResolver = response => format(response.data.amount, process.env.DOLLAR_SYMBOL);

    return doGetRequest(coinBaseUri, {}, dataResolver);
}

const fetchData = async () => {
    const [priceBitcoinTrade, priceCoinBase] = await Promise.all([
        getPriceBitcoinTrade(),
        getPriceCoinBase()
    ]);

    return {
        bitcoin: {
            usd: priceCoinBase,
            brl: priceBitcoinTrade
        }
    }
}

export default {fetchData};
