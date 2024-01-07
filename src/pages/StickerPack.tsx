import { useState } from "react";

// component
// style
import * as S from "./StickerPack.style.ts";
import StickerList from "../components/StickerList";
import Button from "../components/common/Button/index.tsx";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export interface stickerType {
  stickerId: number;
  stickerImage: string;
}

function StickerPack() {
  const [isSelectedSticker, setIsSelectedSticker] = useState<stickerType>({
    stickerId: 0,
    stickerImage: "",
  });
  const navigate = useNavigate();

  const handleStickerClick = (newId: number, newImage: string) => {
    setIsSelectedSticker((prevState) => ({
      ...prevState,
      stickerId: newId,
      stickerImage: newImage,
    }));
  };

  const handleClickDone = () => {
    navigate("/attached", { state: { sticker: isSelectedSticker } });
  };

  return (
    <>
      <S.Body>
        <button onClick={() => navigate("/example")}>
          <Close />
        </button>
        <StickerList isSelectedSticker={isSelectedSticker} handleStickerClick={handleStickerClick} />
        <Button variant="choose" disabled={isSelectedSticker.stickerImage === ""} onClick={handleClickDone}>
          선택 완료
        </Button>
      </S.Body>
    </>
  );
}

export default StickerPack;
