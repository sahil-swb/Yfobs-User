// store without redux-tolkit.
import reducer from './reducer';
// import { createStore } from 'redux';

// export const store = createStore(reducer);
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: reducer
});
/*
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
*/
