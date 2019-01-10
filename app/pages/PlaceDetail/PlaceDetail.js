import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as placeActions from 'common/actions/place.actions';
import PlaceDetail from './PlaceDetail.view';

export const _mapStateToProps = state => ({
  place: state.places[0],
  session: state.session
});


// istanbul ignore next
const _mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(placeActions, dispatch)
});

export default connect(_mapStateToProps, _mapDispatchToProps)(PlaceDetail);
