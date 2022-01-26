import Parser from 'rss-parser';

const apiBAseUri = process.env.GOOGLE_TRENDS_BASE_URI;

const parser = new Parser({
    defaultRSS: 2.0,
    customFields: {
        item: [['ht:approx_traffic', 'volume', { keepArray: false }]]
    }
});

const parseVolumeToInt = volume => {
    let vol = volume.replace('+', '');
    vol = vol.replace(/\,/g, '');

    return Number.parseInt(vol, 10);
}

const sortVolume = (a, b) => b.volume - a.volume;

const getGoogleTrends = async geo => {
    const trends = await parser.parseURL(`${process.env.GOOGLE_TRENDS_BASE_URI}${geo}`);
    const items = trends.items.map(item => {
        const { title: name, volume } = item;
        console.log({
            name,
            volume: volume ?? 0
        });
        return {
            name,
            volume: parseVolumeToInt(volume) ?? 0
        }
    });

    return items;
}

const fetchData = async (limit = 10) => {
    const [us, br] = await Promise.all([
        getGoogleTrends('US'),
        getGoogleTrends('BR')
    ]);

    const sortedUs = us.sort(sortVolume);
    const sortedBr = br.sort(sortVolume);
    const limitedUs = sortedUs.slice(0, limit);
    const limitedBr = sortedBr.slice(0, limit);

    return {
        googleTrends: {
            brasil: limitedBr,
            eua: limitedUs
        }
    }
}

export default { fetchData };
