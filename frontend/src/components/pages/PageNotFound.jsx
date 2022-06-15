import React from 'react'
import { Typography } from '@mui/material';

const PageNotFound = () => {
    return (
        <div>
            <Typography variant='h3' component='h3' sx={{textAlign:'center', py:'4rem', color:'#240046'}}>
                Page Not Found. Sorry :(
            </Typography> 
        </div>
    )
}

export default PageNotFound;