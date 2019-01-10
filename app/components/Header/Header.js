import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from 'common/actions/session.actions';
import HeaderView from './Header.view';

export const _mapStateToProps = state => ({
  session: state.session
});

// istanbul ignore next
const _mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

export default connect(_mapStateToProps, _mapDispatchToProps)(HeaderView);
