import React, { useState } from "react";
import LatexEditor from "../components/LatexEditor";

let nextId = 2;

function Proof({ rows, onEditRow, selected, onSetSelected }) {
  console.log(selected);
  return (
    <table>
      <thead>
        <tr>
          <th>Statements</th>
          <th>Reasons</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td onClick={() => onSetSelected(`${row.id}-statement`)}>
              <LatexEditor
                value={row.statement}
                isEditing={selected === `${row.id}-statement`}
                onChange={(value) => onEditRow(row.id, "statement", value)}
              />
            </td>
            <td onClick={() => onSetSelected(`${row.id}-reason`)}>
              <LatexEditor
                value={row.reason}
                isEditing={selected === `${row.id}-reason`}
                onChange={(value) => onEditRow(row.id, "reason", value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProofEditor() {
  const [rows, setRows] = useState([{ id: 1, statement: "", reason: "Given" }]);

  const [selected, setSelected] = useState(null);

  function handleAddRow() {
    // if (rows[rows.length - 1].statement === "") return;

    setRows((prevRows) => [
      ...prevRows,
      { id: nextId, statement: "", reason: "" },
    ]);
    nextId++;
  }

  function handleEditRow(id, field, value) {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  }

  function handleDeleteRow() {
    setRows((prevRows) => prevRows.slice(0, -1));
  }
  return (
    <div>
      <Proof
        rows={rows}
        onEditRow={handleEditRow}
        selected={selected}
        onSetSelected={setSelected}
      />
      <button
        className="bg-blue-900 text-white p-2 rounded-2xl"
        onClick={handleAddRow}
      >
        +
      </button>
      <button
        className="bg-red-900 text-white p-2 rounded-2xl"
        onClick={handleDeleteRow}
      >
        -
      </button>
    </div>
  );
}

export default ProofEditor;
