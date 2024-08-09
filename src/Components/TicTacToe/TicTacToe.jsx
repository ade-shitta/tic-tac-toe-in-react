import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let [xScore, setXScore] = useState(0);
    let [oScore, setOScore] = useState(0);
    let titleRef = useRef(null);
    let cell1 = useRef(null);
    let cell2 = useRef(null);
    let cell3 = useRef(null);
    let cell4 = useRef(null);
    let cell5 = useRef(null);
    let cell6 = useRef(null);
    let cell7 = useRef(null);
    let cell8 = useRef(null);
    let cell9 = useRef(null);

    let cell_array = [cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9];

    

    const toggle = (e, num) => {
        if (lock) {
            return;
        }
        if (data[num] !== "") {
            return;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = '<img src="' + cross_icon + '" alt="cross">';
            data[num] = "x";
        } else {
            e.target.innerHTML = '<img src="' + circle_icon + '" alt="circle">';
            data[num] = "o";
        }
        setCount(count + 1);
        checkWin();
    };

    const checkWin = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            setXScore(prevXScore => {
                const newScore = prevXScore + 1;
                checkScore(newScore, oScore); // Pass the updated X score
                return newScore;
            });
            titleRef.current.innerHTML = 'Congratulations! <img src="' + cross_icon + '" alt="cross"> Won';
        } else {
            setOScore(prevOScore => {
                const newScore = prevOScore + 1;
                checkScore(xScore, newScore); // Pass the updated O score
                return newScore;
            });
            titleRef.current.innerHTML = 'Congratulations! <img src="' + circle_icon + '" alt="circle"> Won';
        }
    };
       

    const checkScore = (xScore, oScore) => {
        // Check if either player has 3 points
        if (xScore === 3 || oScore === 3) {
            titleRef.current.innerHTML = 'Game Over - Player ' + (xScore === 3 ? 'X' : 'O') + ' Won The Game';
            setLock(true);
            resetScores(); // Reset scores after the game is over
            return; // Exit the function to avoid further checks
        }
    
        // Check if a player has 2 points and the other has 0 points
        if (xScore === 2 && oScore === 0) {
            titleRef.current.innerHTML = 'Game Over - Player ' + (xScore === 3 ? 'X' : 'O') + ' Won The Game';
            setLock(true);
            resetScores();
            return;
        }
    
        if (xScore === 0 && oScore === 2) {
            titleRef.current.innerHTML = 'Game Over - Player ' + (xScore === 3 ? 'X' : 'O') + ' Won The Game';
            setLock(true);
            resetScores();
            return;
        }
    }
    
    

    const reset = () => {
        setLock(false);
        setCount(0);
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'Tic Tac Toe Game In React';
        cell_array.forEach((cell) => {
            cell.current.innerHTML = "";
        });
    };

    const resetScores = () => {
        setXScore(0);
        setOScore(0);
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>Tic Tac Toe Game In React</h1>
            <div className="points">
                <div className="xPoints">Player X: {xScore}</div>
                <div className="oPoints">Player O: {oScore}</div>
            </div>
            <div className="board">
                <div className="row1">
                    <div className="cells" ref={cell1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="cells" ref={cell2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="cells" ref={cell3} onClick={(e) => { toggle(e, 2) }}></div>
                </div>
                <div className="row2">
                    <div className="cells" ref={cell4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="cells" ref={cell5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="cells" ref={cell6} onClick={(e) => { toggle(e, 5) }}></div>
                </div>
                <div className="row3">
                    <div className="cells" ref={cell7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="cells" ref={cell8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="cells" ref={cell9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
            <button className="reset-scores" onClick={resetScores}>Reset Scores</button>
        </div>
    );
}

export default TicTacToe;
