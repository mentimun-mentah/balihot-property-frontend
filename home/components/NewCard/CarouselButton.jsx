export const renderArrow = direction => (onClickHandler, shouldBeEnabled) => {
  if (!shouldBeEnabled) return;

  const styles = {
    position: "absolute",
    cursor: "pointer",
    top: "45%",
    zIndex: 2
  };

  if (direction === "prev") {
    styles.left = 5;
    styles.paddingRight = "8px";
  } else {
    styles.right = 5;
    styles.paddingLeft = "8px";
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

