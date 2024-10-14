import { useState } from 'react';

function Square({ value, onSquareClick }) {

  return (<button className="square" onClick={onSquareClick}>
    {value}
  </button>);
}

 function Board({xIsNext,squares,onPlay}) {
  const winner=calculateWinner(squares);
  let status;
  if(winner){
    status="Winner:"+winner;
  }else{
    status="Next player:"+(xIsNext?"X":"O");
  }
  function handleClick(i) {
    if (squares[i]||calculateWinner(squares)) return;
    const nextSquares = squares.slice(); //创建squares数组的副本
    if (xIsNext) {
      nextSquares[i] = "X";
    }
    else { nextSquares[i] = "O"; }
    onPlay(nextSquares);
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

    </>

  );

}
export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const[currentMove,setCurrentMove]=useState(0);
  const xIsNext=currentMove%2===0;
  const currentSquares=history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory=[...history.slice(0,currentMove+1),nextSquares]; /*...history 会将 history 数组中的所有元素（每一步棋盘的状态）展开，并复制到新的数组中。
    •	nextSquares 是当前最新的棋盘状态。它作为一个新的元素，添加到展开的 history 数组之后   React 中管理状态时，我们通常需要保持状态的不可变性，即不要直接修改已有的状态，而是创建并返回一个新的状态对象或数组*/
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }
  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }
  const moves=history.map((squares,move)=>{
    let description;
    if(move>0){
      description="Go to move #"+move;
    }else{
      description="Go to game start";
    }
    return(
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    ); /*key 是 React 中一个特殊的保留属性。创建元素时，React 提取 key 属性并将 key 直接存储在返回的元素上。尽管 key 看起来像是作为 props 传递的，但 React 会自动使用 key 来决定要更新哪些组件。组件无法询问其父组件指定的 key。
  
    强烈建议你在构建动态列表时分配适当的 key。如果你没有合适的 key，你可能需要考虑重组你的数据，以便你这样做。
    
    如果没有指定 key，React 会报错，默认使用数组索引作为 key。在尝试重新排序列表项或插入/删除列表项时，使用数组索引作为 key 是有问题的。显式传递 key={i} 可以消除错误，但与数组索引有相同的问题，在大多数情况下不推荐使用。*/
    
    
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], //第一行
    [3, 4, 5], //第二行
    [6, 7, 8], //第三行
    [0, 3, 6], //第一列
    [1, 4, 7], //第二列
    [2, 5, 8],//第三列
    [0, 4, 8], //对角线
    [2, 4, 6] //对角线
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
