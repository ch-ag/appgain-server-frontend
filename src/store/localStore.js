const statelabel = 'agcpstate'

const emptystore = {
  user_creds: null,
  current_user: null,
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
