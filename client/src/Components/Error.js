import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Error() {

    const history = useHistory ();

    function routeChange() {
        history.push('/');
    }

    return (
        <main>
            <div className='wrap' >
                <h2>Error</h2>
                <p>Sorry! We just encountered an unexpected error.</p>
                <button className='button button-secondary' onClick={routeChange} > Home </button>
            </div>
        </main>
    );
}

