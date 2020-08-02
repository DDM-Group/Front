import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchLibraryRequest} from '../../redux/modules/library'
import {Card, Image} from 'semantic-ui-react'
import eye from '../../assets/img/eye.svg'
import { Link } from "react-router-dom";

export default function InfoPanel () {
    const dispatch = useDispatch()
    const library = useSelector(state => state.library.list) || []
    const error = useSelector(state => state.library.error)
    
    useEffect(
        () => {dispatch(fetchLibraryRequest())},
        []
    )
    console.log('library :', library);
    console.log('error :', error);

    const cards = library.map(info => {
        //TODO: перенести логику рендера динамической инфы в отдельный компонент
        //TODO: реализовать уровни доступа
        //TODO: добавить сортировку (кастомную в зависимости от модели)
        const infoRows = Object.entries(info.data)
            .filter((item, index) => index < 3)
            .map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>)
        return (
            <Card key={info._id} as={Link} to={`/library/${info._id}`}>
                <Card.Content>
                    <Image
                        src={info.photo ? `url(${ info.photo})` : eye}
                    />
                    <Card.Header>{info.name}</Card.Header>
                    <Card.Meta>{info.category}</Card.Meta>
                    <Card.Description>
                        {infoRows}
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