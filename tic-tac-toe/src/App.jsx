import { useState } from 'react';
import './index.css';

function App() {
  const [turn, setTurn] = useState('X');
  const [cells, setCells] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState(null);

  const combos = {
    across: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
    down: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
    diagonal: [[0, 4, 8], [2, 4, 6]]
  };

  const handleClick = (num) => {
    if (cells[num] !== '' || winner) return; // Prevent clicks if cell is filled or game has a winner

    const newCells = [...cells];
    newCells[num] = turn;
    setCells(newCells);
    checkWinner(newCells);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const checkWinner = (arr) => {
    console.log(arr);
    for (let combo in combos) {  
      combos[combo].forEach((pattern) => { 
        if (arr[pattern[0]] === '' || arr[pattern[1]] === '' || arr[pattern[2]] === '') {
          return;
        } else if (arr[pattern[0]] === arr[pattern[1]] && arr[pattern[1]] === arr[pattern[2]]) {
          setWinner(arr[pattern[0]]);
        }
      });
    }
  };

  const handleReset = () => {
    setWinner(null);
    setCells(Array(9).fill(''));
    setTurn('X'); // Reset turn to 'X'
  };

  const Cell = ({ num }) => {
    const cellValue = cells[num];
    const cellClassName = cellValue ? `text-${cellValue}-500` : 'text-white';

    return (
      <td
        className={`bg-yellow-500 text-gray-600 ${cellClassName} border border-slate-600 p-4 text-center cursor-pointer transition-all duration-300`}
        onClick={() => handleClick(num)}
      >
        {cellValue}
      </td>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <table className="border-collapse">
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => (
                <Cell key={row * 3 + col} num={row * 3 + col} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {winner && <div className="mt-4 text-2xl font-bold">Winner: {winner}</div>}
      <button
        onClick={handleReset}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-700"
      >
        Reset
      </button>
    </div>
  );
}

export default App;
