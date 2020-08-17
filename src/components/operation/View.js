import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {fetchOperationViewRequest} from '../../redux/modules/operation'
import { Grid, Loader} from 'semantic-ui-react'
import ViewCard from './ViewCard'

export default function View () {
    const dispatch = useDispatch();
    const view = useSelector(state => state.operation.view, shallowEqual) || []
    const [openedOperation, setOpenedOperation] = useState()

    useEffect(
        () => {
            dispatch(fetchOperationViewRequest())
            const interval = setInterval(
              () => dispatch(fetchOperationViewRequest()),
              10000
            );
            return () => clearInterval(interval);
        },
        []
    )
    
    const columns = view.map((operation, index) => (
        
        <Grid.Column key={operation._id} className="viewColumn">
            <ViewCard 
              operation={operation}
              open={openedOperation === index}
              setOpen={(open) => {setOpenedOperation(open ? index : undefined)}}
            />
        </Grid.Column>
    ))
    // const rows = [];
    // for (let i = 0; i < columns.length / 2; i++) {
    //     rows.push(<Grid.Row>
    //         {columns[i*2]}
    //         {columns[i*2+1]}
    //     </Grid.Row>)
    // }
    return (
        <>
            <Loader active={view.length === 0}/>
            <Grid columns={2} stackable>
                {columns}
            </Grid>
        </>
    )
}