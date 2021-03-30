import { useEffect, useState } from 'react';
import ConversionInput from './ConversionInput';
import { convert } from '../api/conversion';

interface ConversionRowProps {
  currencies: string[];
}

const ConversionRow: React.FC<ConversionRowProps> = ({ currencies }) => {
  const [source, setSource] = useState({
    value: '1000',
    currency: 'EUR',
  });
  const [target, setTarget] = useState({
    value: '0',
    currency: 'USD',
  });

  useEffect(() => {
    let sourceValue = parseFloat(source.value || '0');
    if (sourceValue !== 0) {
      convert(sourceValue, source.currency, target.currency).then((result) => {
        setTarget({
          value: result.toString(),
          currency: target.currency,
        });
      });
    }
  }, []);

  const onSourceCurrencyChange = async (currency: string) => {
    setSource({ value: source.value, currency });
    let sourceValue = parseFloat(source.value || '0');
    if (sourceValue !== 0) {
      const result = await convert(sourceValue, currency, target.currency);
      setTarget((prevState) => ({
        value: result.toString(),
        currency: target.currency,
      }));
    }
  };

  const onTargetCurrencyChange = async (currency: string) => {
    setTarget({ value: target.value, currency });
    let sourceValue = parseFloat(source.value || '0');
    if (sourceValue !== 0) {
      const result = await convert(sourceValue, source.currency, currency);
      setTarget({ value: result.toString(), currency });
    }
  };
  const onSourceAmountChange = async (value: string) => {
    setSource({ value, currency: source.currency });
    let sourceValue = parseFloat(value || '0');
    if (sourceValue !== 0) {
      const result = await convert(
        sourceValue,
        source.currency,
        target.currency
      );
      setTarget({ value: result.toString(), currency: target.currency });
    }
  };

  const onTargetAmountChange = async (value: string) => {
    setTarget({ value, currency: target.currency });
    let sourceValue = parseFloat(value || '0');
    if (sourceValue !== 0) {
      const result = await convert(
        sourceValue,
        target.currency,
        source.currency
      );
      setSource({ value: result.toString(), currency: source.currency });
    }
  };
  return (
    <>
      <ConversionInput
        value={source.value}
        currency={source.currency}
        onAmountChange={onSourceAmountChange}
        onCurrencyChange={onSourceCurrencyChange}
        currencies={currencies}
        labelPosition="left"
      />

      <ConversionInput
        value={target.value}
        currency={target.currency}
        onAmountChange={onTargetAmountChange}
        onCurrencyChange={onTargetCurrencyChange}
        currencies={currencies}
        labelPosition="right"
      />
    </>
  );
};

export default ConversionRow;
