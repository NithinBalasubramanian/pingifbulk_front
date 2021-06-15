const LogReducer = (logstate = false , Action) => {
    switch(Action.type){
        case 'LOG_STATE':
            return logstate = !logstate;
        default :
            return logstate
    }
}

export default LogReducer