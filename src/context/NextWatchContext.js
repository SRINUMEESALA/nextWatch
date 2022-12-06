import React from 'react'

const NextWatchContext = React.createContext({
  activeRoute: '',
  updateActiveRoute: () => {},
  savedList: [],
  updateSavedList: () => {},
  likedList: [],
  updateLikedList: () => {},
  disLikedList: [],
  updateDislikedList: () => {},
  isDarkMode: false,
  updateIsDarkMode: () => {},
})

export default NextWatchContext
