import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'

export default function ViewCard ({operation}) {
    const userCards = operation.users.filter(user => user.active).map(user => (
        <Card
          color={user.alive ? 'green' : 'red'}
        >
            <Image src={user.gifUrl} wrapped ui={false} />
            <Card.Content>
                <Header>{user.name}</Header>    
            </Card.Content>
        </Card>
    ))
    return (
        <div className="viewCard">
            <Header>{operation.name}</Header>
            <Card.Group
              itemsPerRow={3}
            >
                {userCards}
            </Card.Group>
        </div>
    )
}