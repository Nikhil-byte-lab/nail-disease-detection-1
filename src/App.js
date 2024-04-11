import { useState } from "react";
import FileInput from "./component/FileInput";
import Header from "./component/Header";
import Background from "./component/Background";

function App() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  const reset = () => {
    setImage(null);
    setResult(null);
    setIsResultVisible(false);
  };

  return (
    <Background>
      <Header reset={reset} />
      <FileInput
        image={image}
        setImage={setImage}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        result={result}
        setResult={setResult}
        isResultVisible={isResultVisible}
        setIsResultVisible={setIsResultVisible}
      />
    </Background>
  );
}

export default App;
