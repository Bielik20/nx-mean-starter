import { createFeatureSelector } from '@ngrx/store';
import { State } from './reducer';

export const getState = createFeatureSelector<State>('users');
