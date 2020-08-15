import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchScoutingRequest} from '../../redux/modules/scouting'
import {Card, Loader} from 'semantic-ui-react'
import Info from './Info'

export default function InfoPanel () {
    const dispatch = useDispatch()
    const scouting = useSelector(state => state.scouting.list) || []
    const error = useSelector(state => state.scouting.error)
    
    useEffect(
        () => {dispatch(fetchScoutingRequest())},
        []
    )
    console.log('scouting :', scouting);
    console.log('error :', error);

    const cards = scouting.map(info => {
        return (
            <Info info={info}/>
        )
    });
    return (
        <>
            <Loader active={scouting.length === 0}/>
            <Card.Group stackable={true} className={"cardGroup"}>
                {cards}
            </Card.Group>
        </>
    )
}