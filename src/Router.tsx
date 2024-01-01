import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import StickerPicker from "./components/StickerPicker";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sticker-picker" element={<StickerPicker />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
