import React, { CSSProperties, ReactNode, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface Position {
  x: number;
  y: number;
}

const Origin: React.FC = () => {
  const [activeDrags, setActiveDrags] = useState(0);
  const [deltaPosition, setDeltaPosition] = useState<Position>({ x: 0, y: 0 });
  const [controlledPosition, setControlledPosition] = useState<Position>({ x: -400, y: 200 });

  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = deltaPosition;
    setDeltaPosition({
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    });
  };

  const onStart = () => setActiveDrags((prev) => prev + 1);
  const onStop = () => setActiveDrags((prev) => prev - 1);

  const onDrop = (e: React.MouseEvent<HTMLDivElement>) => {
    setActiveDrags((prev) => prev - 1);
    if (e.currentTarget.classList.contains("drop-target")) {
      alert("Dropped!");
      e.currentTarget.classList.remove("hovered");
    }
  };

  const onDropAreaMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeDrags) {
      e.currentTarget.classList.add("hovered");
    }
  };

  const onDropAreaMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("hovered");
  };

  const adjustXPos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x: x - 10, y });
  };

  const adjustYPos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = controlledPosition;
    setControlledPosition({ x, y: y - 10 });
  };

  const onControlledDrag = (e: DraggableEvent, position: Position) => {
    setControlledPosition(position);
  };

  const onControlledDragStop = (e: DraggableEvent, position: Position) => {
    onControlledDrag(e, position);
    onStop();
  };

  const dragHandlers = { onStart: onStart, onStop: onStop };
  return (
    <div>
      <h1>React Draggable</h1>
      <p>Active DragHandlers: {activeDrags}</p>
      <p>
        <a href="https://github.com/STRML/react-draggable/blob/master/example/example.js">Demo Source</a>
      </p>
      <Draggable {...dragHandlers}>
        <div className="box">I can be dragged anywhere</div>
      </Draggable>
      <Draggable axis="x" {...dragHandlers}>
        <div className="box cursor-x">I can only be dragged horizonally (x axis)</div>
      </Draggable>
      <Draggable axis="y" {...dragHandlers}>
        <div className="box cursor-y">I can only be dragged vertically (y axis)</div>
      </Draggable>
      <Draggable onStart={() => false}>
        <div className="box">I don't want to be dragged</div>
      </Draggable>
      <Draggable onDrag={handleDrag} {...dragHandlers}>
        <div className="box">
          <div>I track my deltas</div>
          <div>
            x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}
          </div>
        </div>
      </Draggable>
      <Draggable handle="strong" {...dragHandlers}>
        <div className="box no-cursor">
          <strong className="cursor">
            <div>Drag here</div>
          </strong>
          <div>You must click my handle to drag me</div>
        </div>
      </Draggable>
      <Draggable handle="strong">
        <div className="box no-cursor" style={{ display: "flex", flexDirection: "column" }}>
          <strong className="cursor">
            <div>Drag here</div>
          </strong>
          <div style={{ overflow: "scroll" }}>
            <div style={{ background: "yellow", whiteSpace: "pre-wrap" }}>
              I have long scrollable content with a handle
              {"\n" + Array(40).fill("x").join("\n")}
            </div>
          </div>
        </div>
      </Draggable>
      <Draggable cancel="strong" {...dragHandlers}>
        <div className="box">
          <strong className="no-cursor">Can't drag here</strong>
          <div>Dragging here works</div>
        </div>
      </Draggable>
      <Draggable grid={[25, 25]} {...dragHandlers}>
        <div className="box">I snap to a 25 x 25 grid</div>
      </Draggable>
      <Draggable grid={[50, 50]} {...dragHandlers}>
        <div className="box">I snap to a 50 x 50 grid</div>
      </Draggable>
      <Draggable bounds={{ top: -100, left: -100, right: 100, bottom: 100 }} {...dragHandlers}>
        <div className="box">I can only be moved 100px in any direction.</div>
      </Draggable>
      <Draggable {...dragHandlers}>
        <div className="box drop-target" onMouseEnter={onDropAreaMouseEnter} onMouseLeave={onDropAreaMouseLeave}>
          I can detect drops from the next box.
        </div>
      </Draggable>
      {/* <Draggable {...dragHandlers} onStop={onDrop}>
        <div className={`box ${activeDrags ? "no-pointer-events" : ""}`}>I can be dropped onto another box.</div>
      </Draggable> */}
      <div
        className="box"
        style={{ height: "500px", width: "500px", position: "relative", overflow: "auto", padding: "0" }}>
        <div style={{ height: "1000px", width: "1000px", padding: "10px" }}>
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I can only be moved within my offsetParent.
              <br />
              <br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
          <Draggable bounds="parent" {...dragHandlers}>
            <div className="box">
              I also can only be moved within my offsetParent.
              <br />
              <br />
              Both parent padding and child margin work properly.
            </div>
          </Draggable>
        </div>
      </div>
      <Draggable bounds="body" {...dragHandlers}>
        <div className="box">I can only be moved within the confines of the body element.</div>
      </Draggable>
      <Draggable {...dragHandlers}>
        <div className="box" style={{ position: "absolute", bottom: "100px", right: "100px" }}>
          I already have an absolute position.
        </div>
      </Draggable>
      {/* <Draggable {...dragHandlers}> */}
      {/* <RemWrapper>
          <div className="box rem-position-fix" style={{ position: "absolute", bottom: "6.25rem", right: "18rem" }}>
            I use <span style={{ fontWeight: 700 }}>rem</span> instead of <span style={{ fontWeight: 700 }}>px</span>{" "}
            for my transforms. I also have absolute positioning.
            <br />
            <br />I depend on a CSS hack to avoid double absolute positioning.
          </div>
        </RemWrapper> */}
      {/* </Draggable> */}
      <Draggable defaultPosition={{ x: 25, y: 25 }} {...dragHandlers}>
        <div className="box">{"I have a default position of {x: 25, y: 25}, so I'm slightly offset."}</div>
      </Draggable>
      <Draggable positionOffset={{ x: "-10%", y: "-10%" }} {...dragHandlers}>
        <div className="box">
          {"I have a default position based on percents {x: '-10%', y: '-10%'}, so I'm slightly offset."}
        </div>
      </Draggable>
      <Draggable position={controlledPosition} {...dragHandlers} onDrag={onControlledDrag}>
        <div className="box">
          My position can be changed programmatically. <br />I have a drag handler to sync state.
          <div>
            <a href="#" onClick={adjustXPos}>
              Adjust x ({controlledPosition.x})
            </a>
          </div>
          <div>
            <a href="#" onClick={adjustYPos}>
              Adjust y ({controlledPosition.y})
            </a>
          </div>
        </div>
      </Draggable>
      <Draggable position={controlledPosition} {...dragHandlers} onStop={onControlledDragStop}>
        <div className="box">
          My position can be changed programmatically. <br />I have a dragStop handler to sync state.
          <div>
            <a href="#" onClick={adjustXPos}>
              Adjust x ({controlledPosition.x})
            </a>
          </div>
          <div>
            <a href="#" onClick={adjustYPos}>
              Adjust y ({controlledPosition.y})
            </a>
          </div>
        </div>
      </Draggable>
    </div>
  );
};

interface RemWrapperProps {
  style: CSSProperties;
  remBaseline?: number;
  children?: ReactNode;
}

// const RemWrapper: FC<RemWrapperProps> = ({ children, style, remBaseline = 16 }) => {
//   const translateTransformToRem = (transform: string, remBaseline: number): string => {
//     const convertedValues = transform
//       .replace("translate(", "")
//       .replace(")", "")
//       .split(",")
//       .map((px) => px.replace("px", ""))
//       .map((px) => parseInt(px, 10) / remBaseline)
//       .map((x) => `${x}rem`);
//     const [x, y] = convertedValues;

//     return `translate(${x}, ${y})`;
//   };

//     const editedStyle: CSSProperties = {
//       idchildren
//     ...children.props.style,
//     ...style,
//     transform: style.transform ? translateTransformToRem(style.transform, remBaseline) : "",
//   };

//   return React.cloneElement(children, {
//     ...children.props,
//     style: editedStyle,
//   });
// };

export default Origin;
