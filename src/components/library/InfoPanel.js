import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import {fetchLibraryRequest} from '../../redux/modules/library'
import {Card, Image} from 'semantic-ui-react'
import eye from '../../assets/img/eye.svg'
import { Link } from "react-router-dom";

function InfoPanel ({library, error}) {
    const dispatch = useDispatch()
    
    useEffect(
        () => {dispatch(fetchLibraryRequest())},
        []
    )
    console.log('library :', library);
    console.log('error :', error);

    const cards = library.map(info => {
        const infoRows = Object.entries(info.data).map(([key, value]) => <p key={key}>{`${key}: ${value}`}</p>)
        return (
            <Card key={info.infoId} as={Link} to={`/library/${info.infoId}`}>
                <Card.Content>
                    <Image
                        floated='right'
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

const mapStateToProps = state => {
    console.log('state :', state);
    return ({
    library: state.library.list,
    error: state.library.error
  })};
  
export default connect(mapStateToProps, {
    fetchLibraryRequest
})(InfoPanel)