import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import {Provider} from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Admin from './Admin';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

