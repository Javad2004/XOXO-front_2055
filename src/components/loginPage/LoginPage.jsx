import axios from 'axios'
import Title from '../Title'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const navigate = useNavigate();

    const register = async (names) => {
        await axios
            .post("http://127.0.0.1:8000/users/register", names)
            .then(() => {
                navigate('/game', {state: {player1: names[0], player2: names[1]}});
            })
            .catch(() => {
                alert("Registeration Failed!");
            });
    };

    const input_checker = () => {
        if (player1 != '' && player2 != '') {
            register([player1, player2]);
        }
        else {
            alert("Fill The Form")
        }
            
    }

    return (
        <div className="h-100 d-flex flex-column justify-content-between">
            <div className="d-flex align-items-center">
                <a href='/' className="btn1 position-absolute fixed_size2 col-2 rounded-5 border-0 text-white text-center text-decoration-none py-3 m-3" type="button">Back</a>
                <Title/>
            </div>
            <form className="fixed_size3 d-flex flex-column align-items-center my-5">
                <h3 className="fixed_font2 text-center text-white">Fill The Form</h3>
                <input className="col-3 rounded-3 p-3 my-3 text-white" type="text" placeholder="Enter Player One" id='input1' value={player1} onChange={(e) => setPlayer1(e.target.value)}/>
                <input className="col-3 rounded-3 p-3 my-3 text-white" type="text" placeholder="Enter Player Two" id='input2' value={player2} onChange={(e) => setPlayer2(e.target.value)}/>
                <button className="btn1 fixed_size2 col-3 rounded-5 border-0 text-white py-3 my-3" type="button" onClick={() => {input_checker()}}>START GAME</button>
            </form>
            <p className="text-center my-5">Proved By JAVAD 2012</p>
        </div>
    )
}

export default LoginPage