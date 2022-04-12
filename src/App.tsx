import { BrowserRouter, Route, Routes } from "react-router-dom";
import Room from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/rooms' element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
