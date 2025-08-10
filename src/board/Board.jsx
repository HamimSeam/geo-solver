import { JSXGraph } from "jsxgraph";
import { useRef, useEffect } from "react";

function Board({ boardRef, onAction }) {
  return (
    <div
      ref={boardRef}
      id="box"
      className="jxgbox h-full flex-1"
      onClick={onAction}
    ></div>
  );
}

export default Board;
