import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import eye from '../assets/img/eye.svg'
import { signOutUserRequest, fetchUserPageRequest } from '../redux/modules/users'
import { useHistory  } from 'react-router-dom';
import { 
    Header, Image, Button, 
    Progress, Grid, Segment, 
    Rating, Table, Label,
    Icon
} from 'semantic-ui-react'

export default function UserPanel() {
    const dispatch = useDispatch()
    let history = useHistory();
    const user = useSelector(state => state.users.user)
    console.log('user :>> ', user);
    useEffect(
        () => {dispatch(fetchUserPageRequest(user.id))},
        [user]
    )
    const {exams = [], operations = []} = useSelector(state => state.users.page) || {}
    console.log('exams :>> ', exams);
    const examsRows = exams.map(ex => {
        const {success, points} = ex.result
        return (
            <Table.Row key={ex._id} negative={!success} positive={success}>
                <Table.Cell>
                    <Label >{ex.name}</Label>
                </Table.Cell>
                <Table.Cell>{success ? (<Icon name='checkmark'/>) : (<Icon name='close'/>)}</Table.Cell>
                <Table.Cell>
                    {points ? points : 0}
                </Table.Cell>
            </Table.Row>
        )
    })
    console.log('operations :>> ', operations);
    const operationsRows = operations.map(op => (
        <Table.Row key={op._id} negative={!op.success} positive={op.success}>
            <Table.Cell>
                <Label >{op.name}</Label>
            </Table.Cell>
            <Table.Cell>{op.success ? (<Icon name='checkmark'/>) : (<Icon name='close'/>)}</Table.Cell>
            <Table.Cell>{op.all_points}</Table.Cell>
            <Table.Cell>
                {op.result ? op.result : 0}
            </Table.Cell>
        </Table.Row>
    ))
    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column computer={6} mobile={16}>
                    <Image
                        rounded={true}
                        size="medium"
                        floated="left"
                        src={user.photo && user.photo !== '' ? user.photo : eye}
                    />
                </Grid.Column>
                <Grid.Column computer={10} mobile={16}>
                    <Segment size="massive">
                        <Header>Имя : {user.name}</Header>
                        <p>Боевая группа: {user.group}</p>
                        <p>Жизни: <Rating icon='heart' rating={user.lives || 0} maxRating={10} disabled={true}/></p>
                        <p>Уровень: <Rating icon='star' rating={user.level} maxRating={3} disabled={true}/></p>
                        <Progress 
                            value={user.experience} 
                            total={(user.level + 1) * 100} 
                            progress='ratio' 
                            indicating
                        />
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Segment >
                        <Header>Высадки</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Имя</Table.HeaderCell>
                                    <Table.HeaderCell>Успех</Table.HeaderCell>
                                    <Table.HeaderCell>Всего баллов</Table.HeaderCell>
                                    <Table.HeaderCell>Получено баллов</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {operationsRows}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Segment>
                    <Header>Экзамены</Header>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Имя</Table.HeaderCell>
                                    <Table.HeaderCell>Успех</Table.HeaderCell>
                                    <Table.HeaderCell>Получено баллов</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {examsRows}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column floated="right" stretched={false} width={4}>
                    <Button
                        content="Выйти"
                        color='black'
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(signOutUserRequest())
                            history.push('/')
                            }}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>)
}