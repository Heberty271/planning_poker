import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoomContextProvider } from "./contexts/RoomContext";
import Room from "./pages/Room";
import { Template } from "./pages/Template";
import { CreateRoom } from "./pages/CreateRoom";

function App() {
  return (
    <BrowserRouter>      
        <Routes>
          <Route path='/rooms' element={
            <RoomContextProvider>
              <Room />
            </RoomContextProvider>
          } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
