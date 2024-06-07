import HomePage from './homePage/HomePage';
import LoginPage from './loginPage/LoginPage';
import GamePage from './gamePage/GamePage';
import TablePage from './tablePage/TablePage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Router = () => {
    const route = createBrowserRouter([
        {
            path:'/',
            element: <HomePage/>
        },
        {
            path:'/login',
            element: <LoginPage/>
        },
        {
            path:'/game',
            element: <GamePage/>
        },
        {
            path:'/scores-table',
            element: <TablePage/>
        }
    ])

    return (
        <RouterProvider router={route}/>
    )
}

export default Router;