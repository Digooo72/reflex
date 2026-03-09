import {BrowserRouter,Routes,Route} from "react-router-dom"

import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import GamePage from "./pages/GamePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import LeaderboardPage from "./pages/LeaderboardPage"
import ProfilePage from "./pages/ProfilePage"
import NotFoundPage from "./pages/NotFoundPage"

function App(){

    return(

        <BrowserRouter>

            <a href="#main" className="skip-link">Ugrás a tartalomra</a>

            <Navbar/>

            <main id="main" className="container">

                <Routes>

                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/game" element={<GamePage/>}/>
                    <Route path="/leaderboard" element={<LeaderboardPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>

                </Routes>

            </main>

        </BrowserRouter>

    )

}

export default App