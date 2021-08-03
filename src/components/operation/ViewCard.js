import React from 'react'
import { Card, Header, Image, Modal, Button, Label } from 'semantic-ui-react'
import eye from '../../assets/img/eye.svg'

export default function ViewCard ({operation, open, setOpen}) {
    const userCards = operation.users.filter(user => user.active).map(user => (
        <Card
          key={user._id}
          className={`watcherCard ${user.alive ? 'alive' : 'dead'}`}
        >
           {user.gif ? <Image src={user.gifUrl} wrapped ui={false}/> : <></>}
            <Card.Content>
                <Header as='h6'>{user.name}</Header>
        {/*       <Label>{user.experience || 0}</Label> */}
            </Card.Content>
        </Card>
    ))
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='fullscreen'
            trigger={
            <div className="viewCard">
                <Header as='h4'>{operation.name}</Header>
                <Card.Group
                  itemsPerRow={5}
                  doubling
                  centered
                >
                    {userCards}
                </Card.Group>
            </div>}
        >
        <Modal.Header>{operation.name}</Modal.Header>
        <Modal.Content image scrolling>
          <Card.Group
            centered
            doubling
            itemsPerRow={6}
          >
            {userCards}
          </Card.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Закрыть
          </Button>
        </Modal.Actions>
      </Modal>
        
    )
}