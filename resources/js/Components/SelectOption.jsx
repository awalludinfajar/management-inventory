import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectOption = ({ modelValue, url, data = [], onModelValueChange, className }) => {
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState(modelValue);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(url);
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching options: ", error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedId(value);
    onModelValueChange(value);
  };

  useEffect(() => {
    setSelectedId(modelValue);
  }, [modelValue]);

  useEffect(() => {
    if (data && data.length > 0) {
      setOptions(data);
    } else {
      fetchOptions();
    }
  }, [data, url]);

  return (
    <select
      value={selectedId}
      onChange={handleChange}
      className={`rounded-md border-2 py-1.5 pl-2 pr-20 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${className || ''}`}
    >
      <option value="">
        -- Silahkan Pilih --
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nama}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
