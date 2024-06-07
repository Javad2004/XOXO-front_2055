const ResultPage = ({winner, resultPage}) => {
    return (
        <>
            <div className="fixed_size2 justify-content-center text-white" style={{display: resultPage}}>
                <h1 id="result">{winner}</h1>
            </div>
            <div className="fixed_size2 justify-content-center my-5" style={{display: resultPage}}>
                <a href='/game' className="col-6 btn1 rounded-5 border-0 text-white text-center text-decoration-none py-3" type="button">REPLAY</a>
                <a href='/' className="col-6 btn2 rounded-5 border-0 text-white text-center text-decoration-none py-3" type="button">HOME</a>
            </div> 
        </>
    )
}

export default ResultPage