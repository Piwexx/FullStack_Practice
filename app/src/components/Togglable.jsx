import { useState } from "react"
import PropTypes from 'prop-types';


export const Togglable = ({children,buttonLabel}) => {
  const [visible,setVisible] = useState(false)

  const hidenWhenVisible = {display: visible ?  'none' : ''}
  const showWhenVisible = {display: visible ?  '' : 'none'}
  return (
   <div>
      <div style={hidenWhenVisible}>
        <button onClick={()=>{setVisible(true)}}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={()=>{setVisible(false)}}>Cancel</button>
      </div>
   </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};