import { useState } from "react";
import "./App.css";
import { Button } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>YLoader</h1>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </>
  );
}

export default App;
