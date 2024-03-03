import React, { Component } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import {  NavbarComponent } from './components'
import { Home,Signup, Sukses,Login } from './pages'
import axios from 'axios';
import { API_URL } from './utils/constants';




export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
    }
  }



  componentDidMount() {
    axios
        .get(API_URL+"products")
        .then(res => {
          const menus = res.data;
          this.setState({ menus });
        }) 
        .catch(error => {
          console.log(error);
        })// Gets
  }
  render() {
    console.log(this.state.menus);
    return (
      <BrowserRouter>
          <NavbarComponent />
          <main>
            <Switch>
              <Route  path="/" component={Login} exact/>
              <Route path="/Signup" component={Signup} exact/>
              <Route  path="/home" component={Home} exact/>
              <Route  path="/sukses" component={Sukses} exact/>
            </Switch>
          </main>
      </BrowserRouter>
    )
  }
}
