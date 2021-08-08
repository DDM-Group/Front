import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import {fetchOperationRequest} from '../../redux/modules/operation'
import { Card, Loader, Header, Modal } from 'semantic-ui-react'
import Info from './Info'

function InfoPanel() {
    const dispatch = useDispatch()
    const [isMessageOpen, setMessageOpen] = useState(true)
    const operation = useSelector(state => state.operation.list) || []
    const error = useSelector(state => state.operation.error)
    
    useEffect(
        () => {dispatch(fetchOperationRequest())},
        []
    )
    console.log('operation :', operation);
    console.log('error :', error);

    const cards = operation.map(info => {
        return (
            <Info info={info}/>
        )
    });
    return (
        <>
             <Modal
                size='fullscreen'
                open={isMessageOpen}
                onClose={() => setMessageOpen(false)}
            >
                <Modal.Header>Сотрудникам базы Ц.У.Н.А.М.И.</Modal.Header>
                <Modal.Content>
                    <p>По решению Совета Конфедерации деятельность вашей организации была признана деструктивной.</p>
                    <p>В ходе операций вы:</p>
                    <ul>
                        <li>Неоднократно искажали приказы Совета Конфедерации</li>
                        <li>Совершали необоснованные убийства мирных жителей, сотрудников правоохранительных органов</li>
                        <li>Подвергли геноциду целую расу</li>
                        <li>Совершали многократное превышение должностных полномочий</li>
                        <li>Совершали неоднократные проникновения на охраняемые территории</li>
                        <li>Были замечены в жестоком обращении с домашними животными</li>
                        <li>Содействовали организованной преступности</li>
                        <li>Укрыватели опасных преступников</li>
                        <li>Неоднократно нарушали общественный порядок и правила дорожного движения</li>
                        <li>Мусорили на улицах</li>
                    </ul>
                    <p>На основании вышеперечисленных претензий, вы отстранены от правоохранительной деятельности до дальнейшего решения Совета Конфедерации</p>
                    <p>По решению Совета Конфедерации вам запрещено покидать жилые помещения базы Ц.У.Н.А.М.И.</p>
                    <p>Для проверки исполения данного указания к вам будет направлено проверяющее устройство</p> 
                </Modal.Content>
            </Modal>
            <Header as='h2' attached='top'>
                Высадки
            </Header>
            <Loader active={operation.length === 0}/>
            <Card.Group stackable={true} className={"cardGroup"}>
                {cards}
            </Card.Group>
        </>
    )
}

export default InfoPanel
