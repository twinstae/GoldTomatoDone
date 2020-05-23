import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';

import Button from "../Button";
import Tomato from "../Tomato";
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


if(Platform.OS === 'android'){
    var fSize = 50;
} else {
    var fSize = '50px';
}

class Timer extends Component {
    componentDidUpdate(prevProps, prevState){
        //버튼을 누르면...
        if(prevProps.isPlaying === false && this.props.isPlaying === true){
            const timerInterval = setInterval(() => {
                this.props.addSecond() //elapsed time을 1씩 증가
            }, 1000);
            this.setState({
                timerInterval
            });
            // 타이머가 종료되면...
        } else if (prevProps.isPlaying === true && this.props.isPlaying === false){
            if (this.props.elapsedTime != 0){
                clearInterval(this.state.timerInterval);              
            }
            else{
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
    }
    
	render() {
        console.log(this.props);
        const {
            isPlaying, // 진행 중인가
            isGold, // 황금인가
            isBreak, // 휴식 중인가
            elapsedTime, // 경과시간
            timerDuration, // 총 타이머 목표 시간
            popupVisible,
            startTimer, 
            restartTimer,
            popDown
        } = this.props;
                
        const tomatoStyle = (isGold ? styles.container_gold : styles.container_tomato);
        const bgStyle = (isBreak ? styles.container_break : tomatoStyle);

        const tomatoColor = (isGold ? "#e6c300" : "#dd4327");
        const bgColor = (isBreak ? "#0060dd" : tomatoColor);
        
        const tomatoBasket = [{isGold:true}, {isGold:false}, {isGold:false}, {isGold:false}]
        
		return (
			<View style = {bgStyle}>
                <View style = {styles.basket}>
                    {tomatoBasket.map((tomato, i) => {
                        return (
                            <Tomato isGold = {tomato.isGold} />
                               );
                    })}
                </View>
				<View style ={styles.pomo}>
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
                        <Button iconName = "pause-circle" onPress={restartTimer}/>
                        : null}
				</View>
			</View>
		);
	}
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
    pomo:{
        paddingTop:fSize,
        alignItems: "center",
        textAlign:"center"
    },
    basket:{
        margin:'10px',
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'white',
        borderRadius: '15px'
    },
    time:{
        fontSize:fSize,
        color:"white"
    }
});

export default Timer;