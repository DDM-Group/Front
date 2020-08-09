import React, {useState} from 'react'
import { Button, Header, Image, Modal, Container, Table, Icon, Message, Card, List } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import {registerOperationRequest} from '../../redux/modules/operation'
import eye from '../../assets/img/eye.svg'

export default function Info ({info}) {
    const [open, setOpen] = useState(false)
    const message = useSelector(state => state.operation.message)
    const user = useSelector(state => state.users.user)
    const dispatch = useDispatch()

    const isButtonDisabled = info.users && info.users.findIndex(usr => usr._id === user.id) !== -1;
    const messageBlock = <Message positive={!message.failure} negative={message.failure}><Message.Header>{message.text}</Message.Header></Message>
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
                    <List.Item>
                        <List.Icon name="clock" />
                        <List.Content>
                          Дата: {info.date}
                        </List.Content>
                    </List.Item>
                    {infoRows.filter((item, index) => index < 2)}
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
            <Modal.Header>{info.name}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={info.photo ? `${info.photoUrl}` : eye} wrapped />
                <Modal.Description>
                    <p>Количество заявок: {(info.users && info.users.length) || 0}/{info.max_users}</p>
                    <p>Дата: {info.date}</p>
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
                <Button 
                    content="Записаться" 
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    disabled={isButtonDisabled}
                    onClick={() => dispatch(registerOperationRequest({_id: info._id}))}
                />
            </Modal.Actions>
        </Modal>
    
    )
}