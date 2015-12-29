import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Trainspotting', '28 Days Later'];

ReactDOM.render(
  <Voting pair={pair} />,
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


