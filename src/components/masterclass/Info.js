import React, {useEffect} from 'react'
import { Container, Image, Table, Header, Icon } from 'semantic-ui-react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchInfoRequest} from '../../redux/modules/masterclass'
import eye from '../../assets/img/eye.svg'

export default function Info() {
    const info = useSelector(state => state.masterclass.info)
    const error = useSelector(state => state.masterclass.error)
    const { infoId } = useParams()
    const dispatch = useDispatch()
    
    useEffect(
        () => {dispatch(fetchInfoRequest({_id: infoId}))},
        []
    )

    const infoRows = Object.entries(info.data || {}).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);
    const students = info.students ? info.students.map(
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
    console.log('info :>> ', info);
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
              <p>Количество человек: {(info.students && info.students.length) || 0}/{info.max_students}</p>
              <p>Дата: {info.date}</p>
              <div>
              {infoRows}
              <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Записавшиеся наблюдатели</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {students}
                        </Table.Body>
                        </Table>
              </div>
            </div>
        </Container>
    )
}