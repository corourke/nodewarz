import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {List, Map} from 'immutable';

const defaultStore = new Map({
    counter: 0,
    status: 'STOPPED'
})

export function counter(state = defaultStore, action) {

    switch (action.type) {
        case 'INCREMENT':
            return state.set('counter', state.get('counter') + 1)
        case 'DECREMENT':
            return state.set('counter', state.get('counter') - 1)
        case 'COUNTDOWN':
            return state.set('status', 'DOWN')
        case 'STOP':
            return state.set('status', 'STOPPED')
        default:
            return state
    }
}

export const store = createStore(counter, composeWithDevTools(
    applyMiddleware()
));


/* Helpers */

export function action_increment() {
    store.dispatch({type: 'INCREMENT'})
}

export function action_decrement() {
    store.dispatch({type: 'DECREMENT'})
}

export function action_countdown() {
    store.dispatch({type: 'COUNTDOWN'})
}

export function action_stop() {
    store.dispatch({type: 'STOP'})
}

export function get_count() {
    return store.getState().get('counter');
}

export function set_render(render_func) {
    store.subscribe(render_func)
}


// Forever loop
var dIntervalID = setInterval(function () {
    let status = store.getState().get('status');
    if (status == 'DOWN') {
        module.exports.action_decrement();
    }
    if (module.exports.get_count() === 0 && status == 'DOWN' ) {
        module.exports.action_stop();
        console.log("Interval stopped.");
    }
}, 500);







