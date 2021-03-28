import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

interface ConversionInputProps {
  value: string;
  currency: string;
  onAmountChange: (amount: string) => void;
  onCurrencyChange: (currency: string) => void;
}

const currencies = ['USD', 'EUR', 'INR'];

const options = currencies.map((item) => ({
  key: item,
  text: item,
  value: item,
}));

const ConversionInput: React.FC<ConversionInputProps> = (props) => {
  const { value, currency, onAmountChange, onCurrencyChange } = props;

  const currencyChange = (event: any, data: any) => {
    const { value: currency } = data;
    onCurrencyChange(currency);
  };

  const valueChange = (event: any, data: any) => {
    console.log('Value', data);
    onAmountChange(data.value);
  };

  return (
    <Input
      label={
        <Dropdown
          options={options}
          onChange={currencyChange}
          value={currency}
        />
      }
      value={value}
      onChange={valueChange}
      labelPosition="right"
      placeholder="Choose amount"
    />
  );
};

export default ConversionInput;
