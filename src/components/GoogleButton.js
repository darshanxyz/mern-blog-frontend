import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const responseGoogle = (response) => {
  console.log(response);
}

class GoogleButton extends Component {
  constructor(props) {
    super();

    this.state = {
      isLoggedIn: false,
      accessToken: '',
      firstName: ''
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(response) {
    console.log(response);
    if (response.accessToken) {
      this.setState(state => ({
        isLoggedIn: true,
        accessToken: response.accessToken,
        firstName: response.profileObj.givenName
      }));
    }
  }

  logout(response) {
    this.setState(state => ({
      isLoggedIn: false,
      accessToken: '',
      firstName: ''
    }));
  }

  render() {
    return (
      <div className="google-btn">
        {
          this.state.isLoggedIn ?
            <div>
              <GoogleLogout
                clientId={CLIENT_ID}
                render={renderProps => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Hi, {this.state.firstName}, sign out?</button>
                )}
                buttonText='Sign out'
                onLogoutSuccess={this.logout}
                onFailure={responseGoogle}
              />
            </div>
            : <GoogleLogin
              clientId={CLIENT_ID}
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in</button>
              )}
              buttonText="Sign In"
              onSuccess={this.login}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
        }
      </div>
    );
  }
}

export default GoogleButton;
