import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';

import Button from "../Button";
import { Audio } from 'expo-av';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

function formatTime(time){
    let minutes = Math.floor(time / 60);
    time -= minutes * 60;
    let seconds = parseInt(time % 60, 10);
    return `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`
};

async function play(){
    try {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(require('../../assets/sounds/izone_alarm.mp3'));
        await soundObject.playAsync();
    } catch (error) {
    }  
};

class Timer extends Component {
    componentDidUpdate(prevProps, prevState){
        if(prevProps.isPlaying === false && this.props.isPlaying === true){
            const timerInterval = setInterval(() => {
                this.props.addSecond()
            }, 1000);
            this.setState({
                timerInterval
            });
        } else if (prevProps.isPlaying === true && this.props.isPlaying === false){
            clearInterval(this.state.timerInterval);
            play();
            this.props.turnToRed();
            if(this.props.isBreak){
                this.props.endBreak();
            } else{
              this.props.breakTime();
            }
        }
    }
    
	render() {
        console.log(this.props);
        const {
            isPlaying,
            isGold,
            isBreak,
            elapsedTime, 
            timerDuration,
            popupVisible,
            startTimer, 
            restartTimer,
            popDown
        } = this.props;
        
        const tomatoStyle = (isGold ? styles.container_gold : styles.container_tomato);
        const bgStyle = (isBreak ? styles.container_break : tomatoStyle);

        const tomatoColor = (isGold ? "#e6c300" : "#dd4327");
        const bgColor = (isBreak ? "#0060dd" : tomatoColor);
        
		return (
			<View style = {bgStyle}>
				<View style ={styles.timer}>
                    <AnimatedCircularProgress
                        size={300}
                        width={20}
                        rotation={0}
                        fill={100 * elapsedTime / timerDuration}
                        tintColor={bgColor}
                        backgroundColor="white">
                      {
                        (fill) => (
                            <Text style={styles.time}>
                                {formatTime(timerDuration - elapsedTime)} 
                            </Text>
                        )
                      }
                    </AnimatedCircularProgress>
				</View>
				<View style = {styles.pomo}>
                    {!isPlaying ?
                        <Button iconName = "play-circle" onPress={startTimer}/>
                        : null}
                    {isPlaying ?
                        <Button iconName = "stop-circle" onPress={restartTimer}/>
                        : null}
				</View>
			</View>
		);
	}
}

if(Platform.OS === 'android'){
    var fSize = 50;
} else {
    var fSize = '50px';
}

const styles = StyleSheet.create({
	container_gold:{
        flex:1,
        alignItems: "center",
		backgroundColor: "#ffe033"
	},
    container_tomato:{
        flex:1,
        alignItems: "center",
		backgroundColor: "#ff6347"
	},
    container_break:{
        flex:1,
        alignItems: "center",
		backgroundColor: "#0080ff"
    },
    timer:{
        paddingTop:fSize
    },
    pomo:{
        flex:1,
        justifyContent: "center",
		alignItems: "center",
        textAlign:"center"
    },
    time:{
        fontSize:fSize,
        color:"white"
    }
});

export default Timer;