import React, { Component } from "react";
import authService from "./auth/service";
import Conversations from "./Conversations";
import Users from "./Users";
import {
  getClient,
  initialiseClient,
  isClientInitialised,
  resetClient
} from "./chat/service";

class App extends Component {
  constructor(props) {
    super(props);
    authService.loginCallback = this.loggedIn;
    authService.logoutCallback = this.loggedOut;
    const loggedIn = authService.isAuthenticated();
    if (loggedIn && isClientInitialised()) {
      const { chatClient, user } = getClient();
      this.state = { loggedIn, page: "conversations", chatClient, user };
    } else this.state = { loggedIn, page: "conversations" };
  }

  loggedIn = async ({ email, nickname }) => {
    const { chatClient, user } = await initialiseClient(email, nickname);
    this.setState({ loggedIn: true, chatClient, user });
  };

  loggedOut = () => {
    resetClient();
    this.setState({ loggedIn: false });
  };

  switchPage = page => this.setState({ page });

  render() {
    const showConversations =
      this.state.loggedIn && this.state.page === "conversations";
    const showUsers =
      this.state.loggedIn && this.state.page !== "conversations";

    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand text-light">Messenger</a>
          {this.state.loggedIn ? (
            <div>
              <button
                onClick={() => this.setState({ page: "conversations" })}
                type="button"
                className="btn btn-link text-light"
              >
                Conversations
              </button>
              <button
                onClick={() => this.setState({ page: "users" })}
                type="button"
                className="btn btn-link text-light"
              >
                Users
              </button>
              <button
                onClick={() => authService.logout()}
                className="btn btn-light"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => authService.login()}
              className="btn btn-light"
            >
              Log In
            </button>
          )}
        </nav>
        <div>
          {showConversations && (
            <Conversations
              chatClient={this.state.chatClient}
              userId={this.state.user.id}
            />
          )}
          {showUsers && (
            <Users
              chatClient={this.state.chatClient}
              user={this.state.user}
              switchPage={this.switchPage}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
