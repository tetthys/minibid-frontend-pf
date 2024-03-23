const combineDateAndTime = (inputDate, inputTime) => {
  return new Date(inputDate + "T" + inputTime);
};

export default combineDateAndTime;
