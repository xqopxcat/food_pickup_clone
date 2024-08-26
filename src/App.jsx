import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { StateContext } from './context/StateContext';
import theme from './styles/theme';
import {
    Home,
    StoreDetails,
    ItemDetails,
    Payment,
    Cart
} from './view';
import { Sidebar } from "./components";
import { APIProvider } from '@vis.gl/react-google-maps';

function App() {
  return (
    <BrowserRouter>
        <APIProvider apiKey={ import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY }>
            <ThemeProvider theme={ theme }>
                <StateContext>
                    <Sidebar />
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/store/detail" exact element={<StoreDetails />} />
                        <Route path="/store/:name/:id" exact element={<StoreDetails />} />
                        <Route path="/store/:name/:id/:itemId" exact element={<ItemDetails />} />
                        <Route path="/payment" exact element={<Payment />} />
                        <Route path="/cart" exact element={<Cart />} />
                    </Routes>
                </StateContext>
            </ThemeProvider>
        </APIProvider>
    </BrowserRouter>
  )
}

export default App
