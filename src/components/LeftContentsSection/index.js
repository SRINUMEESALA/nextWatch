import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {IoLogoGameControllerB} from 'react-icons/io'
import {MdPlaylistAdd} from 'react-icons/md'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import ContactUs from '../ContactUs'
import NextWatchContext from '../../context/NextWatchContext'

const RoutesList = [
  {
    RouteName: 'Home',
    id: 'HOME',
    icon: <AiFillHome className="mb-0 h5" />,
    path: '/',
  },
  {
    RouteName: 'Trending',
    id: 'TRENDING',
    icon: <AiFillFire className="mb-0 h5" />,
    path: '/trending',
  },
  {
    RouteName: 'Gaming',
    id: 'GAMING',
    icon: <IoLogoGameControllerB className="mb-0 h5" />,
    path: '/gaming',
  },
  {
    RouteName: 'Saved Videos',
    id: 'SAVEDVIDEOS',
    icon: <MdPlaylistAdd className="mb-0 h5" />,
    path: '/saved-videos',
  },
]

class LeftContentsSection extends Component {
  renderRoutes = () => {
    console.log()
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {activeRoute, updateActiveRoute} = value
          const onRouteClick = id => {
            updateActiveRoute(id)
          }
          return (
            <ul className="list-unstyled">
              {RoutesList.map(obj => (
                <li key={uuidv4()}>
                  <Link to={`${obj.path}`} className="link">
                    <button
                      className={`buttonRoute d-flex align-items-center p-2 ${
                        activeRoute === obj.id ? 'text-danger' : ''
                      }`}
                      type="button"
                      onClick={() => onRouteClick(obj.id)}
                    >
                      {obj.icon}
                      <p className="ml-3 mb-0">{obj.RouteName}</p>
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }

  render() {
    return (
      <div className=" col-2 overflow-auto leftContentsCon d-flex flex-column justify-content-between">
        {this.renderRoutes()}
        <ContactUs />
      </div>
    )
  }
}

export default LeftContentsSection
