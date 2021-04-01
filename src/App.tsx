import React, { useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import HistoricalData from './components/HistoricalData';
import ConversionRow from './components/ConversionRow';
import { getExchangeRates } from './api/conversion';
import { CurrencyConverter } from './components/CurrencyConverter';
import { latestAPIMockDate } from './mock/latest';

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    getExchangeRates()
      .then((data) => {
        const { rates } = data;
        setCurrencies(Object.keys(rates));
      })
      .catch((error) => {
        console.log('Oops ! some error occurred');
        const { rates } = latestAPIMockDate;
        setCurrencies(Object.keys(rates));
      });
  }, []);

  return (
    <>
      <CurrencyConverter>
        {currencies.length > 0 && <ConversionRow currencies={currencies} />}
        <br />
        {currencies.length > 0 && <ConversionRow currencies={currencies} />}
      </CurrencyConverter>

      <HistoricalData currencies={currencies} />
    </>
  );
}

export default App;
