import React from 'react';

export const CurrencyConverter = (props: any) => (
  <div
    className="currency-converter"
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <h1 className="margin-top--16"> Currency Converter</h1>
    <div className="currency-wrapper">{props.children}</div>
  </div>
);
