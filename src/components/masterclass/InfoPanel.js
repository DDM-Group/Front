import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchMasterclassRequest} from '../../redux/modules/masterclass'
import {Card, Image, List} from 'semantic-ui-react'
import eye from '../../assets/img/eye.svg'
import { Link } from "react-router-dom";
import { API_HTTP } from '../../configs/environment'

export default function InfoPanel () {
    const dispatch = useDispatch()
    const masterclass = useSelector(state => state.masterclass.list) || []
    const error = useSelector(state => state.masterclass.error)
    
    useEffect(
        () => {dispatch(fetchMasterclassRequest())},
        []
    )
    console.log('masterclass :', masterclass);
    console.log('error :', error);

    const cards = masterclass.map(info => {
        //TODO: перенести логику рендера динамической инфы в отдельный компонент
        //TODO: реализовать уровни доступа
        //TODO: добавить сортировку (кастомную в зависимости от модели)
        const infoRows = Object.entries(info.data)
            .filter((item, index) => index < 2)
            .map(([key, value]) => (
              <List.Item key={key}>
                 <List.Icon name="info circle"/> 
                 <List.Content>{`${key}: ${value}`}</List.Content>
              </List.Item>))
        
        return (
            <Card key={info._id} as={Link} to={`/masterclass/${info._id}`}>
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
                              Количество человек: {info.students.length}/{info.max_students}
                          </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name="clock" />
                            <List.Content>
                              Дата: {info.date}
                            </List.Content>
                        </List.Item>
                        {infoRows}
                      </List>
                    </Card.Description>
                </Card.Content>
            </Card>
            )
    });
    return (
        <Card.Group stackable={true} className={"cardGroup"}>
            {cards}
        </Card.Group>
    )
}