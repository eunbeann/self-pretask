import Draggable from "react-draggable";
import { useCallback, useEffect, useState } from "react";
import { BabyChangingStation } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { positionState } from "../recoil/sticker/atom";
// interface StickerProps {
//   text: string;
// }
function Sticker() {
  // function Sticker(props: StickerProps) {
  // const { text } = props;

  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useRecoilState(positionState);
  const [controlledPosition, setControlledPosition] = useState({ x: -400, y: 200 });

  useEffect(() => {
    console.log(activeDrags);
    console.log(deltaPosition.x.toFixed(0), ",", deltaPosition.y.toFixed(0));
  }, [activeDrags, deltaPosition]);

  const handleDrag = useCallback(
    (e, ui) => {
      const { x, y } = deltaPosition;
      setDeltaPosition({
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      });
    },
    [deltaPosition],
  );

  const onStart = useCallback(() => {
    setActiveDrags(activeDrags + 1);
  }, [activeDrags]);

  const onStop = useCallback(() => {
    setActiveDrags(activeDrags - 1);
  }, [activeDrags]);

  const dragHandlers = { position: deltaPosition, onStart: onStart, onStop: onStop };

  return (
    <Draggable onDrag={handleDrag} bounds="parent" {...dragHandlers}>
      <BabyChangingStation fontSize="large" />
      {/* {text} */}
      {/* <div>Current Position: {`(${position.x}, ${position.y})`}</div> */}
    </Draggable>
  );
}

export default Sticker;
