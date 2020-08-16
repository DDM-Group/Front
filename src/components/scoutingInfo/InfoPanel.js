import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchScoutingInfoRequest} from '../../redux/modules/scoutingInfo'
import {Card, Image, Loader, Tab, Header, Form} from 'semantic-ui-react'
import Info from './Info'
import Request from './Request'
import {fetchScoutingRequestRequest} from "../../redux/modules/scoutingRequest";
import RequestPopUp from "./RequestPopUp";

export default function InfoPanel () {
    const dispatch = useDispatch()
    const scoutingInfo = useSelector(state => state.scoutingInfo.list) || []
    const scoutingRequest = useSelector(state => state.scoutingRequest.list) || []
    const error = useSelector(state => state.scoutingInfo.error)
    const [isNewRequestOpen, setNewRequestOpen] = useState(false)
    
    useEffect(
        () => {
            dispatch(fetchScoutingInfoRequest())
            dispatch(fetchScoutingRequestRequest())
            console.log('FETCH, MOTHRTFUCKER!')
        },
        []
    )
    console.log('scoutingInfo :', scoutingInfo);
    console.log('scoutingRequest :', scoutingRequest);
    console.log('error :', error);

    const cardsInfo = scoutingInfo.map(info => {
        return (
            <Info info={info}/>
        )
    });

    const newRequestCard = (
        <RequestPopUp
        isOpen={isNewRequestOpen}
        setOpen={setNewRequestOpen}
        />
    )
    const cardsRequest = [
        newRequestCard,
        ...scoutingRequest.map(info => {
            return (
              <Request info={info}/>
            )
        })
    ]

    const panes = [
        {
            menuItem: { key: 'Доступная информация', icon: 'users', content: 'Доступная информация' },
            render: () => <Tab.Pane>
                    <Card.Group stackable={true} className={"cardGroup"}>
                        {cardsInfo}
                    </Card.Group>
            </Tab.Pane>,

        },
        {
            menuItem: { key: 'Запросы на разведку', icon: 'users', content: 'Запросы на разведку' },
            render: () => <Tab.Pane>
                <Card.Group stackable={true} className={"cardGroup"}>
                    {cardsRequest}
                </Card.Group>
            </Tab.Pane>,
        }
]
    return  <Tab loading={scoutingInfo.length === 0} panes={panes} />
}