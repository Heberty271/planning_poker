import { RoomContextProvider } from "../contexts/RoomContext";
import { CreateRoom } from "../pages/CreateRoom";
import { Home } from "../pages/Home";
import { Room } from "../pages/Room";
import { SignIn } from "../pages/SignIn";
import { Template } from "../pages/Template";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path='/*' element={
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
    </BrowserRouter>
  );
}
