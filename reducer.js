//Actions

const START_TIMER = 'START_TIMER';
const RESTART_TIMER = 'RESTART_TIMER';
const ADD_SECOND = 'ADD_SECOND';
const TURN_TO_RED = 'TURN_TO_RED';
const BREAK_TIME = 'BREAK_TIME';
const END_BREAK = 'END_BREAK';
const POP_DOWN = 'POP_DOWN';

const TIMER_DURATION = 60 * 15;
//action creator

function startTimer(){   return {type: START_TIMER  }} 
function restartTimer(){ return {type: RESTART_TIMER}}
function addSecond(){    return {type: ADD_SECOND   }}
function turnToRed(){    return {type: TURN_TO_RED  }}
function breakTime(){    return {type: BREAK_TIME   }}
function endBreak(){     return {type: END_BREAK    }}
function popDown(){    return {type: POP_DOWN  }}
//reducer

const initialState = {
    isPlaying:false,
    elapsedTime: 0,
    timerDuration : TIMER_DURATION,
    isGold:true,
    isBreak:false,
    countBreak:0,
    popupVisible:false
}

function reducer(state = initialState, action){
    switch(action.type){
        case START_TIMER:
            return applyStartTimer(state);
        case RESTART_TIMER:
            return applyRestartTimer(state);
        case ADD_SECOND:
            return applyAddSecond(state);
        case TURN_TO_RED:
            return applyTurnToRed(state);
        case BREAK_TIME:
            return applyBreakTime(state);
        case END_BREAK:
            return applyEndBreak(state);
        case POP_DOWN:
            return applyPopDown(state);
        default:
            return state;
    }
}

//reducer function

function applyStartTimer(state){
    return {
        ...state,
        isPlaying:true,
        popupVisible : true
    };
}
function applyRestartTimer(state){
    return {
        ...state,
        isPlaying:false,
    };
}
function applyAddSecond(state){
    if(state.elapsedTime < state.timerDuration){
        return{
            ...state,
            elapsedTime : state.elapsedTime + 1
        };
    } else {
        return {
            ...state,
            isPlaying:false,
            elapsedTime : 0
        }
    }
}
function applyTurnToRed(state){
    return {
        ...state,
        isGold : false
    };
}
function applyBreakTime(state){
    return {
        ...state,
        timerDuration : parseInt(TIMER_DURATION / 3),
        isBreak: true,
        countBreak : state.countBreak + 1,
    };
}
function applyEndBreak(state){
    return {
        ...state,
        timerDuration : TIMER_DURATION,
        isBreak: false
    };
}
function applyPopDown(state){
    return {
        ...state,
        popupVisible : false
    };
}

const actionCreators = {
    startTimer,
    restartTimer,
    addSecond,
    turnToRed,
    breakTime,
    endBreak,
    popDown
};

export {actionCreators};

export default reducer;