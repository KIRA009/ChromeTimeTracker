import Session from './session.js'
let button = document.querySelector('button');

let session = new Session();
session.get_session();
if (!session.session_not_initialised()) document.getElementById('session').innerHTML = 'Your session is running'


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
    document.getElementById('session').innerHTML = 'Your session has ended';
    setTimeout(() => document.getElementById('session').innerHTML = 'Click to start your session', 2000)
}


document.getElementById('set').onclick = event => {
    session.get_session();
    session.set_token(document.getElementsByTagName('input')[0].value)
}