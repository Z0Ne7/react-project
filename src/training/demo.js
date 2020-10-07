import { createStore } from 'redux';
import { status, sort } from './actions/index';
import myReducer from './reducers';

const store = createStore(myReducer);
console.log('Default: ', store.getState());

store.dispatch(status());
console.log('Toggle Status', store.getState());

store.dispatch(
  sort({
    by: 'name',
    value: -1,
  }),
);
console.log('Sort Action: ', store.getState());
