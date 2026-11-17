import { useState } from "react";

// Custom hook for managing form input values.
// Returns:
// value: the current text entered in the input.
// setValue: updates the text when the user types.
// resetValue: clears the input after form submission.
export function useFormFields(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);

  const resetValue = () => {
    setValue(initialValue);
  };

  return {
    value,
    setValue,
    resetValue,
  };
}