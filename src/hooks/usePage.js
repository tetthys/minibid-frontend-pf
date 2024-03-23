import { useEffect, useState } from "react";

let isFirstRender = true;

const usePage = (scrollToElementId = "base-container") => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    scrollToElement(scrollToElementId);
  }, [page]);

  return {
    page,
    setPage,
  };
};

export default usePage;

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  element?.scrollIntoView({
    behavior: "smooth",
  });
};
