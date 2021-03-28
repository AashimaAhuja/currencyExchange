import cache from '../lib/cache';

const APIS = {
  LATEST: 'https://api.exchangeratesapi.io/latest',
};

export interface ExchangeRateResponse {
  rates: { [key: string]: number };
  base: string;
  date: string;
}

let EXCHANGE_RATES: ExchangeRateResponse | null = null;

export const convert = async (
  sourceAmount: number,
  sourceCurrency: string,
  targetCurrency: string
) => {
  //   exchangeRates.rates[exchangeRates.base] = 1;
  console.log(
    `Going to convert ${sourceAmount} ${sourceCurrency} to ${targetCurrency}`
  );
  removeExpiredRates();
  let cachedRates = localStorage.getItem('EXCHANGE_RATES');
  EXCHANGE_RATES = cachedRates ? JSON.parse(cachedRates).value : null;

  if (EXCHANGE_RATES == null) {
    EXCHANGE_RATES = await getExchangeRates();
    cache.storeItem('EXCHANGE_RATES', EXCHANGE_RATES, 1);
  }

  EXCHANGE_RATES.rates[EXCHANGE_RATES.base] = 1;
  console.log({ EXCHANGE_RATES });

  const sourceToBaseExchangeRate = EXCHANGE_RATES.rates[sourceCurrency];
  const targetToBaseExchangeRate = EXCHANGE_RATES.rates[targetCurrency];

  console.log({ sourceToBaseExchangeRate });
  console.log({ targetToBaseExchangeRate });

  const sourceToTargetExchangeRate =
    targetToBaseExchangeRate / sourceToBaseExchangeRate;

  console.log({ sourceToTargetExchangeRate });

  return sourceAmount * sourceToTargetExchangeRate;
};

const getExchangeRates = (): Promise<ExchangeRateResponse> =>
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
        // console.log(data);
        return data;
      });
    })
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

const removeExpiredRates = () => {
  cache.removeExpiredItem('EXCHANGE_RATES');
};
