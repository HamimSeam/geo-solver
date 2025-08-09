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

function Toolbar({ onSetAction }) {
  return (
    <div className="bg-amber-600 p-1 text-white flex gap-2">
      <ToolbarButton text="🫳" onClick={() => onSetAction("select")} />
      <ToolbarButton text="Point" onClick={() => onSetAction("point")} />
      <ToolbarButton text="Line" onClick={() => onSetAction("line")} />
      <ToolbarButton text="Polygon" onClick={() => onSetAction("polygon")} />
      <ToolbarButton text="Circle" onClick={() => onSetAction("circle")} />
    </div>
  );
}

export default Toolbar;
