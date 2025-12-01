//import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import style from "./styles/App.module.css";
import { Grid } from "@chakra-ui/react";
import Header from "./pages/Header";
import MainPage from "./pages/MainPage";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Grid className={style.grid}>
          <Header />
          <MainPage />
        </Grid>
      </Router>
    </>
  );
}

export default App;
