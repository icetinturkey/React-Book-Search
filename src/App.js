import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import {ServiceProvider} from "./context/service";
import {useState} from "react";

function App() {
    const [name, setName] = useState("");
    return (
      <>
          <ServiceProvider>
              <Header setName={setName} />
              <Body />
              <Footer name={name} />
          </ServiceProvider>
      </>
    );
}

export default App;
