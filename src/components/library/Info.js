import React, {useState} from 'react'
import { Button, Image, Modal, Card, List } from 'semantic-ui-react'
import eye from '../../assets/img/eye.svg'

export default function Info ({info}) {
    const [open, setOpen] = useState(false)

    const cardRows = Object.entries(info.data || {}).filter((item, index) => index < 3).map(([key, value]) => <p key={key}>{`${key}: ${value.slice(0,70)}${value.length > 70 ? '...' : ''}`}</p>);
    const infoRows = Object.entries(info.data || {}).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>);
    
    const card = (
        <Card >
            <Card.Content>
                <Image
                    src={info.photo ? `${info.photoUrl}` : eye}
                    style={{marginBottom: '1rem'}}
                />
                <Card.Header>{info.name}</Card.Header>
                <Card.Meta>{info.category}</Card.Meta>
                <Card.Description>
                  <List>
                    {cardRows}
                  </List>
                </Card.Description>
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
            <Modal.Content image scrolling>
                <Image size='medium' src={info.photo ? `${info.photoUrl}` : eye} spaced="right"/>
                <Modal.Description>
                    {infoRows}
                </Modal.Description>
                {info.attachemntsUrls.map(attach => (<>{attach.indexOf('video') !== -1 ? <video><source src={attach}/></video> : <Image src={attach}/> }</>))}
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