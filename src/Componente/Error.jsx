import React from 'react'


const Error = ({mensaje}) => {
    return ( 
        <div    className='my-3 p-4 text-center  alert alert-primary'>
            <p>{mensaje}</p>
        </div>
     );
}
 
export default Error;