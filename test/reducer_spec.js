/**
 * Created by cameron on 4/22/17.
 */

import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import { store, counter } from '../src/index.js';


console.log("In reducer_spec.js");
console.log("store: ", store);
console.log("counter: ", counter);

describe('reducers', () => {
    it('is a Redux store configured with the correct reducer', () => {
        counter({},{});
        expect(store.getState()).to.equal(fromJS({counter: 0, status: 'STOPPED'}));
    });
    it('should handle INCREMENT', () => {
        let state = counter(fromJS({counter: 1, status: 'STOPPED'}), {type: 'INCREMENT'});
        expect(state).to.equal(fromJS({counter: 2, status: 'STOPPED'}));
    });
});