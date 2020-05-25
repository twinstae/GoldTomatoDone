import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';

import Button from '../Button';
import Tomato from '../Tomato';
import { Audio } from 'expo-av';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Animatable from 'react-native-animatable';

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = parseInt(time % 60, 10);
  return `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

async function play() {
  try {
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require('../../assets/sounds/izone_alarm.mp3'));
    await soundObject.playAsync();
  } catch (error) {
    console.log("sound error")
  }
}

var fSize = '50px';
var mSize = '10px';
if (Platform.OS === 'android') {
  fSize = 50;
  mSize = 10;
}

var tomatoBasket = [];

class Timer extends Component {
  componentDidUpdate(prevProps, prevState) {
    //버튼을 누르면...
    if (prevProps.isPlaying === false && this.props.isPlaying === true) {
      const timerInterval = setInterval(() => {
        this.props.addSecond(); //elapsed time을 1씩 증가
      }, 1000);
      this.setState({
        timerInterval,
      });
      // 타이머가 일시정지, 혹은 종료되면...
    } else if (prevProps.isPlaying === true && this.props.isPlaying === false) {
      if (this.props.elapsedTime != 0) {
        clearInterval(this.state.timerInterval);
      } else {
        clearInterval(this.state.timerInterval);
        play();

        if (this.props.isBreak) {
          this.props.endBreak();
        } else {
          tomatoBasket.push({isGold:this.props.isGold});
          this.props.breakTime();
        }
          
        this.props.turnToRed();
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
      popDown,
    } = this.props;

    const tomatoStyle = isGold ? styles.container_gold : styles.container_tomato;
    const bgStyle = isBreak ? styles.container_break : tomatoStyle;

    const tomatoColor = isGold ? '#e6c300' : '#dd4327';
    const bgColor = isBreak ? '#0060dd' : tomatoColor;

    return (
      <View style={bgStyle}>
        <View style={styles.pomo}>
          <AnimatedCircularProgress 
             size={300} width={20} rotation = {90} fill={(100 * elapsedTime) / timerDuration} tintColor={bgColor} backgroundColor="white">
            {fill => (
              <Text style={styles.time}> {formatTime(timerDuration - elapsedTime)} </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.pomo}>
          {!isPlaying ? ( <Button iconName="play-circle" onPress={startTimer} /> ) : null}
          {isPlaying ?  ( <Button iconName="pause-circle" onPress={restartTimer} /> ) : null}
        </View>
        <View style={styles.basket}>
          {tomatoBasket.map((tomato, i) => {
            if(i == 0){
              return <Tomato isGold={tomato.isGold} isMany={false} key={i} />;
            } else if((i-1) % 3 == 0 & i < tomatoBasket.length -2){
              return <Tomato isGold={false} isMany={true} key={i} />;
            } else if(i - 3 * parseInt((tomatoBasket.length-1) / 3) > 0){
              return <Tomato isGold={false} isMany={false} key={i} />;
            }
          })}           
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container_gold: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffe033',
  },
  container_tomato: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff6347',
  },
  container_break: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0080ff',
  },
  pomo: {
    paddingTop: fSize,
    alignItems: 'center',
    textAlign: 'center',
  },
  basket: {
    margin: mSize,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: mSize,
  },
  time: {
    fontSize: fSize,
    color: 'white',
  },
});

export default Timer;
