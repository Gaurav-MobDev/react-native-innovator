import {takeEvery, put, call} from 'redux-saga/effects';
import {LOGIN_REQUESTED, REQUEST_SUCCESS} from './constants';
import {screenNames} from '../../../navigation/navigationConstants';
import {navigate} from '../../../navigation/NavigationService';

function* onLoginRequested({email, passwordLogin, navigator}) {
  alert('Login Successfully');
  navigate(screenNames.Dashboard);
}
function* onRequestSuccess({data, navigator}) {}
function* sagaLogin() {
  yield takeEvery(LOGIN_REQUESTED, onLoginRequested);
  yield takeEvery(REQUEST_SUCCESS, onRequestSuccess);
}
export default sagaLogin;
