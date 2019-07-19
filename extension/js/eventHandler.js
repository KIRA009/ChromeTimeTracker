import Session from './session.js'

let session = new Session();
session.close_session();

chrome.tabs.onCreated.addListener(tab => {
    session.get_session();
    if (session.session_not_initialised())
        return
    session.session.tab_manager.add_tab(tab)
    session.update();
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.status === 'loading') return
    session.get_session();
    if (session.session_not_initialised())
        return
    session.session.tab_manager.update_tab(tab)
    if (tabId === session.session.active)
        session.session.tab_manager.start_tracking(tabId)
    session.update();
})

chrome.tabs.onActivated.addListener(({tabId}) => {
    session.get_session();
    if (session.session_not_initialised())
        return
    session.start_new_tracking(tabId);
    session.update();
})

chrome.tabs.onRemoved.addListener((tabId, {isWindowClosing}) => {
    session.get_session();
    if (session.session_not_initialised()) return
    if (isWindowClosing) {
        console.log(tabId);
        if (tabId === session.session.active)
            session.upload();
    }
    else {
        session.session.tab_manager.stop_tracking(tabId);
        session.update();
    }
})