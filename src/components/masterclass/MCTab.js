import React, {useState} from 'react'
import { Button, Header, Image, Modal, Table, Icon, Message, Card, List, Tab } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import {registerMasterclassRequest} from '../../redux/modules/masterclass'
import eye from '../../assets/img/eye.svg'

export default function MCTab ({mc}) {
    const message = useSelector(state => state.masterclass.message)
    const user = useSelector(state => state.users.user)
    const isButtonDisabled = mc.students && ((mc.students.length >= mc.max_students) || (mc.students.findIndex(stud => stud.id === user.id) !== -1));
    const messageBlock = <Message positive={!message.failure} negative={message.failure}><Message.Header>{message.text}</Message.Header></Message>
    const mcRows = Object.entries(mc.data || {}).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);
    const students = mc.students ? mc.students.map(
        student => (
          <Table.Row key={student.username}>
            <Table.Cell>
              <Header as='h4' image>
                {student.photo && student.photo !== '' ?
                  <Image src={student.photoUrl} avatar size='mini' /> :
                  <Icon name="user" size="mini"/>
                }
                <Header.Content>
                  {student.name}
                  <Header.Subheader>{student.group}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
          </Table.Row>)
    ) : [];


    return (
          <Tab.Pane>
            <Modal.Description>
              <p>Количество человек: {(mc.students && mc.students.length) || 0}/{mc.max_students}</p>
              {mcRows}
              <Table size="large">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Записавшиеся наблюдатели</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                  {students}
                </Table.Body>
              </Table>
              {message && message.text && message.text !== '' ? messageBlock : <></>}
            </Modal.Description>
          </Tab.Pane>
        ) 
} 