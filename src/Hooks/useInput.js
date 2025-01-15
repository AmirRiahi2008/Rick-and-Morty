import { useState } from "react";

export default function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  const handleChangeValue = (e) => setValue(e.target.value);

  return {
    value,
    onChange: handleChangeValue,
  };
}
