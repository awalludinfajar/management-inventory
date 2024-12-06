import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import "../../css/custom.css"

const DateInput = ({
  id,
  value = new Date(),
  onChange = () => {},
  className = "",
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(value);

  const handleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(date);
    onChange(formattedDate);
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="relative w-full" style={{ display: 'block' }}>
    {/* <> */}
      <input
        id={id}
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        ref={ref}
        className={`block rounded-md border-2 py-1.5 pl-10 pr-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className}`}
        placeholder="Select a date"

      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 48 48"
          className="text-gray-400"
        >
          <mask id="ipSApplication0">
            <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
              <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
              <path
                fill="#fff"
                d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
              ></path>
            </g>
          </mask>
          <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSApplication0)"></path>
        </svg>
      </div>
    {/* </> */}
    </div>
  ));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="dd-MM-yyyy"
      maxDate={new Date()}
      customInput={<CustomInput />}
      {...props}
    />
  );
};

export default DateInput;
