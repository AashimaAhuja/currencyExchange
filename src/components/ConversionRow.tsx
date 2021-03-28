import { useEffect, useState } from 'react';
import ConversionInput from './ConversionInput';
import { convert } from '../api/conversion';

interface ConversionRowProps {
  value: string;
  currency: string;
}

const ConversionRow = () => {
  const [source, setSource] = useState<ConversionRowProps>({
    value: '1000',
    currency: 'EUR',
  });
  const [target, setTarget] = useState<ConversionRowProps>({
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

  //   const [sourceAmount, setSourceAmount] = useState(100);
  //   const [targetAmount, setSourceAmount] = useState(100);

  const onSourceCurrencyChange = async (currency: string) => {
    setSource({ value: source.value, currency });
    console.log({ value: source.value, currency });
    let sourceValue = parseFloat(source.value || '0');
    if (sourceValue !== 0) {
      const result = await convert(sourceValue, currency, target.currency);
      console.log({ result });
      setTarget((prevState) => ({
        value: result.toString(),
        currency: target.currency,
      }));
      console.log('Target', target);
    }
  };

  const onTargetCurrencyChange = async (currency: string) => {
    setTarget({ value: target.value, currency });
    console.log({ value: target.value, currency });
    let sourceValue = parseFloat(source.value || '0');
    if (sourceValue !== 0) {
      const result = await convert(sourceValue, source.currency, currency);
      console.log({ result });
      setTarget({ value: result.toString(), currency });
    }
  };
  const onSourceAmountChange = async (value: string) => {
    setSource({ value, currency: source.currency });
    console.log({ value, currency: source.currency });
    let sourceValue = parseFloat(value || '0');
    console.log({ sourceValue });
    if (sourceValue !== 0) {
      const result = await convert(
        sourceValue,
        source.currency,
        target.currency
      );
      console.log({ result });
      setTarget({ value: result.toString(), currency: target.currency });
    }
  };

  const onTargetAmountChange = async (value: string) => {
    setTarget({ value, currency: target.currency });
    let sourceValue = parseFloat(value || '0');
    console.log({ value, currency: target.currency });
    if (sourceValue !== 0) {
      const result = await convert(
        sourceValue,
        target.currency,
        source.currency
      );
      console.log({ result });
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
      />

      <ConversionInput
        value={target.value}
        currency={target.currency}
        onAmountChange={onTargetAmountChange}
        onCurrencyChange={onTargetCurrencyChange}
      />
    </>
  );
};

export default ConversionRow;
