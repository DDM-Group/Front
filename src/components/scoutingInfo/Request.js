import React, {useState} from 'react'
import { Button, Image, Modal, Card, List, Progress } from 'semantic-ui-react'
import eye from '../../assets/img/eye.svg'

export default function Request ({info}) {
    const [open, setOpen] = useState(false)
    //const startMill = (info.startDate && info.startDate.getMilliseconds()) || 0
    //const nowMill = (info.dueDate && Date.now().getMilliseconds() - startMill) || 10
    //const endMill = (info.dueDate && info.bueDate.getMilliseconds() - startMill) || 100
    //const percent = nowMill/endMill*100
    const percent = 10
/*
* name: String,
    level: Number,
    requestBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requestObject: String,
    place: String,
    task: String
* */

    const card = (
        <Card >
            <Card.Content>
                <Image
                    src={info.photo ? `${info.photo}` : eye}
                    style={{marginBottom: '1rem'}}
                />
                <Card.Header>{info.name}</Card.Header>
                <Card.Meta>{info.category}</Card.Meta>
                <Card.Description>
                    <List>
                        <p>Обект: {info.requestObject}</p>
                        <p>Место: {info.place}</p>
                        <p>Задача: {info.task}</p>
                    </List>
                </Card.Description>
                <Progress percent={percent} indicating />
            </Card.Content>
        </Card>
    )

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={card}
        >
            <Modal.Header>{info.name}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={info.photo ? `${info.photo}` : eye} wrapped />
                <Modal.Description>
                    <p>Обект: {info.requestObject}</p>
                    <p>Место: {info.place}</p>
                    <p>Задача: {info.task}</p>
                    <Progress percent={percent} indicating />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='black'
                    content="Закрыть"
                    icon='angle left'
                    onClick={() => setOpen(false)}
                />
            </Modal.Actions>
        </Modal>

    )
}