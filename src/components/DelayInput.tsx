import React, { useState } from 'react';

type DelayInputProps = {
  onDelayChange: (value: number | '', unit: string) => void;
};

const DelayInput: React.FC<DelayInputProps> = ({ onDelayChange }) => {
  const [delay, setDelay] = useState<number | ''>('');
  const [unit, setUnit] = useState<string>('seconds');

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value, 10)); // Prevent negative values
    setDelay(value);
    onDelayChange(value, unit);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setUnit(value);
    onDelayChange(delay, value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="delayInput" className="form-label">
        Delay Amount
      </label>
      <div className="input-group">
        <input
          id="delayInput"
          type="number"
          className="form-control"
          value={delay}
          onChange={handleDelayChange}
          placeholder="Enter delay"
          min="0" // Prevent negative values
        />
        <select
          className="form-select ms-2"
          value={unit}
          onChange={handleUnitChange}
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </div>
    </div>
  );
};

export default DelayInput;