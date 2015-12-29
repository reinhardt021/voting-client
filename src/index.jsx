import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';

// const pair = ['Trainspotting', '28 Days Later'];

const routes = <Route component={App}>
  // purpose of the root route component is to render all the markup 
  // that is common across all routes

  // It plugs in the component(s) defined for whatever the current route happens to be
  <Route path="/" component={Voting} />
</Route>;

ReactDOM.render(
  <Router>{routes}</Router>,
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

