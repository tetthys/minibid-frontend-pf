import { useEffect, useState } from "react";

const calculateRemainingTime = (targetDateString) => {
  const targetDate = new Date(targetDateString);

  const now = new Date();

  const timeDifference = targetDate - now;

  let seconds = Math.floor((timeDifference / 1000) % 60);
  let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (days < 0) {
    seconds = minutes = hours = days = 0;
  }

  return `${days}D ${hours}H ${minutes}M ${seconds}S`;
};

// get endAt datetime and return live remaining time

const useRemainingTime = (endAt, [...dependencies]) => {
  const [remainingTime, setRemainingTime] = useState("...");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(endAt));
    }, 0.1 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [...dependencies]);

  return {
    remainingTime,
  };
};

export default useRemainingTime;
