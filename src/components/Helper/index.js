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

const linkify = (inputText) => {
  let replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 =
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  //Change email addresses to mailto:: links.
  replacePattern3 =
    /(([a-zA-Z0-9\-_.])+@[a-zA-Z0-9\\-]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
};

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
export { componentColors, isValidEmail, PhoneNumberInput, linkify };
