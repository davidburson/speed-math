import React from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert';

import PageOfProblems from './components/page-of-problems';

const handleError = err => {
    console.error(err);
    swal('Oops!', err.message, 'error');
};

(async function() {
    try {
        ReactDOM.render(
            <PageOfProblems />,
            document.getElementById('js-app')
        );
    } catch(err) {
        handleError(err);
    }
})();
