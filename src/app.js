import React from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

import App from './components/app';

const handleError = err => {
    console.error(err);
    swal('Oops!', err.message, 'error');
};

(async function() {
    try {
        ReactDOM.render(
            <App />,
            document.getElementById('js-app')
        );

    } catch(err) {
        handleError(err);
    }
})();
