import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchLibraryRequest} from '../../redux/modules/library'
import { useLocation } from "react-router-dom";
import {Card, Loader} from 'semantic-ui-react'
import Info from './Info'
import qs from 'qs'

export default function InfoPanel () {
    const dispatch = useDispatch()
    const library = useSelector(state => state.library.list) || []
    const error = useSelector(state => state.library.error)

    let location = useLocation();
    const queryParams = qs.parse(location.search, { ignoreQueryPrefix: true })

    useEffect(
        () => {dispatch(fetchLibraryRequest(queryParams))},
        [location]
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