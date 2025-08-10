import React, { useState } from "react";

let nextId = 1;

function Proof({ rows, onEditRow }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Statements</th>
          <th>Reasons</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={`row-${i}`}>
            <td>
              <input
                type="text"
                value={row.statement}
                onChange={(e) => onEditRow(row.id, "statement", e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={row.reason}
                onChange={(e) => onEditRow(row.id, "reason", e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ProofEditor() {
  const [rows, setRows] = useState([
    { id: "1", statement: "", reason: "Given" },
  ]);

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
      <Proof rows={rows} onEditRow={handleEditRow} />
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
