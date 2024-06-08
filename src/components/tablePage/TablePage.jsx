import axios from 'axios'
import Title from '../Title'
import { useEffect, useState } from 'react';

const TablePage = () => {

    const [playerData , setPlayerData] = useState([])

    const getData = async() => {
        const res = await axios
        .get("http://127.0.0.1:8000/users/top10")
        .catch(() => {
            alert("Failed Fetching Data!")
            window.location.href = '/';
        });
        setPlayerData(res.data);
    }

    useEffect(() => {
        getData();
    },[]);

    return (
        <div className="h-100 d-flex flex-column">
            <div className="d-flex align-items-center">
                <a href='/' className="btn1 position-absolute fixed_size2 col-2 rounded-5 border-0 text-white text-center text-decoration-none py-3 m-3" type="button">Back</a>
                <Title/>
            </div>
            <div className="d-flex flex-column align-items-center mb-5 mt-3">
                <h3 className="fixed_font1 text-white my-5">Score Table(Top10)</h3>
                <table className="col-10 text-white text-center">
                    <thead className="fixed_font1">
                        <tr>
                            <th className="col-4" scope="col"><h3>Row</h3></th>
                            <th className="col-4" scope="col"><h3>Name</h3></th>
                            <th className="col-4" scope="col"><h3>Score</h3></th>
                        </tr>
                    </thead>
                    <tbody className="fixed_size4">
                        {playerData?.map((value, index) => {
                            return (
                                <tr key={value.id}>
                                    <td>{index+1}</td>
                                    <td>{value.name}</td>
                                    <td>{value.score}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}



export default TablePage