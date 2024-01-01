import { BrowserRouter, Route, Routes } from "react-router-dom";
import Example from "./pages/Example";
import Main from "./pages/Main";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
