import cache from '../lib/cache';

const APIS = {
  LATEST: 'https://api.exchangeratesapi.io/latest',
  HISTORY: 'https://api.exchangeratesapi.io/history',
};

export interface ExchangeRateResponse {
  rates: { [key: string]: number };
  base: string;
  date: string;
}
export interface HistoryResponse {
  rates: { [key: string]: { [key: string]: number } };
  start_at: string;
  base: string;
  end_at: string;
}

let EXCHANGE_RATES: ExchangeRateResponse | null = null;

export const convert = async (
  sourceAmount: number,
  sourceCurrency: string,
  targetCurrency: string
) => {
  removeExpiredRates();
  let cachedRates = localStorage.getItem('EXCHANGE_RATES');
  EXCHANGE_RATES = cachedRates ? JSON.parse(cachedRates).value : null;

  if (EXCHANGE_RATES == null) {
    EXCHANGE_RATES = await getExchangeRates();
    cache.storeItem('EXCHANGE_RATES', EXCHANGE_RATES, 1);
  }

  EXCHANGE_RATES.rates[EXCHANGE_RATES.base] = 1;

  const sourceToBaseExchangeRate = EXCHANGE_RATES.rates[sourceCurrency];
  const targetToBaseExchangeRate = EXCHANGE_RATES.rates[targetCurrency];

  const sourceToTargetExchangeRate =
    targetToBaseExchangeRate / sourceToBaseExchangeRate;

  return sourceAmount * sourceToTargetExchangeRate;
};

export const getExchangeRates = (): Promise<ExchangeRateResponse> =>
  fetch(APIS.LATEST)
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }

      // Examine the text in the response
      return response.json().then(function (data) {
        return data;
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

const removeExpiredRates = () => {
  cache.removeExpiredItem('EXCHANGE_RATES');
};

export const getHistoricalData = (
  startAt: string,
  endAt: string
): Promise<HistoryResponse> => {
  return fetch(`${APIS.HISTORY}?start_at=${startAt}&end_at=${endAt} `).then(
    (response) => {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }

      // Examine the text in the response
      return response.json().then(function (data) {
        return data;
      });
    }
  );
};
