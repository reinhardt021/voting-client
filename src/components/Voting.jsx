import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// Strictly speaking, 
// the tests would start to pass if we only enabled the pure render mixin 
// for Voting and didn't bother with the two other components. 
// That's because when React doesn't notice any changes in the Voting props, 
// it skips re-rendering for the whole component subtree
// However, 
// I find it more appropriate to consistently use the pure render mixin 
// in all my components, both to make it explicit that the components are pure, 
// and to make sure they will behave as I expect even after I rearrange them

import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner}/> :
        <Vote {...this.props} />}
    </div>;
  }
}); 

// The role of the mapping function is to map the state from 
// the Redux Store into an object of props. 
// Those props will then be merged into the props of the component 
// that's being connected. 
// In the case of Voting, we just need to map the pair and winner from the state
function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(
  mapStateToProps, 
  actionCreators
)(Voting); 
// the wiring-up of a component. 
  // It takes a mapping function as an argument and 
  // returns another function that takes a React component class
// Instead, connect returns a connected version of Voting. 
  // That means our current code isn't really doing anything. 
  // We need to grab that return value, which we'll call VotingContainer
// really neat thing about action creators is the way react-redux can 
  // connect them to React components: 
  // We have a vote callback prop on Voting, and a vote action creator. 
  // Both have the same name and the same function signature: 
    // A single argument, which is the entry being voted. 
  // What we can do is simply give our action creators to 
  // the react-redux connect function as the second argument, 
  // and the connection will be made

// The effect of this is that a vote prop will be given to Voting. 
  // That prop is a function that creates an action using the vote action creator, 
  // and also dispatches that action to the Redux Store!!!!!
  // amazing that react-redux automatically dispatches the action from action creators

// this also appears to be the point where the Redux store is updated

