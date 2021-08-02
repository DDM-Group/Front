import React, {useState} from 'react'
import {Button, Header, Image, Modal, Container, Table, Icon, Message, Card, List, Progress} from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import {registerOperationRequest, activateUserRequest, killUserRequest} from '../../redux/modules/operation'
import eye from '../../assets/img/eye.svg'
import moment from 'moment'

export default function Info ({info}) {
    const [open, setOpen] = useState(false)
    const message = useSelector(state => state.operation.message)
    const user = useSelector(state => state.users.user)
    console.log('info :>> ', info);
    const dispatch = useDispatch()
    const isAdmin = user.roles && user.roles.indexOf('ROLE_ADMIN') !== -1;
    const isModerator = user.roles && user.roles.indexOf('ROLE_MODERATOR') !== -1


    const isUserRegistred = info.users && info.users.findIndex(usr => usr._id === user.id) !== -1
    const isButtonRegisterDisabled = isUserRegistred;
    const isButtonActivateDisabled = !(moment().isBetween(moment(info.date).subtract(15, 'minutes'), moment(info.date)))
    const messageBlock = <Message positive={!message.failure} negative={message.failure}><Message.Header>{message.text}</Message.Header></Message>
    const cardRows = Object.entries(info.data || {}).filter((item, index) => index < 2).map(([key, value]) => <p key={key}>{`${key}: ${value.slice(0,70)}${value.length > 70 ? '...' : ''}`}</p>);
    const infoRows = Object.entries(info.data || {}).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);
    const users = info.users ? info.users.map(
        usr => (
          <Table.Row key={usr.username}>
            <Table.Cell>
              <Header as='h4' image>
                {usr.photo && usr.photo !== '' ?
                  <Image src={usr.photo} avatar size='mini' /> :
                  <Icon name="user" size="mini"/>
                }
                <Header.Content>
                  {usr.name}
                  <Header.Subheader>{usr.group}</Header.Subheader>
                </Header.Content>
                {isModerator &&
                 <Button
                          icon='user times'
                          color='red'
                          onClick={() => dispatch(killUserRequest({_id: usr._id}))}
                    />
                }
              </Header>
            </Table.Cell>
          </Table.Row>)
    ) : [];
    let cardColor = "green"
    if (info.panic >= 3)
        cardColor = 'yellow'
    if (info.panic >=5)
        cardColor = 'red'
    const card = (
        <Card >
            <Card.Content>
                <Image
                    src={info.photo ? `${info.photo}` : eye}
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
                        <div className="ui indicating progress">
                            <Progress
                                value={info.panic}
                                total={5}
                                progress='ratio'
                                color = {cardColor}
                            />
                            <div className="label">Уровень тревожности</div>
                        </div>
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
              { isAdmin ? (
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
                <Image size='medium' src={info.photo ? `${info.photo}` : eye} spaced="right"/>
                <Modal.Description>
                  <Table size="large">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Старший наблюдатель</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {info.manager ? (
                        <Header as='h4' image>
                        {info.manager.photo && info.manager.photo !== '' ?
                          <Image src={info.manager.photo} avatar size='mini' /> :
                          <Icon name="user" size="mini"/>
                        }
                        <Header.Content>
                          {info.manager.name}
                          <Header.Subheader>{info.manager.group}</Header.Subheader>
                        </Header.Content>
                      </Header>
                      ) : (<Header as='h4' image>
                             <Icon name="user" size="mini"/>
                          <Header.Content>
                            Отсутствует
                          </Header.Content>
                        </Header>)}
                      
                    </Table.Body>
                  </Table>
                    <div className="ui indicating progress">
                        <Progress
                            value={info.panic}
                            total={5}
                            progress='ratio'
                            color = {cardColor}
                        />
                        <div className="label">Уровень тревожности</div>
                    </div>
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
                  <>
                    <Button
                          content="Активировать"
                          labelPosition='right'
                          icon='crosshairs'
                          color='blue'
                          disabled={isButtonActivateDisabled}
                          onClick={() => dispatch(activateUserRequest({_id: info._id}))}
                    />
                    <Button
                          content="Смерть"
                          labelPosition='right'
                          icon='user times'
                          color='red'
                          disabled={!isButtonActivateDisabled}
                          onClick={() => dispatch(killUserRequest({_id: user.id}))}
                    />
                </>
                ) : (
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