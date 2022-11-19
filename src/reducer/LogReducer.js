const LogReducer = (logstate = false, Action) => {
  switch (Action.type) {
    case 'LOG_STATE':
      // eslint-disable-next-line no-return-assign
      return logstate = !logstate
    default :
      return logstate
  }
}

export default LogReducer
