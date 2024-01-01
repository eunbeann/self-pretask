import styled from "@emotion/styled";
import { Android, Apple, Call, Computer, MacroOff } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

function StickerPicker() {
  return (
    <BackgroundColor>
      <StickerHeader>
        <Link to="/">
          <ClearIcon fontSize="large" />
        </Link>
      </StickerHeader>
      <StickerBody>
        {ICON_ARRAY.map((icon) => (
          <div style={{ padding: "1rem" }}>{icon}</div>
        ))}
      </StickerBody>
    </BackgroundColor>
  );
}

export default StickerPicker;

const BackgroundColor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const StickerHeader = styled.header`
  display: flex;
  width: 2rem;
  padding: 1rem;
`;

const StickerBody = styled.body`
  display: flex;
  //
`;
const ICON_ARRAY = [
  <Computer fontSize="large" />,
  <Call fontSize="large" />,
  <Apple fontSize="large" />,
  <Android fontSize="large" />,
  <MacroOff fontSize="large" />,
];
