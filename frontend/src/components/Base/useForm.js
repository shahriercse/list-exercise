import { useState } from 'react';

const useForm = initial => {
  const [inputs, setInputs] = useState(initial);

  const handleChange = e => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return { inputs, handleChange, setInputs };
};

export default useForm;
