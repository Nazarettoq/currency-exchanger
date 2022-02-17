import React, { useEffect, useState } from 'react';
import { CurrencyAPI } from './api';
import s from './App.module.css';
import { Header } from './Header';
import { Conversion } from './Сonversion';
import logo from './logoExchange.png';

function App() {
  const initialCurrency = 'USD';
  const [currencyInfo, setCurrencyInfo] = useState<Array<Object>>([]);
  const [fromCurrency, setFromCurrency] = useState(initialCurrency);
  const [toCurrency, setToCurrency] = useState(initialCurrency);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState<string>('1');
  const [switchAmount, setSwitchAmount] = useState(true);

  useEffect(() => {
    async function setCurrency() {
      let response = await CurrencyAPI.getCurrency();
      setCurrencyInfo(response.symbols);
    }

    setCurrency();
  }, []);
  useEffect(() => {
    async function setConvertedCurrency(fromCurrency: string, toCurrency: string, amount: number) {
      let response = await CurrencyAPI.getConvertCurrency(fromCurrency, toCurrency, amount);
      setExchangeRate(response.info.rate);
    }
    if (fromCurrency != null && toCurrency != null) {
      setConvertedCurrency(fromCurrency, toCurrency, Number(amount));
    }
  }, [fromCurrency, toCurrency]);
  /*   output length reduction */
  function isInteger(num: number) {
    num = Number(amount) * exchangeRate;
    if ((num ^ 0) === num) {
      return num;
    }
  }
  /*  reverse currency conversion */
  let toAmount, fromAmount;
  if (switchAmount) {
    fromAmount = amount;
    toAmount = Number(amount) * exchangeRate;
    if (!isInteger(toAmount)) {
      toAmount = toAmount.toFixed(3);
    }
  } else {
    toAmount = amount;
    fromAmount = Number(amount) / exchangeRate;
    if (!isInteger(Number(fromAmount))) {
      fromAmount = fromAmount.toFixed(3);
    }
  }

  const handleFromAmountchange = (e: any) => {
    setAmount(e.target.value);
    setSwitchAmount(true);
  };
  const handleToAmountchange = (e: EventInputType) => {
    setAmount(e.target.value);
    setSwitchAmount(false);
  };

  return (
    <div className={s.appSyle}>
      <Header />
      <div className={s.cal}>
        <div className={s.fromCurrency}>
          <Conversion
            currencyInfo={currencyInfo}
            selectedCurrency={fromCurrency}
            onChangeAmount={handleFromAmountchange}
            onchangeCurrency={(e: EventLSelectType) => setFromCurrency(e.currentTarget.value)}
            amount={String(fromAmount)}
          />
        </div>
        <div className={s.toCurrency}>
          <Conversion
            currencyInfo={currencyInfo}
            selectedCurrency={toCurrency}
            onChangeAmount={handleToAmountchange}
            onchangeCurrency={(e: EventLSelectType) => setToCurrency(e.currentTarget.value)}
            amount={String(toAmount)}
          />
        </div>
        <img src={logo} />
      </div>
    </div>
  );
}
export type EventInputType = React.ChangeEvent<HTMLInputElement>;
export type EventLSelectType = React.ChangeEvent<HTMLSelectElement>;
export default App;
