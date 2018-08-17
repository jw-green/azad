import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";

import azadApp from "./reducers";
import { auth } from "./actions";

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Lifts from "./pages/Lifts";
import TaskListView from "./pages/TaskListView";
import Books from "./pages/Books";
import BookNotes from "./pages/BookNotes";
import MarketsPortfolio from './pages/MarketsPortfolio';
import Contents from './pages/Contents';
import Skills from './pages/Skills';

let store = createStore(azadApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

  componentDidMount() {
      this.props.loadUser();
  }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (this.props.auth.isLoading) {
        return <div className="lds-cont"><div className="lds-hourglass"></div></div>;
      } else if (!this.props.auth.isAuthenticated) {
        console.log(this.props)
        return <Redirect to={{pathname: "/", showWarn: true}}/>;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }

  render() {
    let {PrivateRoute} = this;
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <PrivateRoute exact path="/Books/:id" component={BookNotes} fish=""/>
        <PrivateRoute exact path="/Books" component={Books}/>
        <PrivateRoute exact path="/Tasks" component={() => <TaskListView showWarn={true}/>} />
        <PrivateRoute exact path="/Lifts" component={Lifts} />
        <PrivateRoute exact path="/Markets" component={MarketsPortfolio}/>
        <PrivateRoute exact path="/Contents" component={Contents}/>
        <PrivateRoute exact path="/Skills" component={Skills}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}