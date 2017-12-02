import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'
import Home from './components/Home'
import Login from './components/Login'
import Search from './components/Search'
import Callback from './components/Callback'
import Discover from './components/Discover'
import DiscoverCategory from './components/DiscoverCategory'
import PlaylistDetail from './components/PlaylistDetail'
import NewReleases from './components/NewReleases'
import Toplists from './components/Toplists'
import AlbumDetail from './components/AlbumDetail'
import ArtistDetail from './components/ArtistDetail'
import TrackDetail from './components/TrackDetail'

import './stylesheets/main.scss'

const app_routes = [
  {
    component: App,
    exact: false,
    routes: [
      {
        path: '/',
        component: Home,
        exact: true
      },
      {
        path: '/discover',
        component: Discover,
        exact: true
      },
      {
        path: '/discover/:category',
        component: DiscoverCategory,
        exact: true
      },
      {
        path: '/new_releases',
        component: NewReleases,
        exact: true
      },
      {
        path: '/toplists',
        component: Toplists,
        exact: true
      },
      {
        path: '/albums/:id',
        component: AlbumDetail,
        exact: true
      },
      {
        path: '/artists/:id',
        component: ArtistDetail,
        exact: true
      },
      {
        path: '/tracks/:id',
        component: TrackDetail,
        exact: true
      },
      {
        path: '/playlists/:user/:id',
        component: PlaylistDetail,
        exact: true
      },
      {
        path: '/search',
        component: Search,
        exact: false
      }
    ]
  }
]

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => <route.component {...props} routes={route.routes} />}
  />
)

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/app" component={Callback} />
          {app_routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
          <Route component={() => <div>404</div>} />
        </Switch>
      </Router>
    </Provider>
  )
}

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(<Root />, document.querySelector('#root'))