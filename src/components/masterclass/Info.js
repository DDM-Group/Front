import React, {useState} from 'react'
import { Button, Header, Image, Modal, Table, Icon, Message, Card, List, Tab } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import {registerMasterclassRequest} from '../../redux/modules/masterclass'
import eye from '../../assets/img/eye.svg'
import MCTab from './MCTab'

export default function Info ({mcs, name}) {
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useDispatch()

    const first = mcs[0]
    const firstRows = Object.entries(first.data || {}).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);

    const panes = mcs.map(mc => {
        const date = new Date(mc.date)
        const time = date.toTimeString()
        console.log('time :>> ', time);
        return {
            menuItem: time.slice(0,5),
            render: () => (<MCTab mc={mc}/>)
        }
    })
    
    const card = (
        <Card >
            <Card.Content>
                <Image
                    src={first.photo ? `${first.photoUrl}` : eye}
                    style={{marginBottom: '1rem'}}
                />
                <Card.Header>{first.name}</Card.Header>
                <Card.Meta>{first.category}</Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item>
                      <List.Icon name="users"/>
                      <List.Content>
                          Количество занятий: {mcs.length}
                      </List.Content>
                    </List.Item>
                    {firstRows.filter((item, index) => index < 2)}
                  </List>
                </Card.Description>
            </Card.Content>
        </Card>
        )

    return (
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={card}
        >
            <Modal.Header>{first.name}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={first.photo ? `${first.photoUrl}` : eye} wrapped />
                <Tab  
                  menu={{ fluid: true, vertical: true, tabular: 'right' }}
                  panes={panes}
                  onTabChange={(e,d,index) => {
                      console.log('e :>> ', e);
                      console.log('d :>> ', d);
                      console.log('index :>> ', index);
                      setActiveTab(d.activeIndex)
                  }}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='black'
                    content="Закрыть"
                    icon='angle left'
                    onClick={() => setOpen(false)}
                />
                <Button 
                    content="Записаться" 
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    onClick={() => dispatch(registerMasterclassRequest({_id: mcs[activeTab]._id}))}
                />
            </Modal.Actions>
        </Modal>
    
    )
}