import { useState } from "react"

const Cell = ({click_checker, changeBoard, index}) => {

    const [style, setStyle] = useState({content: '', color: ''});

    const set = () => {
        const newStyle = click_checker(style);
        setStyle(newStyle);
        changeBoard(index, newStyle.content);
    } 

    return (
        <div className="cell bg-black rounded-3 d-flex justify-content-center align-items-center" onClick={() => {set()}}><span style={{color: style.color}}>{style.content}</span></div>
    )

}

export default Cell