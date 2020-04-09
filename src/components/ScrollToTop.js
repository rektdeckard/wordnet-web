import { useEffect } from "react";
import { withRouter } from "react-router-dom";

/* eslint-disable react-hooks/exhaustive-deps */
const ScrollToTop = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
};

export default withRouter(ScrollToTop);
