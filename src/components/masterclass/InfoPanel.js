import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchMasterclassRequest} from '../../redux/modules/masterclass'
import { Card, Loader } from 'semantic-ui-react'
import Info from './Info'

function InfoPanel() {
    const dispatch = useDispatch()
    const masterclass = useSelector(state => state.masterclass.list) || []
    const error = useSelector(state => state.masterclass.error)
    
    useEffect(
        () => {dispatch(fetchMasterclassRequest())},
        []
    )
    console.log('masterclass :', masterclass);
    console.log('error :', error);

    const cards = Object.entries(masterclass).map(([name, mcs]) => {
        return (
            <Info key={name} mcs={mcs} name={name}/>
        )
    })
    // const cards = masterclass.map(info => {
    //     return (
    //         <Info key={info && info.id} info={info}/>
    //     )
    // });
    return (
        <>
            <Loader active={masterclass.length === 0}/>
            <Card.Group stackable={true} className={"cardGroup"}>
                {cards}
            </Card.Group>
        </>
    )
}

export default InfoPanel
