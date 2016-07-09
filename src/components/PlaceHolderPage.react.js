import React from 'react'
import {Link} from 'react-router'

// Since this component is simple and static, there's no parent container for it.
const PlaceholderPage = (props) => {

  return (
    <div>
      <h2 className="alt-header">{props.header}</h2>
      <p>
        {props.message || <span><strong>Comming Soon</strong>: Not Implemented Yet</span>}
      </p>
    </div>
  )
}

export default PlaceholderPage
