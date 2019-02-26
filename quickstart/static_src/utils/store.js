import {createStore, applyMiddleware, compose} from 'redux';
import initReducers from './../reducers';
//import middlewares from './../middlewares';


function initStore(additionalMiddlewares = []) {
    const initialStore = {};
    //if (__IS_DEV__) {
    return createStore(
        initReducers,
        initialStore,
        compose(
            //applyMiddleware(...additionalMiddlewares, ...middlewares),
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        ),
    );
    // }
    /*return createStore(
        initReducers,
        initialStore,
        //applyMiddleware(...additionalMiddlewares, ...middlewares),
    );*/
}

export default initStore;