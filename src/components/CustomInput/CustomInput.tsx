import { Alert, Input } from 'antd';
import { useInput } from '../../hooks/useInput';
const { Search } = Input;

type Props = {
  handleURLChange: React.Dispatch<React.SetStateAction<string>>;
};

export const CustomInput: React.FC<Props> = ({ handleURLChange }: Props) => {
  const {
    input,
    isError,
    message,
    onChange,
    handleSearch,
  } = useInput('');

  return (
    <>
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

      {isError && (
        <Alert message={message} type="error" />
      )}
    </>
  );
};
