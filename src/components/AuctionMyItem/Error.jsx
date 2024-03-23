const Error = ({ error, errorLabel }) => {
  return error?.map((err, i) => {
    if (
      (err.context && errorLabel.includes(err.context.label)) ||
      (err.field && errorLabel.includes(err.field)) ||
      (err.path && errorLabel.includes(err.path[0]))
    )
      return (
        <p key={i} className="mt-2 text-base font-medium text-danger">
          {err.message}
        </p>
      );
  });
};

export default Error;
