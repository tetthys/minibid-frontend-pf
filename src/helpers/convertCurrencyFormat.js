const convertCurrencyFormat = (param) => {
  const number = String(param).replace(/[^0-9.]/g, "");
  return parseFloat(number);
};

export default convertCurrencyFormat;
