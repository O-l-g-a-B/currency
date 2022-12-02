import "./App.css";
import Terminal from "./pages/terminal/terminal";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h2>Terminal App</h2>
      </header>
      <main className="app-main">
        <Terminal></Terminal>
      </main>
    </div>
  );
}

export default App;
