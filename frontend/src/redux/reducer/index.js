import { combineReducers } from 'redux';
import User from './User';

const reducer = combineReducers({
    user: User,
});

export default reducer;