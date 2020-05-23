import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import Timer from './components/Timer';
import reducer from './reducer';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import { Audio } from 'expo-av';

let store = createStore(reducer);

console.log(store.getState());

export default class App extends Component {
	render() {                
		return (
            <Provider store = {store}>
                <Timer />
                
            </Provider>
        );
	}
}
