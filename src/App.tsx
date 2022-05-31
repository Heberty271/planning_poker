import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RoomContextProvider } from "./contexts/RoomContext";
import { Room } from "./pages/Room";
import { Template } from "./pages/Template";
import { CreateRoom } from "./pages/CreateRoom";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { ModalContextProvider } from "./contexts/ModalsContext";

function App() {
  return (
    <BrowserRouter>
      <ModalContextProvider>
        <Routes>
        <Route path='' element={
            <RoomContextProvider>
              <Home />
            </RoomContextProvider>
          } />
          
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
          <Route path='/rooms/sign-in' element={
            <RoomContextProvider>
              <SignIn />
            </RoomContextProvider>
          } />
          <Route path='/rooms/sign-in/:sign_in_code' element={
            <RoomContextProvider>
              <SignIn />
            </RoomContextProvider>
          } />
          <Route path='/template' element={<Template />} />
        </Routes>
      </ModalContextProvider>
    </BrowserRouter>
  );
}

export default App;
