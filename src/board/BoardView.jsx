import React, { useRef, useEffect, useState } from "react";
import { JSXGraph } from "jsxgraph";
import Toolbar from "./Toolbar";
import Board from "./Board";

function BoardView() {
  const boardRef = useRef(null);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    if (!boardRef.current) return;

    const b = JSXGraph.initBoard(boardRef.current.id, {
      keepAspectRatio: true, // ensures square cells
      zoom: {
        wheel: true,
        pinch: true,
        needShift: false,
        factorX: 1.1,
        factorY: 1.1,
        max: 50,
        min: 0.1,
      },
      pan: {
        enabled: true,
        needShift: false,
      },
    });

    // Sample objects
    const p1 = b.create("point", [2.0, 2.0]);
    const p2 = b.create("point", [2.0, 0.0]);
    b.create("circle", [p1, p2]);
    b.create("segment", [p1, p2]);

    setBoard(b);

    return () => {
      JXG.JSXGraph.freeBoard(b);
    };
  }, []);

  return (
    <div>
      {board && <Toolbar board={board} />}
      <Board boardRef={boardRef} />
    </div>
  );
}

export default BoardView;
