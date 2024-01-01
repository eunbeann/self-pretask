import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Sticker from "../components/Sticker";
function DraggablePage() {
  return (
    <div>
      <h1>Draggable Stickers</h1>
      <Button>
        <Link to="/sticker-picker">Open StickerPack</Link>
      </Button>
      <div className="box" style={{ position: "relative", overflow: "auto", padding: "0" }}>
        <div style={{ height: "200vh", width: "100vw", padding: "10px", backgroundColor: "beige" }}>
          <Sticker />
        </div>
      </div>
    </div>
  );
}
export default DraggablePage;
