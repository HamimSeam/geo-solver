import React, { useRef, useEffect, useState } from "react";
import { JSXGraph } from "jsxgraph";
import Toolbar from "../board/Toolbar";
import Board from "../board/Board";

function BoardView() {
  const boardRef = useRef(null);
  const [board, setBoard] = useState(null);
  const [mode, setMode] = useState("select");
  const actionRef = useRef(null);
  const [selected, setSelected] = useState([]);

  const actions = {
    select: (e) => {},
    point: (e) => {
      const coords = board.getUsrCoordsOfMouse(e);
      board.create("point", coords);
    },
    line: (e) => {
      const point = getSelectedObject(e);
      if (!point) return;

      setSelected((prev) => {
        if (prev.length === 0) {
          return [point];
        } else {
          board.create("line", [prev[0], point]);
          return [];
        }
      });
    },
    polygon: (e) => {
      const point = getSelectedObject(e);
      if (!point) return;

      setSelected((prev) => {
        if (prev.length === 0) {
          return [point];
        } else if (prev[0] !== point) {
          return [...prev, point];
        } else {
          board.create("polygon", [...prev, point]);
          return [];
        }
      });
    },
    circle: (e) => {
      const point = getSelectedObject(e);
      if (!point) return;

      setSelected((prev) => {
        if (prev.length === 0) {
          return [point];
        } else {
          board.create("circle", [prev[0], point]);
          return [];
        }
      });
    },
  };

  function handleSetAction(newMode) {
    if (!board) return;

    if (actionRef.current) {
      board.off("down", actionRef.current);
    }

    const newAction = (e) => actions[newMode](e);
    board.on("down", newAction);
    actionRef.current = newAction;

    setMode(newMode);
  }

  function getSelectedObject(e) {
    const objects = board.getAllObjectsUnderMouse(e);
    if (objects.length === 0) return null;
    const object = objects[0];
    if (object.elType !== "point") return null;
    return object;
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
