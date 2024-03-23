const objectToFormData = (object) => {
  const formData = new FormData();

  Object.keys(object).forEach((key) => {
    if (object[key] === undefined) return;

    if (Array.isArray(object[key])) {
      object[key].forEach((item) => formData.append(key, item));
      return;
    }

    formData.append(key, object[key]);
  });

  return formData;
};

export default objectToFormData;
