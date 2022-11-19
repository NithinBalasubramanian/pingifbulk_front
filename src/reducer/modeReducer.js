const ModeReducer = (state = false, Action) => {
  switch (Action.type) {
    case 'CHANGE_MODE':
      // eslint-disable-next-line no-return-assign
      return state = !state
    default :
      return state
  }
}

export default ModeReducer
