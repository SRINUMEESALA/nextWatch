// import {Component} from 'react'
// import ReactPlayer from 'react-player'
// import {formatDistanceToNow} from 'date-fns'
// import Loader from 'react-loader-spinner'
// import {BiLike, BiDislike} from 'react-icons/bi'
// import {MdPlaylistAdd} from 'react-icons/md'
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
// import Cookies from 'js-cookie'
// import {Button} from './StyledComponents'
// import Header from '../Header'
// import './index.css'
// import LeftContentsSection from '../LeftContentsSection'
// import NextWatchContext from '../../context/NextWatchContext'
// import {Container} from '../../StyledComponent'

// const apiStatusConstants = {
//   success: 'success',
//   fail: 'fail',
//   load: 'load',
// }
// class VideoItemDetails extends Component {
//   state = {videoDetails: {}, videoDetailsApiStatus: 'initial'}

//   componentDidMount = () => {
//     this.getVideoDetails()
//   }

//   getVideoDetails = async () => {
//     this.setState({videoDetailsApiStatus: apiStatusConstants.load})
//     const {match} = this.props
//     const {params} = match
//     const {id} = params
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${Cookies.get('jwt_token')}`,
//       },
//     }
//     const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
//     const result = await response.json()
//     if (response.ok) {
//       const obj = result.video_details
//       const receivedList = {
//         channel: obj.channel,
//         description: obj.description,
//         id: obj.id,
//         title: obj.title,
//         videoUrl: obj.video_url,
//         publishedAt: obj.published_at,
//         thumbnailUrl: obj.thumbnail_url,
//         viewsCount: obj.view_count,
//       }
//       this.setState({
//         videoDetails: receivedList,
//         videoDetailsApiStatus: apiStatusConstants.success,
//       })
//     } else {
//       this.setState({videoDetailsApiStatus: apiStatusConstants.fail})
//     }
//   }

//   renderLoadingView = () => (
//     <div className=" d-flex align-items-center justify-content-center w-100 ">
//       <div className="loader-container mt-5" data-testid="loader">
//         <Loader type="ThreeDots" color="cyan" height="50" width="50" />
//       </div>
//     </div>
//   )

//   renderFailureView = () => (
//     <div className="d-flex justify-content-center align-items-center text-center w-100">
//       <div className="">
//         <img
//           src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
//           alt="failure view"
//           className="failureView"
//         />
//         <h1>Oops! Something Went Wrong</h1>
//         <p>
//           We are having some troubles to complete your request.Please try again.
//         </p>
//         <button
//           type="button"
//           className="btn btn-outline-primary"
//           onClick={() => this.getVideoDetails()}
//         >
//           Retry
//         </button>
//       </div>
//     </div>
//   )

//   renderVideo = () => {
//     const {videoDetails} = this.state
//     const {
//       videoUrl,
//       channel,
//       title,
//       publishedAt,
//       viewsCount,
//       description,
//     } = videoDetails
//     return (
//       <NextWatchContext.Consumer>
//         {value => {
//           const {
//             savedList,
//             updateSavedList,
//             likedList,
//             updateLikedList,
//             disLikedList,
//             updateDislikedList,
//           } = value
//           const onClickLikeButton = selectedVideo => {
//             updateLikedList(selectedVideo)
//           }

//           const onClickDislikeButton = selectedVideo => {
//             updateDislikedList(selectedVideo)
//           }

//           const onClickSaveButton = selectedVideo => {
//             updateSavedList(selectedVideo)
//           }
//           const isSaved =
//             savedList.filter(obj => obj.id === videoDetails.id).length === 1

//           const isLiked =
//             likedList.filter(obj => obj.id === videoDetails.id).length === 1

//           const isDisliked =
//             disLikedList.filter(obj => obj.id === videoDetails.id).length === 1

//           return (
//             <div className=" w-100 videoDetailsCon overflow-auto p-4 pt-0">
//               <div className="videoCon">
//                 <div className="responsive-container">
//                   <ReactPlayer
//                     url={videoUrl}
//                     controls
//                     width="100%"
//                     height="360px"
//                   />
//                 </div>
//               </div>
//               <p className="h6 pt-3">{title}</p>
//               <div className="d-flex justify-content-between">
//                 <div className="d-flex">
//                   <p>{`${viewsCount} views .`}</p>
//                   <p>
//                     {publishedAt !== undefined &&
//                       formatDistanceToNow(new Date(publishedAt))}
//                   </p>
//                 </div>
//                 <ul className="d-flex list-unstyled">
//                   <li>
//                     <Button
//                       type="button"
//                       className="d-flex mr-3 opinionButton"
//                       onClick={() => onClickLikeButton(videoDetails)}
//                       active={isLiked}
//                     >
//                       <BiLike className="mt-1 mr-2" />
//                       <p className="">Like</p>
//                     </Button>
//                   </li>
//                   <li>
//                     <Button
//                       type="button"
//                       className="d-flex mr-3 opinionButton"
//                       onClick={() => onClickDislikeButton(videoDetails)}
//                       active={isDisliked}
//                     >
//                       <BiDislike className="mt-1 mr-2" />
//                       <p className="">Dislike</p>
//                     </Button>
//                   </li>
//                   <li>
//                     <Button
//                       type="button"
//                       className="d-flex mr-3 opinionButton"
//                       onClick={() => onClickSaveButton(videoDetails)}
//                       active={isSaved}
//                     >
//                       <MdPlaylistAdd className="mr-2 mt-1" />
//                       <p className="">Save</p>
//                     </Button>
//                   </li>
//                 </ul>
//               </div>
//               <div className="m-0">
//                 <hr />
//               </div>
//               <div className="d-flex text-secondary">
//                 <div className="">
//                   <img
//                     src={channel !== undefined && channel.profile_image_url}
//                     alt=""
//                     className="channelLogo"
//                   />
//                 </div>
//                 <div className="pl-3">
//                   <p className="m-0 mb-1 h6 text-dark">
//                     {channel !== undefined && channel.name}
//                   </p>
//                   <p className="m-0 mb-1">
//                     {channel !== undefined &&
//                       `${channel.subscriber_count} Subscribers`}
//                   </p>
//                   <p className="m-0">{description}</p>
//                 </div>
//               </div>
//             </div>
//           )
//         }}
//       </NextWatchContext.Consumer>
//     )
//   }

//   decideWhatToSHow = () => {
//     const {videoDetailsApiStatus} = this.state

//     switch (videoDetailsApiStatus) {
//       case apiStatusConstants.success:
//         return this.renderVideo()
//       case apiStatusConstants.fail:
//         return this.renderFailureView()
//       case apiStatusConstants.load:
//         return this.renderLoadingView()
//       default:
//         return null
//     }
//   }

//   render() {
//     return (
//       <Container
//         className="vh-100 d-flex flex-column overflow-auto"
//         data-testid="videoItemDetails"
//         bgColor={isDarkMode ? '#0f0f0f ' : '#f9f9f9 '}
//       >
//         <Header />
//         <div className="d-flex HomeBottomSectionCon">
//           <LeftContentsSection />
//           {this.decideWhatToSHow()}
//         </div>
//       </Container>
//     )
//   }
// }

// export default VideoItemDetails

import {Component} from 'react'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {Button} from './StyledComponents'
import Header from '../Header'
import './index.css'
import LeftContentsSection from '../LeftContentsSection'
import NextWatchContext from '../../context/NextWatchContext'
import {Container} from '../../StyledComponent'

const apiStatusConstants = {
  success: 'success',
  fail: 'fail',
  load: 'load',
}
class VideoItemDetails extends Component {
  state = {videoDetails: {}, videoDetailsApiStatus: 'initial'}

  componentDidMount = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({videoDetailsApiStatus: apiStatusConstants.load})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, options)
    const result = await response.json()
    if (response.ok) {
      const obj = result.video_details
      const receivedList = {
        channel: obj.channel,
        description: obj.description,
        id: obj.id,
        title: obj.title,
        videoUrl: obj.video_url,
        publishedAt: obj.published_at,
        thumbnailUrl: obj.thumbnail_url,
        viewsCount: obj.view_count,
      }
      this.setState({
        videoDetails: receivedList,
        videoDetailsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({videoDetailsApiStatus: apiStatusConstants.fail})
    }
  }

  renderLoadingView = () => (
    <div className=" d-flex align-items-center justify-content-center w-100 ">
      <div className="loader-container mt-5" data-testid="loader">
        <Loader type="ThreeDots" color="cyan" height="50" width="50" />
      </div>
    </div>
  )

  renderFailureView = value => {
    const {isDarkMode} = value
    return (
      <div className="d-flex justify-content-center align-items-center text-center w-100">
        <div className="">
          <img
            src={
              isDarkMode
                ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            }
            alt="failure view"
            className="failureView"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => this.getVideoDetails()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  renderVideo = value => {
    const {videoDetails} = this.state
    const {
      videoUrl,
      channel,
      title,
      publishedAt,
      viewsCount,
      description,
    } = videoDetails

    const {
      savedList,
      updateSavedList,
      likedList,
      updateLikedList,
      disLikedList,
      updateDislikedList,
    } = value

    const onClickLikeButton = selectedVideo => {
      updateLikedList(selectedVideo)
    }

    const onClickDislikeButton = selectedVideo => {
      updateDislikedList(selectedVideo)
    }

    const onClickSaveButton = selectedVideo => {
      updateSavedList(selectedVideo)
    }
    const isSaved =
      savedList.filter(obj => obj.id === videoDetails.id).length === 1

    const isLiked =
      likedList.filter(obj => obj.id === videoDetails.id).length === 1

    const isDisliked =
      disLikedList.filter(obj => obj.id === videoDetails.id).length === 1

    return (
      <div className=" w-100 videoDetailsCon overflow-auto p-4 pt-0">
        <div className="videoCon">
          <div className="responsive-container">
            <ReactPlayer url={videoUrl} controls width="100%" height="360px" />
          </div>
        </div>
        <p className="h6 pt-3">{title}</p>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <p>{`${viewsCount} views .`}</p>
            <p>
              {publishedAt !== undefined &&
                formatDistanceToNow(new Date(publishedAt))}
            </p>
          </div>
          <ul className="d-flex list-unstyled">
            <li>
              <Button
                type="button"
                className="d-flex mr-3 opinionButton"
                onClick={() => onClickLikeButton(videoDetails)}
                active={isLiked}
              >
                <BiLike className="mt-1 mr-2" />
                Like
              </Button>
            </li>
            <li>
              <Button
                type="button"
                className="d-flex mr-3 opinionButton"
                onClick={() => onClickDislikeButton(videoDetails)}
                active={isDisliked}
              >
                <BiDislike className="mt-1 mr-2" />
                Dislike
              </Button>
            </li>
            <li>
              <Button
                type="button"
                className="d-flex mr-3 opinionButton"
                onClick={() => onClickSaveButton(videoDetails)}
                active={isSaved}
              >
                <MdPlaylistAdd className="mr-2 mt-1" />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </li>
          </ul>
        </div>
        <div className="m-0">
          <hr />
        </div>
        <div className="d-flex text-secondary">
          <div className="">
            <img
              src={channel !== undefined && channel.profile_image_url}
              alt="channel logo"
              className="channelLogo"
            />
          </div>
          <div className="pl-3">
            <p className="m-0 mb-1 h6 text-dark">
              {channel !== undefined && channel.name}
            </p>
            <p className="m-0 mb-1">
              {channel !== undefined &&
                `${channel.subscriber_count} Subscribers`}
            </p>
            <p className="m-0">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  decideWhatToSHow = value => {
    const {videoDetailsApiStatus} = this.state

    switch (videoDetailsApiStatus) {
      case apiStatusConstants.success:
        return this.renderVideo(value)
      case apiStatusConstants.fail:
        return this.renderFailureView(value)
      case apiStatusConstants.load:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <NextWatchContext.Consumer>
        {value => {
          const {isDarkMode} = value
          return (
            <Container
              className="vh-100 d-flex flex-column overflow-auto"
              data-testid="videoItemDetails"
              bgColor={isDarkMode ? '#0f0f0f ' : '#f9f9f9 '}
            >
              <Header />
              <div className="d-flex HomeBottomSectionCon">
                <LeftContentsSection />
                {this.decideWhatToSHow(value)}
              </div>
            </Container>
          )
        }}
      </NextWatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
