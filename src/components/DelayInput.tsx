import React, { useState } from 'react';

type DelayInputProps = {
  onDelayChange: (value: number | '', unit: string) => void;
};

const DelayInput: React.FC<DelayInputProps> = ({ onDelayChange }) => {
  const [delay, setDelay] = useState<number | ''>('');
  const [unit, setUnit] = useState<string>('seconds');

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseInt(e.target.value, 10);
    setDelay(value);
    onDelayChange(value, unit);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUnit(value);
    onDelayChange(delay, value);
  };

  return (
    <div>
      <input
        type="number"
        value={delay}
        onChange={handleDelayChange}
        placeholder="Delay amount"
      />
      <select value={unit} onChange={handleUnitChange}>
        <option value="seconds">Seconds</option>
        <option value="minutes">Minutes</option>
        <option value="hours">Hours</option>
      </select>
    </div>
  );
};

export default DelayInput;