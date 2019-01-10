import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'common/actions/user.actions';
import SignUpView from './SignUp.view';

// istanbul ignore next
const _mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(userActions, dispatch)
});


export default connect(null, _mapDispatchToProps)(SignUpView);
