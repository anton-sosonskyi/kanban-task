import { useState } from "react";

export const useInput = (initialValue = '') => {
  const [input, setInput] = useState(initialValue);
  const [isError, setIsError] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsError(false);

    setInput(value);
  };

  const validateUrl = () => {
    const regex = /(https:(\/+)github.com(\/)\w+(\/)\w+)/g;
    return input.trim().match(regex);
  };

  const handleSearch = (callback: React.Dispatch<React.SetStateAction<string>>) => {
    if (!validateUrl()) {
      setIsError(true);
      return;
    }

    callback(input);
  };

  return {
    input,
    isError,
    onChange,
    handleSearch,
  };
};
