import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadTokens } from "./utils/tokenParser"
import { updatePrices } from "./redux/cryptoSlice";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        loadTokens();

        const interval = setInterval(() => {
            dispatch(updatePrices());
        }, 30000);

        return () => clearInterval(interval);
    }, [dispatch]);

    return (
      <div style={{ backgroundColor: '#5C5C5C', minHeight: '100vh', width: '100vw', display: 'flex'}}>
        <Router>
            <Navigation />
            <div style={{
              marginLeft: '220px',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
      </div>
    )
}

export default App
