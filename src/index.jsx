import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux'; // Before any of this is possible, we need to wrap our top-level application component inside a react-redux Provider component. This connects our component tree to a Redux store, enabling us to make the mappings for individual components later
import io from 'socket.io-client'; // Importing this library gives us an io function that can be used to connect to a Socket.io server. Let's connect to one that we assume to be on the same host as our client, in port 8090 (matching the port we used on the server)
import reducer from './reducer';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';

// The entry point index.jsx is a good place to set up the Store. 
const store = createStore(reducer);
// Let's also kick it off with some state by dispatching the SET_STATE action on it 
// (this is only temporary until we get real data in):
// store.dispatch({
//   type: 'SET_STATE',
//   state: {
//     vote: {
//       pair: ['Sunshine', '28 Days Later'],
//       tally: {Sunshine: 2}
//     }
//   }
// });
// Getting Data In from Redux to React
  // We have a Redux Store that holds our immutable application state. 
  // We have stateless React components that take immutable data as inputs. 
  // The two would be a great fit: 
  // If we can figure out a way to always get the latest data from the Store 
  // to the components, that would be perfect. 
  // React would re-render when the state changes, 
  // and the pure render mixin would make sure that the parts of the UI 
  // that have no need to re-render won't be.
// Rather than writing such synchronization code ourselves, 
  // we can make use of the Redux React bindings that are available 
  // in the react-redux package:
  // npm install --save react-redux
// The big idea of react-redux is to take our pure components 
// and wire them up into a Redux Store by doing two things:
  // Mapping the Store state into component input props.
  // Mapping actions into component output callback props.

const socket = io(`${location.protocol}//${location.hostname}:8090`);
// note that you have to use these backticks 
// even though it doesn't register the forward slashes as not comments
// webpack / babel transform these into bundle.js where it is read properly
socket.on('state', state => 
  store.dispatch({type: 'SET_STATE', state})
);


const routes = <Route component={App}>
  // purpose of the root route component is to render all the markup 
  // that is common across all routes

  // It plugs in the component(s) defined for whatever the current route happens to be
  <Route path="/results" component={ResultsContainer} /> // http://localhost:8080/#/results
  <Route path="/" component={VotingContainer} /> //http://localhost:8080/
</Route>;

// Before any of this is possible, we need to wrap our 
  // top-level application component inside a react-redux Provider component. 
  // This connects our component tree to a Redux store, 
  // enabling us to make the mappings for individual components later.
// We'll put in the Provider around the Router component. 
  // That'll cause the Provider to be an ancestor to all of our application components
ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

// What's really cool about the way React applications get built with 
// Redux and Immutable is that we can write everything 
// as so-called Pure Components (also sometimes called "Dumb Components"). 
// As a concept, this is similar to pure functions, 
// in that there are a couple of rules to follow:
  // A pure component receives all its data as props, 
    // like a function receives all its data as arguments. 
    // It should have no side effects, including reading data from anywhere else, 
    // initiating network requests, etc.
  // A pure component generally has no internal state. 
  // withat it renders is fully driven by its input props. 
  // Rendering the same pure component twice with the same props 
  // should result in the same UI. 
  // There's no hidden state inside the component 
  // that would cause the UI to differ between the two renders.

// has a similar simplifying effect as using pure functions does: 
  // We can figure out what a component does by looking at what it receives 
  // as inputs and what it renders. 
  // There's nothing else we need to know about the component. 
  // We can also test it really easily - 
  // almost as easily as we were able to test our pure application logic

// components can't have state, where will the state be? 
  // In an immutable data structure inside a Redux store!
// big idea is to separate the state from the user interface code
// React components are just a stateless projection of the state 
// at a given point in time


// If we only use immutable data in component props, 
// and write the component as a pure component, 
// we can have React use a more efficient strategy for detecting changes in the props.

// This is done by applying the PureRenderMixin 
// that is available as an add-on package. 
// When this mixin is added to a component, 
// it changes the way React checks for changes in the component's props (and state). 
// Instead of a deep compare it does a shallow compare, which is much, much faster

// The reason we can do this is that by definition, 
// there can never be changes within immutable data structures. 
// If the props of a component are all immutable values, 
// and the props keep pointing to the same values between renders, 
// there can be no reason to re-render the component, 
// and it can be skipped completely!

