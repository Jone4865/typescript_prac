import React from "react";
import Greetings from "./Components/Greetings";

const App: React.FC = () => {
  const onClick = (name: string) => {
    console.log(`${name} says hello`);
  };
  return <Greetings name="Test" onClick={onClick} />;
};

export default App;
