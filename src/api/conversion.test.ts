import { convert, getExchangeRates } from './conversion';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();
describe('Exchange API conversion tests', () => {
  it('should fetch rates from API if not available in cache', () => {
    // const getExchangeRates = jest.fn();
    // convert(100, 'EUR', 'USD');
    getExchangeRates();
    expect(fetch).toHaveBeenLastCalledWith('https://test.url/');
    // const mockFn = jest.fn(getExchangeRates);
    // expect(getExchangeRates.mock.calls.length).toBe(1);
    // expect(getExchangeRates()).toBeInstanceOf(Promise);
  });
});
