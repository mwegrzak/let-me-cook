import * as React from 'react';
import { useRouteError } from 'react-router-dom'

export default function Error() {
    const error = useRouteError()
    return (
        <>
            <h1>An error occured :(</h1>
            <div>{error.message}</div>
            <div>{error.status}</div>
        </>
    )
}
