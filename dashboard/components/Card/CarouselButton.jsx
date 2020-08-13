export const renderArrow = direction => (onClickHandler, shouldBeEnabled) => {
  if (!shouldBeEnabled) return;

  const styles = {
    position: "absolute",
    cursor: "pointer",
    top: "45%",
    zIndex: 2,
    width: "30px",
    paddingBottom: "2px"
  };

  if (direction === "prev") {
    styles.left = 5;
    styles.paddingLeft = "5px";
    styles.paddingRight = "6px";
  } else {
    styles.right = 5;
    styles.paddingLeft = "6px";
    styles.paddingRight = "5px";
  }

  return (
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
  );
};
