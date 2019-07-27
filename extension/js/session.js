import TabManager from './tabManager.js'

const uuid = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

let _instance;

export default class Session {
    constructor() {
        if (!_instance) {
            _instance = window.localStorage.getItem('session') ? JSON.parse(window.localStorage.getItem('session')) : {
                id: null,
                tab_manager: new TabManager(),
                active: null,
                start: null, 
                end: null
            }
        }
        this.session = _instance;
        this.update()
    }

    update = (key=null, value=null) => {
        if (key)
            this.session[key] = value
        window.localStorage.setItem('session', JSON.stringify(this.session));
    }

    start_session = () => {
        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                this.session.tab_manager.add_tab(tab);
                if (tab.active) {
                    this.update('active', tab.id);
                    this.session.tab_manager.start_tracking(tab.id);
                }
            });
            this.update();
            this.update('id', uuid());
            this.update('start',  new Date());
        })
    }

    get_session = () => {
        let session = JSON.parse(window.localStorage.getItem('session'));
        if (session) {
            this.session = session;
            this.session.tab_manager = new TabManager(this.session.tab_manager.tabs, 
                this.session.tab_manager.discarded_tabs);
        }
        else
            this.session = null;
    }

    session_not_initialised = () => {
        try { return !this.session.id}
        catch {return true}
    }

    start_new_tracking = (tabId) => {
        this.session.tab_manager.stop_tracking(this.session.active);
        this.session.tab_manager.start_tracking(tabId);
        this.session.active = tabId;
    }

    add_to_sessions = () => {
        let sessions = window.localStorage.getItem('sessions') ? JSON.parse(window.localStorage.getItem('sessions')) : [];
        this.session.end = new Date();
        this.update();
        sessions.push(this.session);
        window.localStorage.setItem('sessions', JSON.stringify(sessions));
    }

    close_session = () => {
        window.localStorage.removeItem('session');
    }

    close_sessions = () => {
        window.localStorage.removeItem('sessions');
    }

    upload = () => {
        this.session.tab_manager.stop_tracking(this.session.active);
        this.update();
        this.add_to_sessions();
        this.close_session();
        const xhttp = new XMLHttpRequest();
        var form_data = new FormData();
        form_data.append('sessions', window.localStorage.getItem('sessions'))
        form_data.append('token', this.get_token())
        var self = this;
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (this.response === 'Invalid token') {
                    alert('Token has expired, please visit website to set new token')
                    return;
                }
                self.set_token(this.response);
                self.close_sessions();
                alert('Pass')
            }
            else if ((this.readyState === 4 && this.status !== 200)) {
                alert('Fail')
            }
        }
        try{
            xhttp.open('POST', 'http://127.0.0.1:5000/save-sessions/')
            xhttp.send(form_data);
        } catch{}
    }

    set_token = token => window.localStorage.setItem('Token', token);
    get_token = () => window.localStorage.getItem('Token')
}