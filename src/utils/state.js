import { BehaviorSubject } from 'rxjs/BehaviorSubject';

let stateSubject = null;
export let state = null;

let actions = {};

const defaultState = {
  vrDisplay: null,
  score: 0,
  lives: 30
};

export const createState = () => {
  stateSubject = new BehaviorSubject();
  state = defaultState;

  stateSubject.next(state);
}

export const dispatch = (actionName, payload) => {
  actions[actionName].call(null, state, payload);

  stateSubject.next(state);
};

export const registerAction = (actionName, actionFn) => {
  actions[actionName] = actionFn;
};

export const getState = () => {
  return stateSubject;
}
