import { Button } from "@mui/material";
import { useState } from "react";
import QueryPage from "./Query";
import DraggablePage from "./Draggable";

function Main() {
  const [isDragView, setIsDragView] = useState(false);
  return (
    <>
      <Button onClick={() => setIsDragView((prev) => !prev)}>change the view</Button>
      {isDragView ? (
        <div>
          <QueryPage />
        </div>
      ) : (
        <div>
          <DraggablePage />
        </div>
      )}
    </>
  );
}

export default Main;
