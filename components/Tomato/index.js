import React from "react";
import PropTypes from "prop-types";
import { Image,  Platform } from 'react-native';
const tomatoRed =require('./tomato_red_2.png')
const tomatoGold = require('./tomato_gold_crown.png')
const threeRed = require('./tomato_red_3.png')
import * as Animatable from 'react-native-animatable';

function Tomato({isGold, isMany}){
    return (
        <Animatable.Image
        animation = 'zoomInUp'
        style ={style_tomato} source= {isGold ? tomatoGold : (isMany ? threeRed : tomatoRed)} />
    );
}

Tomato.propTypes = {
    isGold : PropTypes.bool.isRequired,
    isMany : PropTypes.bool.isRequired
}

var fSize = '60px';
var mSize = '5px';

if(Platform.OS === 'android'){
    fSize = 60;
    mSize = 5;
}

var style_tomato = { width:fSize, height:fSize, margin:mSize}

export default Tomato;