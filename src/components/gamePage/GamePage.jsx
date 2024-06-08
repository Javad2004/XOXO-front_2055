import Title from '../Title'
import ResultPage from './ResultPage';
import Cell from './Cell';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const GamePage = () => {

    const [board, setBoard] = useState(Array(9).fill(""));

    const [key, setKey] = useState(0); //This state manages the keys of cells

    const location = useLocation();
    const {player1, player2} = location.state;

    const [gameMode, setGameMode] = useState(true);

    const [playerTurn, setPlayerTurn] = useState(player2);

    const [winner , setWinner] = useState('');
    const [resultPage , setResultPage] = useState('none');
    const [turnDiv , setTurnDiv] = useState('flex');

    const update_users_scores = async (values) => {
        await axios
            .post("http://127.0.0.1:8000/users/update_scors", values)
            .then(() => {
                setResultPage('flex');
            })
            .catch(() => {
                alert("Failed Updating Scores!");
                window.location.href = '/login';
            });
    };

    const changeBoard = (index, content) => {
        const newBoard = [...board];
        newBoard[index] = content;
        setBoard(newBoard);
        reslut_checker(newBoard);
    }

    const checkTicTacToe = (currentBoard) => {
        // Function to check lines (rows, columns, diagonals)
        const checkLine = (a, b, c) => {
            return currentBoard[a] && currentBoard[b] && currentBoard[c] && currentBoard[a] === currentBoard[b] && currentBoard[b] === currentBoard[c];
        };

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (checkLine(i * 3, i * 3 + 1, i * 3 + 2)) {
                return currentBoard[i * 3];
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (checkLine(i, i + 3, i + 6)) {
                return currentBoard[i];
            }
        }

        // Check diagonals
        if (checkLine(0, 4, 8)) {
                return currentBoard[0];
        }
        if (checkLine(2, 4, 6)) {
            return currentBoard[2];
        }

        // Check for a draw
        if (!currentBoard.includes("")) {
            return "It's a draw";
        }
    }

    const reslut_checker = (currentBoard) => {
        const result = checkTicTacToe(currentBoard);

        if (result === 'O') {
            setGameMode(false);
            setTurnDiv('none');
            setWinner(`“${player1}” Wins :)`);
            update_users_scores([{name: player1, status: 'Win'}, {name: player2, status: 'Lose'}]);
        }
        else if (result === 'X') {
            setGameMode(false);
            setTurnDiv('none');
            setWinner(`“${player2}” Wins :)`);
            update_users_scores([{name: player1, status: 'Lose'}, {name: player2, status: 'Win'}]);
        }
        else if (result === "It's a draw") {
            setGameMode(false);
            setTurnDiv('none');
            setResultPage('flex');
            setWinner('Draw!');
        }
    }

    const click_cheker = (style) => {
        if (gameMode === true) {
            if (style.content === '') {
                if (playerTurn === player1) {
                    setPlayerTurn(player2);
                    return {content: 'O', color: 'red'};
                }
                else {
                    setPlayerTurn(player1);
                    return {content: 'X', color: '#3B2A9F'};
                }
            }
            else {
                return style;   
            }
        }
        else {
            return style;
        }

    }

    const replay = () => {
        setWinner('');
        setTurnDiv('flex');
        setResultPage('none');
        setGameMode(true);
        setBoard(Array(9).fill(""));
        setKey(key + 1); // Updates the key to force re-render of cells
    }


    return (
        <div className="h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center">
                <a href='/login' className="btn1 position-absolute fixed_size2 col-2 rounded-5 border-0 text-white text-center text-decoration-none py-3 m-3" type="button">Back</a>
                <Title/>
            </div>
            <div className="my-5 d-flex position-relative justify-content-end">
                <div className="col-12 d-flex flex-column align-items-center">
                    <div className="col-4 fixed_size1 d-flex text-white justify-content-between">
                        <h3 className="text-start">“{player1}” is: O</h3>
                        <h3 className="text-end">“{player2}” is: X</h3>
                    </div>
                    <div className="col-4 d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                            <Cell key={`cell-${key}-0`} click_checker={click_cheker} changeBoard={changeBoard} index={0}/>
                            <Cell key={`cell-${key}-1`} click_checker={click_cheker} changeBoard={changeBoard} index={1}/>
                            <Cell key={`cell-${key}-2`} click_checker={click_cheker} changeBoard={changeBoard} index={2}/>
                        </div>
                        <div className="d-flex gap-2">
                            <Cell key={`cell-${key}-3`} click_checker={click_cheker} changeBoard={changeBoard} index={3}/>
                            <Cell key={`cell-${key}-4`} click_checker={click_cheker} changeBoard={changeBoard} index={4}/>
                            <Cell key={`cell-${key}-5`} click_checker={click_cheker} changeBoard={changeBoard} index={5}/>
                        </div>
                        <div className="d-flex gap-2">
                            <Cell key={`cell-${key}-6`} click_checker={click_cheker} changeBoard={changeBoard} index={6}/>
                            <Cell key={`cell-${key}-7`} click_checker={click_cheker} changeBoard={changeBoard} index={7}/>
                            <Cell key={`cell-${key}-8`} click_checker={click_cheker} changeBoard={changeBoard} index={8}/>
                        </div>
                    </div>
                </div>
                <div className="h-100 col-4 position-absolute px-5 justify-content-center d-flex flex-column">
                    <div className="fixed_size2 justify-content-center text-white" style={{display: turnDiv}}>
                        <h1>“{playerTurn}” Turn</h1>    
                    </div>
                    <ResultPage winner={winner} resultPage={resultPage} replay={() => replay()}/>
                </div>
            </div>      
        </div>
    )
}


export default GamePage