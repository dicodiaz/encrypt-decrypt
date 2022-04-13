import { useState } from 'react';
import decrypt from '../logic/decrypt';

const Decrypt = () => {
  const [inputValue, setInputValue] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const onButtonClick = () => {
    setDecrypted(decrypt(inputValue));
  };

  return (
    <>
      <textarea
        type="text"
        className="w-100"
        value={inputValue}
        onChange={handleChange}
        placeholder="Input text to decrypt"
        rows={5}
      />
      <div className="d-flex justify-content-center py-2">
        <button type="button" className="btn btn-primary" onClick={onButtonClick}>
          Decrypt
        </button>
      </div>
      <p>{decrypted}</p>
    </>
  );
};

export default Decrypt;
