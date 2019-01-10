import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as placeActions from 'common/actions/place.actions';
import Map from './Map.view';


export const _mapStateToProps = state => ({
  places: state.places
});

// istanbul ignore next
const _mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(placeActions, dispatch)
});


export default connect(_mapStateToProps, _mapDispatchToProps)(Map);
