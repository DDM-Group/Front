import React from 'react'
import { Container, Image, Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import eye from '../assets/img/eye.svg'
import {signOutUserRequest} from '../redux/modules/users'
import { useHistory  } from 'react-router-dom';

export default function UserPanel() {
    const dispatch = useDispatch()
    let history = useHistory();
    const user = useSelector(state => state.users.user)
    return (
        
        <Container>
            <Image
                rounded={true}
                size="medium"
                floated="left"
                src={user.photo ? `url(${user.photo})` : eye}
            />
            <h3>Имя пользователя: {user.username}</h3>
            <div>
              <p>Уровень: {user.level}</p>
            </div>
            <Button
              content="Выйти"
              color='black'
              onClick={(e) => {
                  e.preventDefault()
                  dispatch(signOutUserRequest())
                  history.push('/')
                }}
            />
        </Container>
    )
}