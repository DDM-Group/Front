import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {fetchOperationViewRequest} from '../../redux/modules/operation'
import {Grid} from 'semantic-ui-react'
import ViewCard from './ViewCard'

export default function View () {
    const dispatch = useDispatch();
    const view = useSelector(state => state.operation.view, shallowEqual) || []
    
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
        <Grid.Column key={operation._id}>
            <ViewCard operation={operation}/>
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
        <Grid columns={2} divided>
            {columns}
        </Grid>
    )
}