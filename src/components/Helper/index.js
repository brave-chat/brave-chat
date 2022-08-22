import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

const componentColors = [
  "amber",
  "brown",
  "orange",
  "purple",
  "primary",
  "red",
  "green",
  "blue",
  "grey",
  "yellow",
  "secondary",
];

const PhoneNumberInput = React.forwardRef(
  ({ onChange, value, ...other }, ref) => {
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
      if (!phoneNumber && value) {
        setTimeout(() => {
          setPhoneNumber(value);
        }, 100);
      }
    }, [phoneNumber, value]);

    const onNumberChange = (number) => {
      setPhoneNumber(number.formattedValue);
      onChange(number.formattedValue);
    };

    return (
      <NumberFormat
        {...other}
        onValueChange={onNumberChange}
        value={phoneNumber}
        format="##-######"
      />
    );
  }
);

const isValidEmail = (value) => {
  return value && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i.test(value);
};
export { componentColors, isValidEmail, PhoneNumberInput };
