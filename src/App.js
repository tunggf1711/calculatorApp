import logo from "./logo.svg";
import "./App.css";
import Calculator from "./Components/Calculator/Calculator";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Calculator />
    </div>
  );
}

export default App;
