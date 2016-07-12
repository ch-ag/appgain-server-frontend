const statelabel = 'agcpstate'

const emptystore = {
  user_creds: undefined,
  current_user: undefined,
}


export const getFromLocalState = (key) => {
  try {
    const serializedState = localStorage.getItem(key)

    if(serializedState === null){
      console.log(
        "local_state:getFromLocalState:  emptystore",
        key,
        typeof serializedState,
        serializedState
      )
      return undefined
    }

    // let __local_state = {}
    // __local_state[key] = JSON.parse(serializedState)
    const __local_state = JSON.parse(serializedState)

    console.log(
      "local_state:getFromLocalState: loaded", __local_state);
    return __local_state

  } catch (e) {
    console.log("local_state:getFromLocalState: error", e);
    return undefined
  }
}


export const saveToLcoalState = (state) => {
  try {

    // for (let [key, value] of Object.entries(state)) {
    for (let key in state) {
      let value = state[key]

      console.log('local_state:saveState: k:v', key, value);

      const serializedValue = JSON.stringify(value)
      localStorage.setItem(key, serializedValue)

    }

  } catch (e) {
    console.log("local_state:saveState: error", e);
  }
}


export const loadState = ()=>{
  try {
    const serializedState = localStorage.getItem(statelabel)
    if(serializedState === null){
      return emptystore
    }
    return JSON.parse(serializedState)
  } catch (e) {
    return emptystore
  }
}

export const saveState = (state) => {
  try {
    const newstate = Object.assign({}, loadState(), state)
    console.log("saveState::", newstate);
    const serializedState = JSON.stringify(state)
    localStorage.setItem(statelabel, serializedState)
  } catch (e) {
    console.log("saveState::error", e);
  }
}
