const BaseContainer = (props) => {
  return (
    <div
      id="base-container"
      name="base-container"
      className="bg-[#F1F1F1] min-h-screen"
    >
      {props.children}
    </div>
  );
};

export default BaseContainer;
