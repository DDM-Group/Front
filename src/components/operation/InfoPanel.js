import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchOperationRequest} from '../../redux/modules/operation'
import { Card, Loader } from 'semantic-ui-react'
import Info from './Info'

function InfoPanel() {
    const dispatch = useDispatch()
    const operation = useSelector(state => state.operation.list) || []
    const error = useSelector(state => state.operation.error)
    
    useEffect(
        () => {dispatch(fetchOperationRequest())},
        []
    )
    console.log('operation :', operation);
    console.log('error :', error);

    const cards = operation.map(info => {
        return (
            <Info info={info}/>
        )
    });
    return (
        <>
            <Loader active={operation.length === 0}/>
            <Card.Group stackable={true} className={"cardGroup"}>
                {cards}
            </Card.Group>
        </>
    )
}

export default InfoPanel
