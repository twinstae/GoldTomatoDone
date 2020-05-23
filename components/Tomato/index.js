import React from "react";
import PropTypes from "prop-types";
import { Image } from 'react-native';
const tomatoRed =require('./tomato_red_2.png')
const tomatoGold = require('./tomato_gold_2.png')

function Tomato({isGold}){
    return (
        <Image style ={style_tomato} source= {isGold ? tomatoGold : tomatoRed} />
    );
}

Tomato.propTypes = {
    isGold : PropTypes.bool.isRequired
}

var style_tomato = { width:'50px', height:'50px', margin:'5px'}

export default Tomato;