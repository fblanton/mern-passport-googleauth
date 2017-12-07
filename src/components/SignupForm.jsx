import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    redirectTo: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // TODO - validate your input!

    const {
      username,
      password
    } = this.state

    axios
    .post('/auth/signup', { username, password })
    .then(response => {
      console.log(response)
      if (!response.data.error) {
        console.log('youre good')
        this.setState({
          redirectTo: '/login'
        })
      } else {
        console.log(response.data.error)
      }
    })
  }

  render() {
    const {
      username,
      password,
      confirmPassword,
      redirectTo
    } = this.state

    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo }} />
    }

    return (
      <div className="SignupForm">
        <h1>Signup form</h1>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Sign up</button>
      </div>
    )
  }
}

export default SignupForm
