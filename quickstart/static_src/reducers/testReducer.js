import update from 'react-addons-update';
import { TEST } from '../actions/testAction';

const initialStore = {
    counter: 0,
    data: undefined,
};


export default function testReducer(store = initialStore, action) {
    switch (action.type) {
        case TEST: {
            return update(store, {
                counter: { $set: store.counter + 1 },
                data: { $set: action.data },
            });
        }
        default:
            return store;
    }
}