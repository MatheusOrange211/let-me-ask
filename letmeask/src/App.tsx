import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/newRoom";
import { Room } from "./pages/Room";

import {AuthContextProvider} from './contexts/authContexts';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path = '/' exact component ={Home}></Route>
          <Route path = '/rooms/new' component ={NewRoom}></Route>
          <Route path = '/rooms/:id' component ={Room}></Route>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
