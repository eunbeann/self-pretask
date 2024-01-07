import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import Example from "./pages/Example";
import Origin from "./pages/Origin";
import StickerPack from "./pages/StickerPack";
import Attached from "./pages/Attached";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sticker-picker" element={<StickerPack />} />
        <Route path="/attached" element={<Attached />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/example" element={<Example />} />
        <Route path="/original" element={<Origin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
