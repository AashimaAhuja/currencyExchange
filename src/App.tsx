import React, { useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import HistoricalData from './components/HistoricalData';
import ConversionRow from './components/ConversionRow';
import { getExchangeRates } from './api/conversion';
import { Button, Icon } from 'semantic-ui-react';

import { CurrencyConverter } from './components/CurrencyConverter';

function App() {
  const [currencies, setCurrencies] = useState<string[]>([]);

  useEffect(() => {
    getExchangeRates().then((data) => {
      const { base, rates } = data;
      setCurrencies([base, ...Object.keys(rates)].sort());
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
