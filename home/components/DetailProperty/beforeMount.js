import { useState, useEffect } from "react";
const useBeforeFirstRender = f => {
  const [hasRendered, setHasRendered] = useState(false);
  useEffect(() => setHasRendered(true), [hasRendered]);
  if (!hasRendered) {
    f();
  }
};

export default useBeforeFirstRender
