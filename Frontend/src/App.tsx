//import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import style from "./styles/App.module.css";
import { Grid } from "@chakra-ui/react";
import Header from "./pages/Header";
import MainPage from "./pages/MainPage";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Router>
        <Grid className={style.grid}>
          <Header onSearch={setSearch} />
          <MainPage search={search} />
        </Grid>
      </Router>
    </>
  );
}

export default App;
