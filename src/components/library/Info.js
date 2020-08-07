import React, {useEffect} from 'react'
import { Container, Image } from 'semantic-ui-react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchInfoRequest} from '../../redux/modules/library'
import eye from '../../assets/img/eye.svg'

export default function Info() {
    const info = useSelector(state => state.library.info)
    const error = useSelector(state => state.library.error)
    const { infoId } = useParams()
    const dispatch = useDispatch()
    
    useEffect(
        () => {dispatch(fetchInfoRequest({_id: infoId}))},
        []
    )

    const infoRows = Object.entries(info.data || {}).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);

    return (
        <Container>
            <Image
                rounded={true}
                size="medium"
                floated="left"
                src={info.photo ? `${info.photoUrl}` : eye}
            />
            <h3>{info.name}</h3>
            <div>
              {infoRows}
            </div>
        </Container>
    )
}