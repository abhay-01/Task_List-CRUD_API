import React from 'react'

export default function Header() {
  return (
   <div className='container-fluid' style = {{

    backgroundColor: '#203040',
    color: '#ffffff',
    padding: '10px 0px'
   }}>
    <div className='container'>
        <h5 style = {{
            margin: 'auto',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '30px',
        }}>
            TODO LIST WEB APP
        </h5>
    </div>

   </div>
  )
}
