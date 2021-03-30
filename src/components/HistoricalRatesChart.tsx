import React, { useEffect, useState } from 'react';
import { getHistoricalData } from '../api/conversion';
import c3 from 'c3';
import 'c3/c3.css';

const HistoricalRatesChart = (props: any) => {
  const { currency, startDate, endDate } = props;
  const [historyData, setHistoryData] = useState<any>([]);

  useEffect(() => {
    getHistoricalData(startDate, endDate).then((data) => {
      setHistoryData(data);
    });
  }, [currency, startDate, endDate]);

  useEffect(() => {
    if (historyData && historyData.rates && currency) {
      const chartData = Object.keys(historyData.rates).map((date: any) => {
        return historyData.rates[date][currency];
      });

      c3.generate({
        size: {
          height: 300,
          width: 500,
        },
        bindto: '#chart',
        data: {
          x: 'x',
          columns: [
            ['x', ...Object.keys(historyData.rates)],
            [currency, ...chartData],
          ],
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%d-%m-%Y',
            },
          },
        },
      });
    }
  }, [historyData, startDate, endDate, currency]);

  if (historyData == null || historyData.rates == null || currency == null) {
    return <></>;
  }

  return <div id="chart" className="grid-center"></div>;
};

export default HistoricalRatesChart;
