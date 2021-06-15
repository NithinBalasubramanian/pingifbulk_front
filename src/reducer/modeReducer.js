const ModeReducer = (state = false , Action) => {
    switch(Action.type){
        case 'CHANGE_MODE':
            return state = !state;
        default :
            return state
    }
}

export default ModeReducer