
// Now we still need a way to give a vote callback to Voting, 
  // which will cause this new action to be dispatched. 
  // We should keep Voting itself pure and unaware of actions or Redux. 
  // Instead, this is another job for the connect function from react-redux.

// In addition to wiring up input props, 
  // react-redux can be used to wire up output actions. 
  // Before we can do that though, 
  // we need to introduce another core Redux concept: 
  // Action creators.

// As we have seen, 
// Redux actions are just simple objects that (by convention) 
  // have a type attribute and other, action-specific data. 
  // We have been creating these actions whenever needed 
  // by simply using object literals. 
  // It is preferable, however, 
  // to use little factory functions for making actions instead. 
  // Functions such as this one:
export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

// These functions are called action creators. 
  // There's really not much to them - 
  // they are pure functions that just return action objects - 
  // but what they do is encapsulate the internal structure of the action objects 
  // so that the rest of your codebase doesn't need to be concerned with that. 
  // Actions creators also conveniently document all the actions 
  // that can be dispatched in a given application. 
  // That information would be more difficult to gather 
  // if it was sprinkled all over the codebase in object literals
export function vote(entry) {
  return {
    meta: {remote: true},
    type: 'VOTE',
    entry
  };
}

// We could also very easily write unit tests for these functions, 
// but I usually don't bother with that unless an action creator 
// actually does something more than just returns an object. 
// Feel free to add the unit tests, however, if you consider them useful!

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}


