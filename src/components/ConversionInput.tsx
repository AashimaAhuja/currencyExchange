import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

interface ConversionInputProps {
  value: number;
  currency: string;
  onAmountChange: (amount: number) => void;
  onCurrencyChange: (currency: string) => void;
  currencies: string[];
  labelPosition?: 'left' | 'right';
}

const ConversionInput: React.FC<ConversionInputProps> = (props) => {
  const {
    value,
    currency,
    onAmountChange,
    onCurrencyChange,
    currencies,
    labelPosition = 'right',
  } = props;

  const options = currencies.map((item) => ({
    key: item,
    text: item,
    value: item,
  }));

  const currencyChange = (event: any, data: any) => {
    const { value: currency } = data;
    onCurrencyChange(currency);
  };

  const valueChange = (event: any, data: any) => {
    onAmountChange(data.value);
  };

  return (
    <Input
      label={
        <Dropdown
          scrolling
          options={options}
          onChange={currencyChange}
          value={currency}
        />
      }
      value={value}
      onChange={valueChange}
      labelPosition={labelPosition}
      placeholder="Choose amount"
      className="margin-end--16"
      type="number"
    />
  );
};

export default ConversionInput;
