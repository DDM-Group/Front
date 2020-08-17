import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {signInUserRequest} from '../redux/modules/users';
import { Message, Button, Form, Modal, Menu, Icon } from 'semantic-ui-react'

export default function Login({isOpen, setOpen}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const message = useSelector(state => state.users.message)
    const messageBlock = <Message positive={!message.failure} negative={message.failure}><Message.Header>{message.text}</Message.Header></Message>

    const login = () => {
      dispatch(signInUserRequest({ username, password }));
    }

    return (
        <Modal 
          open={isOpen}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          trigger={
            <Menu.Item>
              <Icon name='user circle' />
              Войти в базу
            </Menu.Item>
          }
        >
            <Modal.Header>
                Вход в Базу
            </Modal.Header>
            <Modal.Content>
                <Form
                  size="small"
                >
                    <Form.Field>
                        <label>Имя пользователя</label>
                        <input 
                        placeholder='username'
                        onChange={(e) => {setUsername(e.target.value)}}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Пароль</label>
                        <input 
                        placeholder='password'
                        type="password"
                        onChange={(e) => {setPassword(e.target.value)}}/>
                    </Form.Field>
                </Form>
                {message && message.text && message.text !== '' ? messageBlock : <></>}
            </Modal.Content>
            <Modal.Actions>
                <Button
                  content="Отмена"
                  color='black'
                  onClick={(e) => {e.preventDefault(); setOpen(false)}}
                />
                <Button 
                  content="Войти"
                  labelPosition='right'
                  icon='checkmark'
                  onClick={(e) => {e.preventDefault(); login(); }}
                  positive
                />
            </Modal.Actions>
        </Modal>
    )
}