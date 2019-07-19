export default class TabManager {
    constructor(tabs=null, dicarded_tabs=null) {
        var tabs = tabs || {};
        this.tabs = tabs;
        this.discarded_tabs = dicarded_tabs || [];
    }

    add_tab = (tab) => {
        this.tabs[tab.id] = {
            url: tab.url || null,
            title: tab.title || null,
            favIconUrl: tab.favIconUrl || null,
            active_start_times: [],
            active_end_times: [],
        }
    }

    discard = (tabId) => {
        this.stop_tracking(tabId);
        this.discarded_tabs.push(this.tabs[tabId]);
        delete this.tabs[tabId]
    }

    update_tab = tab => {
        let get_tab = this.tabs[tab.id];
        if (get_tab.url != tab.url) {
            this.discard(tab.id)
            this.add_tab(tab);
        }
        else {
            for (var key in get_tab) {
                if  (tab.hasOwnProperty(key))
                    get_tab[key] = tab[key];
            }
        }
    }

    start_tracking = (tabId) => {
        if (this.tabs[tabId].active_end_times.length === this.tabs[tabId].active_start_times.length)
            this.tabs[tabId].active_start_times.push(new Date())
    }
    
    stop_tracking = (tabId) => {
        if (this.tabs[tabId].active_end_times.length - this.tabs[tabId].active_start_times.length === -1)
            this.tabs[tabId].active_end_times.push(new Date())
    }
}
