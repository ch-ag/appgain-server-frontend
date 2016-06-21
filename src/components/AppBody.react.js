import React, {PropTypes} from 'react'

const window_size = {
  width: window.innerWidth || document.body.clientWidth,
  height: window.innerHeight || document.body.clientHeight
}

const style = (() => {
  const app_drawer_width = 270 //px
  const body_width = (100 - (app_drawer_width*100)/window_size.width)
  // const body_width = window_size.width - app_drawer_width - 10 // 10px padding


  //TODO: Close AppDrawer on small width window

  return {
    width: body_width - 4 +'%',
    marginLeft: app_drawer_width, //(100 - body_width + 2 ) + '%',
    marginTop: 30
  }
})()

const AppBody = (props) => {
  return (
    <div style={style}>
      {props.children}
    </div>
  )
}

AppBody.propTypes = {
  children: PropTypes.element
}

export default AppBody
