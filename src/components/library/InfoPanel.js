import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchLibraryRequest} from '../../redux/modules/library'
import {Card, Loader} from 'semantic-ui-react'
import Info from './Info'

export default function InfoPanel () {
    const dispatch = useDispatch()
    const library = useSelector(state => state.library.list) || []
    const error = useSelector(state => state.library.error)
    
    useEffect(
        () => {dispatch(fetchLibraryRequest())},
        []
    )
    console.log('library :', library);
    console.log('error :', error);

    const cards = library.map(info => {
        return (
            <Info info={info}/>
        )
    });
    return (
        <>
            <Loader active={library.length === 0}/>
            <Card.Group stackable={true} className={"cardGroup"}>
                {cards}
            </Card.Group>
        </>
    )
}