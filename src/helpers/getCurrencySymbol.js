const getCurrencySymbol = (currency = "usd") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  const symbol = formatter
    .formatToParts(0)
    .find((part) => part.type === "currency").value;

  return symbol;
};

export default getCurrencySymbol;
