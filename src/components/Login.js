import React, {useState} from 'react'
import { connect, useDispatch } from 'react-redux'
import {signInUserRequest, signOutUserRequest} from '../redux/modules/users';
import { Header, Button, Form, Modal, Menu, Icon } from 'semantic-ui-react'

function Login({signInUserRequest, isOpen, setOpen}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        signInUserRequest({ username, password });
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
                  onClick={(e) => {e.preventDefault(); login(); setOpen(false)}}
                  positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default connect(null, {
    signInUserRequest
})(Login)