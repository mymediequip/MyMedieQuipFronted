import React from 'react'

const ErrorMessage = (props) => {
  return (
    <div style={{color:'red'}}>{props.children}</div>
  )
}

export default ErrorMessage