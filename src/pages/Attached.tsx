import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { postedSticker, postedStickerProps } from "../recoil/sticker/atom";
import { useRecoilState } from "recoil";

interface Position {
  x: number;
  y: number;
}

const Attached: React.FC = () => {
  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState<Position>({ x: 0, y: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const storedValue = sessionStorage.getItem("myComponentScrollPosition");
  const savedScrollPosition = storedValue !== null ? parseInt(storedValue, 10) : 0;
  const [stickerState, setStickerState] = useState<postedStickerProps>({
    postedStickerId: 0,
    stickerImage: "",
    positionX: 0,
    positionY: savedScrollPosition,
  });
  const [stickers, setStickers] = useRecoilState(postedSticker);

  const { sticker } = location.state;

  useEffect(() => {
    if (savedScrollPosition && scrollRef.current) {
      scrollRef.current.scrollTop = savedScrollPosition;
    }
    setStickerState((prev) => ({ ...prev, stickerImage: sticker.stickerImage }));
  }, []);

  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { positionX, positionY } = stickerState;
    setStickerState((prev) => ({
      ...prev,
      positionX: positionX + ui.deltaX,
      positionY: positionY + ui.deltaY,
    }));
  };

  useEffect(() => {
    console.log("savedScrollPosition", savedScrollPosition);
    console.log("-------------------------------");
    console.log("stickerState", stickerState);
    console.log("-------------------------------");
    console.log("activeDrags", activeDrags);
  }, [stickerState, savedScrollPosition]);

  const onStart = () => setActiveDrags((prev) => prev + 1);
  const onStop = () => setActiveDrags((prev) => prev - 1);

  const handleMovePage = () => {
    //스크롤 위치 고정
    if (scrollRef.current) {
      sessionStorage.setItem("myComponentScrollPosition", scrollRef.current.scrollTop.toString());
    }
    navigate("/sticker-picker");
  };

  const handlePostedSticker = () => {
    const newSticker = { ...stickerState, postedStickerId: stickers.length + 1, stickerImage: sticker.stickerImage };

    // 새로운 스티커 객체를 기존 배열에 추가
    setStickers([...stickers, newSticker]);
    navigate("/example");

    sessionStorage.removeItem("myComponentScrollPosition");
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };

  return (
    <>
      <Header>HEADER</Header>
      <h1>Draggable Stickers</h1>
      <button onClick={handleMovePage}>
        <p style={{ fontSize: "2rem", fontWeight: "400" }}>Open StickerPack</p>
      </button>
      <OutWrapper
        className="box"
        ref={scrollRef}
        style={{
          height: "87vh",
          width: "100%",
          position: "relative",
          overflow: "auto",
          padding: "0",
          marginBottom: "5rem",
        }}>
        <InnerWrapper style={{ height: "2000px", padding: "5px" }}>
          <div className="box">위치확인용박스에용</div>
          {stickers.map((data) => (
            <Draggable positionOffset={{ x: data.positionX, y: data.positionY }} onStart={() => false}>
              <div
                style={{
                  background: `url(${data.stickerImage})`,
                  width: "10rem",
                  height: "10rem",
                  backgroundPosition: "center",
                  backgroundSize: "10rem",
                  fontSize: "2rem",
                  position: "absolute",
                }}></div>
            </Draggable>
          ))}
          <Draggable
            defaultPosition={{ x: 0, y: savedScrollPosition }}
            onDrag={handleDrag}
            bounds="parent"
            {...dragHandlers}>
            <div
              style={{
                border: "solid 1px red",
                background: `url(${sticker.stickerImage})`,
                width: "10rem",
                height: "10rem",
                backgroundPosition: "center",
                backgroundSize: "10rem",
                position: "absolute",
              }}
            />
          </Draggable>
        </InnerWrapper>
        <Button variant="choose" onClick={handlePostedSticker}>
          부착 하기
        </Button>
      </OutWrapper>
    </>
  );
};

export default Attached;

const OutWrapper = styled.div`
  background-color: beige;
`;

const InnerWrapper = styled.div`
  background-color: pink;
`;

const Header = styled.header`
  padding: 2rem;
  font-size: 2rem;
  font-weight: 500;
`;
