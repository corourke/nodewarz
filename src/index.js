import { createStore } from 'redux'
// import { List, Map } from 'immutable';

function counter(state, action) {
    if (typeof state === 'undefined') {
        return 0
    }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
}

const store = createStore(counter);


/* Helpers */

module.exports = {
    action_increment: function() {
        store.dispatch({type: 'INCREMENT'});
    },
    action_decrement: function() {
        store.dispatch({type: 'DECREMENT'})
    },

    get_state: function() {
        return store.getState();
    },
    set_render: function(render_func) {
        store.subscribe(render_func);
    }
};





