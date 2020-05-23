import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { actionCreators as tomatoActions} from '../../reducer';
import Timer from './presenter';

function mapStateToProps(state){
    const {
        isPlaying,
        elapsedTime,
        timerDuration,
        isGold,
        isBreak,
        popupVisible
    } = state;
    return {
        isPlaying,
        elapsedTime,
        timerDuration,
        isGold,
        isBreak,
        popupVisible
    };
}

function mapDispatchToProps(dispatch){
    return {
        startTimer: bindActionCreators(tomatoActions.startTimer, dispatch),
        restartTimer: bindActionCreators(tomatoActions.restartTimer, dispatch),
        addSecond: bindActionCreators(tomatoActions.addSecond, dispatch),
        turnToRed: bindActionCreators(tomatoActions.turnToRed, dispatch),
        breakTime: bindActionCreators(tomatoActions.breakTime, dispatch),
        endBreak: bindActionCreators(tomatoActions.endBreak, dispatch),
        popDown: bindActionCreators(tomatoActions.popDown, dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Timer);