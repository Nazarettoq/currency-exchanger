import React, { useEffect, useState } from 'react';
import { CurrencyAPI } from './api';
import s from './App.module.css';
export const Header = () => {
  const [currExchange, setCurrExchange] = useState([]);

  useEffect(() => {
    async function setHeaderInfo() {
      let response = await CurrencyAPI.getCurrencyExchange();
      setCurrExchange(response.slice(0, 2));
    }
    setHeaderInfo();
  }, []);
  const rounded = function (number: string) {
    return Number(number).toFixed(2);
  };
  return (
    <div className={s.header}>
      <ul className={s.infoPanel}>
        {currExchange.map((c: any) => (
          <li key={c.ccy}>{c.ccy + ' BUY:' + rounded(c.buy) + '  SALE:' + rounded(c.sale)}</li>
        ))}
      </ul>
    </div>
  );
};
