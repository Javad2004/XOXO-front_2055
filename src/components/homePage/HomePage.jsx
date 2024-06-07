import Title from '../Title'

const HomePage = () => {
    return (
        <div className="h-100 d-flex flex-column justify-content-between">
            <div>
                <Title/>
            </div>
            <div className="fixed_size2 d-flex flex-column align-items-center">
                <a href='/login' className="btn1 col-3 rounded-5 border-0 text-white text-center text-decoration-none py-3 my-3" type="button">START</a>
                <a href='/scores-table' className="btn2 col-3 rounded-5 border-0 text-white text-center text-decoration-none py-3 my-3" type="button">SCORES</a>
            </div>
            <p className="text-center my-5">Proved By JAVAD 2012</p>
        </div>
    )
}

export default HomePage