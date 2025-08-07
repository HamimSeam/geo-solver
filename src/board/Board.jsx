import { JSXGraph } from "jsxgraph";
import { useRef, useEffect } from "react";

function Board({ boardRef }) {
  return (
    <div
      ref={boardRef}
      id="box"
      className="jxgbox"
      style={{
        width: "1500px",
        height: "750px",
      }}
    ></div>
  );
}

export default Board;
