import Session from './session.js'
let button = document.querySelector('button');

const session = new Session();
document.getElementById('start').onclick = event => {
    session.get_session();
    if (session.session_not_initialised()) {
        session.start_session();
        document.getElementById('session').innerHTML = 'Your session has started';
    }
}

document.getElementById('stop').onclick = event => {
    session.get_session();
    if (session.session_not_initialised()) return;
    session.upload();
}