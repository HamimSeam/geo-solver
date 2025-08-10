import React, { useRef, useEffect } from "react";
import { JSXGraph } from "jsxgraph";
import Board from "../board/Board";
import ProofEditor from "../proofs/ProofEditor";

function ProofRenderer() {
  const boardRef = useRef(null);

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

    return () => {
      JXG.JSXGraph.freeBoard(b);
    };
  }, []);

  return (
    <div className="flex h-screen p-3 gap-2">
      <ProofEditor />
      <Board boardRef={boardRef} />
    </div>
  );
}

export default ProofRenderer;
