export const renderArrow = direction => (onClickHandler, shouldBeEnabled) => {
  if (!shouldBeEnabled) return;

  const styles = {
    position: "absolute",
    cursor: "pointer",
    top: "45%",
    zIndex: 2,
    width: "31px",
  };

  if (direction === "prev") {
    styles.left = 5;
    styles.paddingRight = "8px";
  } else {
    styles.right = 5;
    styles.paddingLeft = "8px";
  }

  return (
    <>
      <button
        type="button"
        onClick={onClickHandler}
        style={styles}
        className="custom-arrow"
      >
        {direction === "prev" ? (
          <i className="fas fa-chevron-left"></i>
        ) : (
          <i className="fas fa-chevron-right"></i>
        )}
      </button>
      <style jsx>{`
        :global(.custom-arrow) {
          position: absolute;
          outline: 0px;
          transition: all 0.5s ease 0s;
          border-radius: 35px;
          z-index: 2;
          border: 0px;
          background: #ffffff4d;
          color: #6a6a6a8a;
          min-width: 30px;
          min-height: 30px;
          opacity: 1;
          cursor: pointer;
          top: 45%;
          right: 5px;
          padding-top: 4px;
        }
        :global(.custom-arrow:hover) {
          background: #ffffffdb;
          color: #6a6a6a;
        }
      `}</style>
    </>
  );
};
