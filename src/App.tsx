import { Global } from "@emotion/react";
import Router from "./Router";
import gStyle from "./styles/globalStyle";

function App() {
  return (
    <>
      <Global styles={gStyle} />
      <Router />
    </>
  );
}

export default App;
