import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchScoutingRequestRequest} from '../../redux/modules/scoutingRequest'
import {Card, Loader, Tab} from 'semantic-ui-react'
import Info from './Info'

export default function InfoPanel () {
    const dispatch = useDispatch()
    const scouting = useSelector(state => state.scoutingRequest.list) || []
    const error = useSelector(state => state.scoutingRequest.error)
    
    useEffect(
        () => {dispatch(fetchScoutingRequestRequest())},
        []
    )
    console.log('scoutingRequest :', scouting);
    console.log('error :', error);

    const cards = scouting.map(info => {
        return (
            <Info info={info}/>
        )
    });

    const panes = [
        {
            menuItem: { key: 'Доступная информация', icon: 'users', content: 'Доступная информация' },
            render: () => <Tab.Pane>
                    <Card.Group stackable={true} className={"cardGroup"}>
                        {cards}
                    </Card.Group>
            </Tab.Pane>,

        },
]
    return  <Tab loading={scouting.length === 0} panes={panes} />
}