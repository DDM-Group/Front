import React, {useState} from 'react'
import {Header, Button, Form, Modal, Card, Image} from 'semantic-ui-react'
import plus from "../../assets/img/plus.svg";
import {registerScoutingRequestRequest} from '../../redux/modules/scoutingRequest';
import {useDispatch} from "react-redux";

export default function RequestPopUp({ isOpen, setOpen, info}) {
    const [requestObject, setRequestObject] = useState('');
    const [place, setPlace] = useState('');
    const [task, setTask] = useState('');
    const dispatch = useDispatch()
    const isButtonDisabled = requestObject === '' || place === '' || task === ''

    return (
        <Modal
            open={isOpen}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={
                <Card>
                    <Card.Content>
                        <Image
                            src={plus}
                            style={{marginBottom: '1rem'}}
                        />
                        <Header textAlign='center'>Сделать запрос</Header>
                    </Card.Content>
                </Card>
            }
        >
            <Modal.Header>
                Новый запрос
            </Modal.Header>
            <Modal.Content>
                <Form
                    size="small"
                >
                    <Form.Field>
                        <label>Объект запроса</label>
                        <input
                            placeholder='requestObject'
                            onChange={(e) => {setRequestObject(e.target.value)}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Место</label>
                        <input
                            placeholder='place'
                            onChange={(e) => {setPlace(e.target.value)}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Задача</label>
                        <input
                            placeholder='task'
                            onChange={(e) => {setTask(e.target.value)}}/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    content="Отмена"
                    color='black'
                    onClick={(e) => {e.preventDefault(); setOpen(false)}}
                />
                <Button
                    content="Отправить запрос"
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    disabled={isButtonDisabled}
                    onClick={() => dispatch(registerScoutingRequestRequest({
                        requestObject,
                        place,
                        task
                    }))}
                />
            </Modal.Actions>
        </Modal>
    )
}
//onClick={() => dispatch(registerMasterclassRequest({_id: info._id}))}