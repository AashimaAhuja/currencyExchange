import { useEffect, useState } from 'react';
import ConversionInput from './ConversionInput';
import { convert } from '../api/conversion';

interface ConversionRowProps {
  currencies: string[];
}

const toFixedFloat = (value) => parseFloat(value.toFixed(2));

const ConversionRow: React.FC<ConversionRowProps> = ({ currencies }) => {
  const [source, setSource] = useState({
    isDirty: true,
    value: 1000,
    currency: 'EUR',
  });
  const [target, setTarget] = useState({
    isDirty: false,
    value: 0,
    currency: 'USD',
  });

  useEffect(() => {
    const { value } = source;
    if (source.isDirty) {
      value &&
        convert(value, source.currency, target.currency).then((result) => {
          setTarget({
            ...target,
            value: toFixedFloat(result),
          });
        });

      setSource({
        ...source,
        isDirty: false,
      });
    }
  }, [source.isDirty]);

  useEffect(() => {
    let { value } = target;
    if (target.isDirty) {
      value &&
        convert(value, target.currency, source.currency).then((result) => {
          setSource({
            ...source,
            value: toFixedFloat(result),
            isDirty: false,
          });
        });
      setTarget({
        ...target,
        isDirty: false,
      });
    }
  }, [target.isDirty]);

  const onSourceCurrencyChange = async (currency: string) => {
    setSource({ ...source, currency, isDirty: true });
  };

  const onSourceAmountChange = async (value: number) => {
    setSource({ ...source, value, isDirty: true });
  };

  const onTargetCurrencyChange = async (currency: string) => {
    setTarget({ ...target, currency, isDirty: true });
  };

  const onTargetAmountChange = async (value: number) => {
    setTarget({ ...target, value, isDirty: true });
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
