import React from "react";

function ToolbarButton({ text, onClick }) {
  return (
    <button
      className="bg-gray-200 p-2 rounded-xs text-blue-800 font-bold hover:bg-gray-300 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Toolbar({ board }) {
  function handlePoint() {
    board.on("down", function (e) {
      const coords = board.getUsrCoordsOfMouse(e);
      board.create("point", coords);
    });
  }

  return (
    <div className="bg-amber-600 p-1 text-white flex gap-2">
      <ToolbarButton text="Point" onClick={handlePoint} />
      <ToolbarButton text="Line" />
      <ToolbarButton text="Polygon" />
      <ToolbarButton text="Circle" />
    </div>
  );
}

export default Toolbar;
