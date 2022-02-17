import { useEffect, useLayoutEffect, useState } from 'react';
import { EventInputType, EventLSelectType } from './App';
import s from './App.module.css';

/* hook to screen size detection */
function useWindowSize() {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return width;
}

type TProps = {
  currencyInfo: Array<Object>;
  selectedCurrency: string;
  onchangeCurrency: (e: EventLSelectType) => void;
  amount: string;
  onChangeAmount: (e: any) => void;
};
export const Conversion: React.FC<TProps> = (props) => {
  const { currencyInfo, selectedCurrency, onchangeCurrency, amount, onChangeAmount } = props;
  const width = useWindowSize();
  const [isStyle, setIsStyle] = useState(true);

  /*  changing the display of currency names */
  const setOption = (option: any) => {
    if (isStyle) {
      return currencyInfo[option];
    } else {
      return option;
    }
  };

  useEffect(() => {
    if (width <= 1200) {
      setIsStyle(false);
    }
    if (width > 1000) {
      setIsStyle(true);
    }
  }, [width]);

  return (
    <div className={s.inputIcon}>
      <input type="number" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onchangeCurrency}>
        {Object.keys(currencyInfo).map((option: any) => (
          <option key={option} value={option} style={{ textAlign: 'center' }}>
            {setOption(option)}
          </option>
        ))}
      </select>
    </div>
  );
};
