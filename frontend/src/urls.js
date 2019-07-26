import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import Home from './views/Home'
import History from './views/History'
import Account from './views/Account'

let urls = {
    signin: {
        url: '/signin',
        component: SignIn,
    },
    signup: {
        url: '/signup',
        component: SignUp
    },
    home: {
        url: '/home',
        component: Home
    },
    history: {
        url: '/history',
        component: History
    },
    account: {
        url: '/account',
        component: Account
    }
}

export default urls;