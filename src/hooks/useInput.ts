import { useState } from "react";

export const useInput = (initialValue = '') => {
  const [input, setInput] = useState(initialValue);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsError(false);
    setMessage('');

    setInput(value);
  };

  const validateUrl = () => {
    const regex = /(https:(\/+)github.com(\/)\w+(\/)\w+)/g;
    return input.trim().match(regex);
  };

  const handleSearch = (callback: React.Dispatch<React.SetStateAction<string>>) => {
    if (!input.trim().length) {
      setIsError(true);
      setMessage('URL can\'t be empty');
      return;
    }

    if (!validateUrl()) {
      setIsError(true);
      setMessage('Invalid repository URL')
      return;
    }

    callback(input.trim());
  };

  return {
    input,
    isError,
    message,
    onChange,
    handleSearch,
  };
};
