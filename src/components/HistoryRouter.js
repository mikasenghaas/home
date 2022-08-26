// from: https://towardsdev.com/react-router-v6-699e291ba6eb
import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

export default function CustomRouter({ history, children }) {
  const [historyState, setHistoryState] = useState({
    location: history.location,
    action: history.action,
  });
  useLayoutEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      setHistoryState({ location, action });
    });
    return unlisten;
  }, [history]);
  return (
    <React.Fragment>
      <BrowserRouter
        navigator={history}
        navigationType={historyState.action}
        location={historyState.location}
      >
        {children}
      </BrowserRouter>
    </React.Fragment>
  );
}
