import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
