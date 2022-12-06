/* eslint-disable no-lonely-if */
import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import './App.css'
import {Container} from './StyledComponent'
import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import SavedVideos from './components/SavedVideos'
import NextWatchContext from './context/NextWatchContext'
import Gaming from './components/Gaming'

class App extends Component {
  state = {
    activeRoute: 'HOME',
    savedList: [],
    likedList: [],
    disLikedList: [],
    isDarkMode: false,
  }

  updateIsDarkMode = () => {
    const {isDarkMode} = this.state
    this.setState({isDarkMode: !isDarkMode})
  }

  updateActiveRoute = id => {
    this.setState({activeRoute: id})
  }

  updateSavedList = selVideo => {
    const {savedList} = this.state
    const isExits = savedList.filter(obj => obj.id === selVideo.id).length === 0
    if (!isExits) {
      const ind = savedList.indexOf(selVideo)
      savedList.pop(ind)
      this.setState({savedList})
      console.log('in')
    } else {
      console.log('not')
      savedList.push(selVideo)
      this.setState({savedList})
    }
  }

  updateLikedList = videoDetails => {
    const {likedList, disLikedList} = this.state
    const isExitsL =
      likedList.filter(obj => obj.id === videoDetails.id).length !== 0
    const isExitsD =
      disLikedList.filter(obj => obj.id === videoDetails.id).length !== 0
    if (!isExitsL) {
      if (isExitsD) {
        const ind = disLikedList.indexOf(videoDetails)
        disLikedList.pop(ind)
        likedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      } else {
        likedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      }
    }
  }

  updateDislikedList = videoDetails => {
    const {likedList, disLikedList} = this.state
    const isExitsL =
      likedList.filter(obj => obj.id === videoDetails.id).length !== 0
    const isExitsD =
      disLikedList.filter(obj => obj.id === videoDetails.id).length !== 0
    if (!isExitsD) {
      if (isExitsL) {
        const ind = likedList.indexOf(videoDetails)
        likedList.pop(ind)
        disLikedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      } else {
        disLikedList.push(videoDetails)
        this.setState({disLikedList, likedList})
      }
    }
  }

  render() {
    const {
      activeRoute,
      savedList,
      disLikedList,
      likedList,
      isDarkMode,
    } = this.state
    // console.log('app', savedList)
    return (
      <Container color={isDarkMode ? 'white' : 'black'}>
        <NextWatchContext.Provider
          value={{
            activeRoute,
            updateActiveRoute: this.updateActiveRoute,
            savedList,
            updateSavedList: this.updateSavedList,
            likedList,
            updateLikedList: this.updateLikedList,
            disLikedList,
            updateDislikedList: this.updateDislikedList,
            isDarkMode,
            updateIsDarkMode: this.updateIsDarkMode,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />

            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route component={NotFound} />
          </Switch>
        </NextWatchContext.Provider>
      </Container>
    )
  }
}

export default App
