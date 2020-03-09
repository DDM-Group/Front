import React from 'react'
import {useParams} from 'react-router-dom'

export default function Info(params) {
    const {infoId} = useParams()
return (<h3>Requested topic ID: {infoId}</h3>)
}