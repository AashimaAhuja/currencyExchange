import React, { useState } from 'react';
import { Input, Dropdown } from 'semantic-ui-react';
import HistoricalRatesChart from './HistoricalRatesChart';

interface HistoricalDataProps {
  currencies: string[];
}

const HistoricalData: React.FC<HistoricalDataProps> = (props) => {
  const { currencies } = props;

  const [startDate, setStartDate] = useState('2021-02-28');
  const [endDate, setEndDate] = useState('2021-03-28');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const options = currencies.map((currency) => ({
    key: currency,
    text: currency,
    value: currency,
  }));

  return (
    <div className="historical-rates">
      <h2 className="historical-rates__heading">
        Historical Rates (Base Currency: EU)
      </h2>
      <div className="grid-center margin-top--32">
        <div className="margin-end--16">
          <h3> Start Date: </h3>
          <Input
            icon="calendar"
            iconPosition="left"
            placeholder="Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="margin-end--16">
          <h3> End Date: </h3>
          <Input
            icon="calendar"
            iconPosition="left"
            placeholder="Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="margin-end--16">
          <h3>Choose Currency</h3>
          <Dropdown
            placeholder="Select Currency"
            selection
            options={options}
            value={selectedCurrency}
            onChange={(e, data) => setSelectedCurrency(data.value as string)}
          />
        </div>
        <br />
      </div>

      <HistoricalRatesChart
        currency={selectedCurrency}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default HistoricalData;
