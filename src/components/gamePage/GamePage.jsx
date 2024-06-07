import Title from '../Title'
import ResultPage from './ResultPage';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const GamePage = () => {

    const location = useLocation();
    const {player1, player2} = location.state;

    const [gameMode, setGameMode] = useState(true);
    const [player1turn, setPlayer1Turn] = useState(true);
    const [winner , setWinner] = useState(null);
    const [resultPage , setResultPage] = useState('none');

    const update_users_scores = async (values) => {
        await axios
            .post("http://127.0.0.1:8000/users/update_scors", values)
            .then(() => {
                setResultPage('flex');
            })
            .catch(() => {
                alert("Failed To Update Scores!");
            });
    };

    const checkTicTacToe = () => {
        // Retrieve the values from the divs
        const board = [];
        for (let i = 1; i <= 9; i++) {
            board.push(document.getElementById(i.toString()).textContent.trim());
        }

        // Function to check lines (rows, columns, diagonals)
        const checkLine = (a, b, c) => {
            return board[a] && board[b] && board[c] && board[a] === board[b] && board[b] === board[c];
        };

        // Check rows
        for (let i = 0; i < 3; i++) {
            if (checkLine(i * 3, i * 3 + 1, i * 3 + 2)) {
                return board[i * 3];
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (checkLine(i, i + 3, i + 6)) {
                return board[i];
            }
        }

        // Check diagonals
        if (checkLine(0, 4, 8)) {
                return board[0];
        }
        if (checkLine(2, 4, 6)) {
            return board[2];
        }

        // Check for a draw
        if (!board.includes("")) {
            return "It's a draw";
        }
    }

    const reslut_checker = () => {
        let result = checkTicTacToe();

        if (result === 'O') {
            setGameMode(false);
            setWinner(`“${player1}” Wins :)`);
            update_users_scores([{name: player1, status: 'Win'}, {name: player2, status: 'Lose'}]);
            console.log(gameMode)
        }
        else if (result === 'X') {
            setGameMode(false);
            setWinner(`“${player2}” Wins :)`);
            update_users_scores([{name: player1, status: 'Lose'}, {name: player2, status: 'Win'}]);
        }
        else if (result === "It's a draw") {
            setGameMode(false);
            setWinner('Draw!');
        }
    }

    const click_cheker = (index) => {
        if (gameMode === true) {
            if (player1turn) {
                if (document.getElementById(index).innerHTML === "") {
                    document.getElementById(index).innerHTML = 'O';
                    document.getElementById(index).style.color = 'red';
                    setPlayer1Turn(false);
                    reslut_checker();
                }
            }
            else {
                if (document.getElementById(index).innerHTML === "") {
                    document.getElementById(index).innerHTML = 'X';
                    document.getElementById(index).style.color = '#3B2A9F';
                    setPlayer1Turn(true);
                    reslut_checker();
                }
            }
        }
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
                        <h3 className="text-start">Blue is: O</h3>
                        <h3 className="text-end">Red is: X</h3>
                    </div>
                    <div className="col-4 d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('1')}}><span id='1'></span></div>
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('2')}}><span id='2'></span></div>
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('3')}}><span id='3'></span></div>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('4')}}><span id='4'></span></div>
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('5')}}><span id='5'></span></div>
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('6')}}><span id='6'></span></div>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('7')}}><span id='7'></span></div>
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('8')}}><span id='8'></span></div>
                            <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {click_cheker('9')}}><span id='9'></span></div>
                        </div>
                    </div>
                    
                </div>
                <div className="h-100 col-4 position-absolute px-5 justify-content-center d-flex flex-column">
                    <ResultPage winner={winner} resultPage={resultPage}/>
                </div>
            </div>      
        </div>
    )
}



export default GamePage