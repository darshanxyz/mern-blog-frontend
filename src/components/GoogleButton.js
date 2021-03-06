import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const responseGoogle = (response) => {
  console.log(response);
}

class GoogleButton extends Component {
  constructor(props) {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    props.getUser.bind(this);
  }

  login(response) {
    if (response.accessToken) {
      const user = {
        isLoggedIn: true,
        accessToken: response.accessToken,
        firstName: response.profileObj.givenName,
        email: response.profileObj.email
      };
      this.props.getUser(user);
    }
  }

  logout(response) {
    this.setState(state => ({
      isLoggedIn: false,
      accessToken: '',
      firstName: '',
      email: ''
    }));
    window.location = '/';
  }

  render() {
    return (
      <div className="google-btn">
        {
          this.props.user.isLoggedIn ?
            <div>
              <GoogleLogout
                clientId={CLIENT_ID}
                render={renderProps => (
                  <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign out</button>
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
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
        }
      </div>
    );
  }
}

export default GoogleButton;
