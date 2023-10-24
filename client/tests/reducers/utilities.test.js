import reducer, { initialState } from '../../src/reducers/utilities';

describe('utilities reducer', () => {
  describe('State Initialisation', () => {
    test('it should return the initial state with no action', () => {
      expect(reducer()).toBe(initialState);
    });
  });

  describe('With action', () => {
    test('it should give a new state with utilities for CHANGE_CURRENT_FIELD:', () => {
      const eventTargetValue = 'it@run.com';
      const name = 'email';
      const action = {
        type: 'CHANGE_CURRENT_FIELD',
        value: eventTargetValue,
        key: name,
      };
      const currentState = {
        email: '',
      };
      const result = reducer(currentState, action);
      expect(result).toEqual({
        email: 'it@run.com',
      });
    });

    test('it should give a new state with utilities for SET_MESSAGE:', () => {
      const message = 'it is ok';
      const messageColor = true;
      const action = {
        type: 'SET_MESSAGE',
        message: message,
        messageColor: messageColor,
      };
      const currentState = {
        message: '',
        messageColor: '',
      };
      const result = reducer(currentState, action);
      expect(result).toEqual({
        message: 'it is ok',
        messageColor: true,
      });
    });
  });
});
