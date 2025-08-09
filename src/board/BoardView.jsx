import React, { useRef, useEffect, useState } from "react";
import { JSXGraph } from "jsxgraph";
import Toolbar from "./Toolbar";
import Board from "./Board";

const actions = {
  select: (e, board) => {},
  point: (e, board) => {
    console.log("point has been called");
    const coords = board.getUsrCoordsOfMouse(e);
    board.create("point", coords);
  },
  line: (e, board) => {},
  polygon: (e, board) => {},
  circle: (e, board) => {},
};

function BoardView() {
  const boardRef = useRef(null);
  const [board, setBoard] = useState(null);
  const [mode, setMode] = useState("select");
  const actionRef = useRef(null);
  const [selected, setSelected] = useState([]);

  function handleSetAction(newMode) {
    if (!board) return;

    if (actionRef.current) {
      board.off("down", actionRef.current);
    }

    const newAction = (e) => actions[newMode](e, board);
    console.log("newAction derives from", actions[newMode]);
    board.on("down", newAction);
    actionRef.current = newAction;
    console.log("set the action to", actionRef.current);

    setMode(newMode);
  }

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

  useEffect(() => {
    if (board) {
      handleSetAction("select");
    }
  }, [board]);

  return (
    <div>
      {board && <Toolbar board={board} onSetAction={handleSetAction} />}
      <Board boardRef={boardRef} onAction={actionRef.current} />
    </div>
  );
}

export default BoardView;
