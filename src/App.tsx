import { ModalContextProvider } from "./contexts/ModalsContext";
import Router from "./routes";

function App() {
  return (
      <ModalContextProvider>
        <Router />
      </ModalContextProvider>
  );
}

export default App;
