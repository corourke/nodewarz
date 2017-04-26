import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {List, Map} from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';

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

store.subscribe(render);

/* React */
function Counter(props) {
    return <h1>{props.value}</h1>;
}

function render() {
    let current_value = store.getState().get('counter');
    ReactDOM.render(
        <Counter value={current_value}/>,
        document.getElementById('rCounter')
    );
}

window.onload = function(e) {
    render();

    // Forever loop
    var dIntervalID = setInterval(function () {
        let status = store.getState().get('status');
        if (status == 'DOWN') {
            module.exports.action_decrement();
        }
        let count = store.getState().get('counter');
        if (count === 0 && status == 'DOWN') {
            store.dispatch({type: 'STOP'});
            console.log("Interval stopped.");
        }
    }, 500);

}


