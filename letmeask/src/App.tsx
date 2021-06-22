import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/newRoom";

function App() {
  return (
    <BrowserRouter>
      <Route path = '/' exact component ={Home}></Route>
      <Route path = '/rooms/new' component ={NewRoom}></Route>
    </BrowserRouter>

  );
}

export default App;