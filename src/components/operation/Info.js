import React, {useState} from 'react'
import { Button, Header, Image, Modal, Container, Table, Icon, Message, Card, List } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import {registerOperationRequest, activateUserRequest} from '../../redux/modules/operation'
import eye from '../../assets/img/eye.svg'
import moment from 'moment'

export default function Info ({info}) {
    const [open, setOpen] = useState(false)
    const message = useSelector(state => state.operation.message)
    const user = useSelector(state => state.users.user)
    console.log('user :>> ', user);
    const dispatch = useDispatch()

    const isUserRegistred = info.users && info.users.findIndex(usr => usr._id === user.id) !== -1
    const isButtonRegisterDisabled = isUserRegistred;
    const isButtonActivateDisabled = !(moment().isBetween(moment(info.date).subtract(15, 'minutes'), moment(info.date)))
    const messageBlock = <Message positive={!message.failure} negative={message.failure}><Message.Header>{message.text}</Message.Header></Message>
    const cardRows = Object.entries(info.data || {}).filter((item, index) => index < 2).map(([key, value]) => <p key={key}>{`${key}: ${value.slice(0,70)}${value.length > 70 ? '...' : ''}`}</p>);
    const infoRows = Object.entries(info.data || {}).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);
    const users = info.users ? info.users.map(
        user => (
          <Table.Row key={user.username}>
            <Table.Cell>
              <Header as='h4' image>
                {user.photo && user.photo !== '' ?
                  <Image src={user.photoUrl} avatar size='mini' /> :
                  <Icon name="user" size="mini"/>
                }
                <Header.Content>
                  {user.name}
                  <Header.Subheader>{user.group}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
          </Table.Row>)
    ) : [];
    
    const card = (
        <Card >
            <Card.Content>
                <Image
                    src={info.photo ? `${info.photoUrl}` : eye}
                    style={{marginBottom: '1rem'}}
                />
                <Card.Header>{info.name}</Card.Header>
                <Card.Meta>{info.category}</Card.Meta>
                <Card.Description>
                  <List>
                    <List.Item>
                      <List.Icon name="users"/>
                      <List.Content>
                          Количество заявок: {info.users.length}/{info.max_users}
                      </List.Content>
                    </List.Item>
                    {cardRows}
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
            <Modal.Header>
              {info.name}
              { user.roles && user.roles.indexOf('ROLE_ADMIN') !== -1 ? (
                <Button
                  floated="right"
                  content="Активировать всех"
                  labelPosition='right'
                  icon='crosshairs'
                  color='red'
                  onClick={() => dispatch(activateUserRequest({opId: info._id }))}
                />
              ): <></>}
            </Modal.Header>
            <Modal.Content image scrolling>
                <Image size='medium' src={info.photo ? `${info.photoUrl}` : eye} spaced="right"/>
                <Modal.Description>
                  <Table size="large">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Старший наблюдатель</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Header as='h4' image>
                        {info.manager.photo && info.manager.photo !== '' ?
                          <Image src={info.manager.photoUrl} avatar size='mini' /> :
                          <Icon name="user" size="mini"/>
                        }
                        <Header.Content>
                          {info.manager.name}
                          <Header.Subheader>{info.manager.group}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Body>
                  </Table>
                  <p>Количество заявок: {(info.users && info.users.length) || 0}/{info.max_users}</p>
                  {infoRows}
                  <Table size="large">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Записавшиеся наблюдатели</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users}
                    </Table.Body>
                  </Table>
                  {message && message.text && message.text !== '' ? messageBlock : <></>}
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='black'
                    content="Закрыть"
                    icon='angle left'
                    onClick={() => setOpen(false)}
                />
                { isUserRegistred ? (
                  <Button
                      content="Активировать"
                      labelPosition='right'
                      icon='crosshairs'
                      color='blue'
                      disabled={isButtonActivateDisabled}
                      onClick={() => dispatch(activateUserRequest({_id: info._id}))}
                />) : (
                  <Button 
                    content="Записаться" 
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    disabled={isButtonRegisterDisabled}
                    onClick={() => dispatch(registerOperationRequest({_id: info._id}))}
                />
                  )
                }
                
            </Modal.Actions>
        </Modal>
    
    )
}