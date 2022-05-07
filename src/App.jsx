import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);
  const addCount = () => setCount((c) => c + 1);

  return (
    <div className="App" onClick={addCount}>
      Hello world! {count}
    </div>
  );
}

export default App;
