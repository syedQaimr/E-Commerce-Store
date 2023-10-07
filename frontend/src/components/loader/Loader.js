import { TailSpin } from "react-loader-spinner";
import './Loader.css';

function Loader({ text }) {
  return (
    <div className="loaderWrapper">
      <h2>Loading {text}</h2>
      <div className="spinner">
        <TailSpin
          height={80}
          width={80}
          radius={1}
          color={"#3861fb"}
        />
      </div>
    </div>
  );
}

export default Loader;