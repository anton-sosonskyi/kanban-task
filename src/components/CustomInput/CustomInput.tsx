import { Input } from 'antd';
import { useInput } from '../../hooks/useInput';
const { Search } = Input;

type Props = {
  handleURLChange: React.Dispatch<React.SetStateAction<string>>;
};

export const CustomInput: React.FC<Props> = ({ handleURLChange }) => {
  const { input, isError, onChange, handleSearch } = useInput('');

  return (
    <Search
      style={{
        width: '100%',
      }}
      allowClear
      placeholder="Enter repo URL"
      enterButton="Load issues"
      size="large"
      status={isError ? 'error' : ''}
      value={input}
      onChange={onChange}
      onSearch={() => handleSearch(handleURLChange)}
    />
  );
};
