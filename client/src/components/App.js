import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import BirdPage from "./BirdPage";
import BirdDetail from "./BirdDetail"

function App() {


    return (
        <>
          <main>
            <Header />
            <Routes>
              <Route path="/:id" element={ <BirdDetail /> }/>
              <Route path="/" element={ <BirdPage /> }/>
            </Routes>
          </main>
        </>
      );
}

export default App;
