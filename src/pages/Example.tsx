import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { postedSticker } from "../recoil/sticker/atom";

interface Position {
  x: number;
  y: number;
}

const Example: React.FC = () => {
  const [deltaPosition, setDeltaPosition] = useState<Position>({ x: 0, y: 0 });
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [stickers, setStickers] = useRecoilState(postedSticker);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("myComponentScrollPosition");
    if (savedScrollPosition && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
    console.log(stickers);
  }, []);

  useEffect(() => {
    console.log(deltaPosition);
  }, [deltaPosition]);

  const handleMovePage = () => {
    //스크롤 위치 고정
    if (scrollRef.current) {
      sessionStorage.setItem("myComponentScrollPosition", scrollRef.current.scrollTop.toString());
    }
    navigate("/sticker-picker");
  };

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
        </InnerWrapper>
      </OutWrapper>
    </>
  );
};

export default Example;

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
