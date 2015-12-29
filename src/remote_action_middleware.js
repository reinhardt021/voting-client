export default socket => store => next => action => {
  // console.log('in middleware', action);
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action); // The middleware could also decide not to call next, if it decided that the action should be halted. In that case it would never go into the reducer or the store.
}
// function that takes a Redux store, 
// and returns another function that takes a "next" callback. 
// That function returns a third function that takes a Redux action. 
// The innermost function is where the middleware implementation will actually go

// The code above may look a bit foreign 
// but it's really just a more concise way of expressing this:
  // export default function(store) {
  //   return function(next) {
  //     return function(action) {

  //     }
  //   }
  // }

// This style of nesting single-argument functions is called currying. 
  // In this case it's used so that the Middleware is easily configurable: 
  // If we had all the arguments in just one function 
  // (function(store, next, action) { }) 
  // we'd also have to supply all the arguments every time the middleware is used. 
  // With the curried version we can call the outermost function once, 
  // and get a return value that "remembers" which store to use. 
  // The same goes for the next argument.

// The next argument is a callback that the middleware should call 
  // when it has done its work and the action should be sent to the store 
  // (or the next middleware)