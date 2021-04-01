import { currencies } from "./latest"

function formatDate(d) {
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
export const generateHistoricalData = (startDate, endDate) => {

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    let today = parsedStartDate;
    const response = {
        'start_at': startDate,
        'base': 'EU',
        'end_at': endDate,
    }
    const rates = {};

    while (today <= parsedEndDate) {
        const newCurrencies = {};
        Object.keys(currencies).forEach(key => {
            let min = 0.9 * currencies[key];
            let max = 1.1 * currencies[key];
            newCurrencies[key] = (Math.random() * (max - min) + min).toFixed(2);
        })
        let formattedDate = formatDate(today)
        rates[formattedDate] = newCurrencies;
        const nextDay = new Date(today.getTime() + 8640000);
        today = nextDay;
    }
    response['rates'] = rates;
    return response;

}