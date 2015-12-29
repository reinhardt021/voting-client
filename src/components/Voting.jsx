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
import Winner from './Winner';
import Vote from './Vote';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>
      {this.props.winner ?
        <Winner ref="winner" winner={this.props.winner}/> :
        <Vote {...this.props} />}
    </div>;
  }
});