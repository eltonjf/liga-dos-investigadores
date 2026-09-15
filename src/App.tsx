import { Navigate, Route, Routes } from "react-router-dom";
import { FirebaseConfigGuard } from "./components/FirebaseConfigGuard";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Lobby } from "./pages/Lobby";

export function App() {
  return (
    <FirebaseConfigGuard>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lobby/:sessionId" element={<Lobby />} />
        <Route path="/game/:sessionId" element={<Game />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </FirebaseConfigGuard>
  );
}
