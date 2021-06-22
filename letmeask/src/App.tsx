import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/newRoom";

import {AuthContextProvider} from './contexts/authContexts';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
      <Route path = '/' exact component ={Home}></Route>
      <Route path = '/rooms/new' component ={NewRoom}></Route>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
