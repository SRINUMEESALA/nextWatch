import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: 'raja',
    password: 'raja@2021',
    errorMsg: '',
    isLoginSuccess: false,
  }

  submitForm = event => {
    event.preventDefault()
    this.checkUserIdentity()
  }

  checkUserIdentity = async () => {
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const body = await response.json()
    if (!response.ok) {
      this.setState({isLoginSuccess: false, errorMsg: `*${body.error_msg}`})
    } else {
      //   this.setState({isLoginSuccess: true})
      const token = body.jwt_token
      Cookies.set('jwt_token', token, 1)
      const {history} = this.props
      history.replace('/')
      this.setState({isLoginSuccess: true})
    }
  }

  loginFormFilling = event => {
    const currentDetails = this.state
    this.setState({...currentDetails, [event.target.name]: event.target.value})
  }

  onCheckBoxChange = () => {
    this.setState(prevObj => ({showPassword: !prevObj.showPassword}))
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    const {
      username,
      password,
      showPassword,
      isLoginSuccess,
      errorMsg,
    } = this.state
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow p-3 pl-4 pr-4">
          <div className="mb-3">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="websiteLogo mx-auto d-block"
            />
          </div>
          <form className=" d-flex flex-column" onSubmit={this.submitForm}>
            <div className="form-group">
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                onChange={this.loginFormFilling}
                value={username}
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">PASSWORD</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={this.loginFormFilling}
                value={password}
                placeholder="Password"
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                checked={showPassword}
                onChange={this.onCheckBoxChange}
              />

              <label className="form-check-label" htmlFor="exampleCheck1">
                Show Password
              </label>
            </div>
            <button type="submit" className="btn btn-primary buttonLogin">
              Login
            </button>
          </form>
          <p className="text-danger small">{!isLoginSuccess && errorMsg}</p>
        </div>
      </div>
    )
  }
}

export default Login
