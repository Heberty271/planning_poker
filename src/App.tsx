import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoomContextProvider } from "./contexts/RoomContext";
import { Room } from "./pages/Room";
import { Template } from "./pages/Template";
import { CreateRoom } from "./pages/CreateRoom";
import { OpenRoom } from "./pages/OpenRoom";
import { ModalContextProvider } from "./contexts/ModalsContext";

function App() {
  return (
    <BrowserRouter>
      <ModalContextProvider>
        <Routes>
          <Route path='/rooms/:id' element={
            <RoomContextProvider>
              <Room />
            </RoomContextProvider>
          } />

          <Route path='/rooms/new' element={
            <RoomContextProvider>
              <CreateRoom />
            </RoomContextProvider>
          } />
          <Route path='/rooms/enter' element={
            <RoomContextProvider>
              <OpenRoom />
            </RoomContextProvider>
          } />
          <Route path='/template' element={<Template />} />
        </Routes>
      </ModalContextProvider>
    </BrowserRouter>
  );
}

export default App;
