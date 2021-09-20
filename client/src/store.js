import { createStore, applyMiddleware,combineReducers} from "redux";

import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk';

import { alertReducer } from "./Reducers/AlertReducer";

import { UserAuthReducer } from "./Reducers/authReducer";

import { UserInfoReducer } from "./Reducers/UserInfoReducer";

import {Profile} from './Reducers/Profile'

import {Posts} from './Reducers/post'

const initialState = [];

const middleware = [thunk];

const reducer = combineReducers({alert: alertReducer,loginAuth: UserAuthReducer,userInfo: UserInfoReducer,profile: Profile,postReducer: Posts})
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));


export default store;