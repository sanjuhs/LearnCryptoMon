import logo from "./logo.svg";
import "./App.css";
// import Unity, { UnityContext } from "react-unity-webgl";
import { Unity, useUnityContext } from "react-unity-webgl";

// const unityContext = new UnityContext({
//   loaderUrl: "/build/build1.loader.js",
//   dataUrl: "/build/build1.data.unityweb",
//   frameworkUrl: "/build/build1.framework.js.unityweb",
//   codeUrl: "/build/build1.wasm.unityweb",
// });

function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/build/build2.loader.js",
    dataUrl: "/build/build2.data",
    frameworkUrl: "/build/build2.framework.js",
    codeUrl: "/build/build2.wasm",
  });

  // unityContext.on("Senddata", function (eventdata, eventname) {
  //   alert("this is true !");
  //   //questcompletion();
  //   console.log("eventdata : " + String(eventdata));
  //   console.log(eventname);
  // });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <Unity
          unityContext={unityContext}
          style={{ width: 800, height: 600 }}
        /> */}
        <Unity
          className="unityy"
          unityProvider={unityProvider}
          // style={{ width: 800, height: 600 }}
        />
      </header>
    </div>
  );
}

export default App;
