import { Auth } from "aws-amplify";
import React, { Component, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import { Routes } from "./Routes";

const bookstoreIcon = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMzNS4wOCAzMzUuMDc5IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMzUuMDggMzM1LjA3OTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zMTEuMTc1LDExNS43NzVjLTEuMzU1LTEwLjE4Ni0xLjU0Ni0yNy43Myw3LjkxNS0zMy42MjFjMC4xNjktMC4xMDgsMC4yOTUtMC4yNjQsMC40NDMtMC4zOTggICAgYzcuNzM1LTIuNDc0LDEzLjA4OC01Ljk0Niw4Ljg4Ni0xMC42MThsLTExNC4xMDItMzQuMzhMMjkuNTYsNjIuNDQ1YzAsMC0yMS4xNTcsMy4wMjQtMTkuMjY3LDM1Ljg5NCAgICBjMS4wMjYsMTcuODksNi42MzcsMjYuNjc2LDExLjU0NCwzMWwtMTUuMTYxLDQuNTY5Yy00LjIwOCw0LjY3MiwxLjE0NCw4LjE0NSw4Ljg4LDEwLjYxNWMwLjE0NywwLjEzOCwwLjI3MSwwLjI5MywwLjQ0MywwLjQwMSAgICBjOS40NTUsNS44OTYsOS4yNzMsMjMuNDM4LDcuOTEzLDMzLjYyNmMtMzMuOTY3LDkuNjQ1LTIxLjc3NCwxMi43ODgtMjEuNzc0LDEyLjc4OGw3LjQ1MSwxLjgwMyAgICBjLTUuMjQxLDQuNzM2LTEwLjQ0NiwxMy43MTctOS40NzEsMzAuNzVjMS44OTEsMzIuODY0LDE5LjI2OSwzNS4xMzIsMTkuMjY5LDM1LjEzMmwxMjAuOTA0LDM5LjI5OGwxODIuNDktNDQuMjAyICAgIGMwLDAsMTIuMTk3LTMuMTQ4LTIxLjc3OS0xMi43OTRjLTEuMzY2LTEwLjE3Mi0xLjU1Ni0yNy43MTIsNy45MjEtMzMuNjIzYzAuMTc0LTAuMTA1LDAuMzAxLTAuMjY0LDAuNDQyLTAuMzk2ICAgIGM3LjczNi0yLjQ3NCwxMy4wODQtNS45NDMsOC44ODEtMTAuNjE1bC03LjkzMi0yLjM5NWM1LjI5LTMuMTksMTMuMjM2LTExLjUyNywxNC40ODEtMzMuMTgzICAgIGMwLjg1OS0xNC44OTYtMy4wMjctMjMuNjItNy41MjUtMjguNzU2bDE1LjY3OC0zLjc5NEMzMzIuOTQ5LDEyOC41NjksMzQ1LjE0NiwxMjUuNDIxLDMxMS4xNzUsMTE1Ljc3NXogTTE1OC41MzMsMTE1LjM1NCAgICBsMzAuNjg4LTYuMzA3bDEwMy43MDgtMjEuMzEybDE1LjQ1MS0zLjE3OGMtNC45MzcsOS4wMzYtNC43MywyMS40MDItMy45MTMsMjkuMzVjMC4xNzksMS43OTgsMC4zODUsMy40NCwwLjU4NSw0LjY4OCAgICBMMjg4LjE0LDEyMi44bC0xMzAuODk3LDMyLjU2M0wxNTguNTMzLDExNS4zNTR6IE0yNi43MSwxNDcuMzM3bDE1LjQ0OSwzLjE3OGw5OS41OTcsMjAuNDc0bDguNzAxLDEuNzgybDAsMGwwLDBsMjYuMDkzLDUuMzYzICAgIGwxLjI4Nyw0MC4wMUw0My4zMDMsMTg0LjY3M2wtMTMuMjYzLTMuMjk2YzAuMTk1LTEuMjUsMC40MDEtMi44OSwwLjU4OC00LjY5M0MzMS40NCwxNjguNzQyLDMxLjY1MSwxNTYuMzczLDI2LjcxLDE0Ny4zMzd6ICAgICBNMjAuNzA4LDk2Ljc1N2MtMC4xODctOC43NDMsMS4zNzEtMTUuMDY2LDQuNTItMTguMjhjMi4wMDQtMi4wNTIsNC4zNjktMi40NzksNS45OTEtMi40NzljMC44NTcsMCwxLjQ3NCwwLjExOSwxLjUxNiwwLjExOSAgICBsNzkuNjA3LDI1Ljk1M2wzOS43MTcsMTIuOTQ5bC0xLjMwMyw0MC4yODlMMzkuMzM0LDEyNC4wN2wtNS44OC0xLjY0N2MtMC4yMTYtMC4wNjEtMC41MDktMC4xMDMtMC43MzUtMC4xMTMgICAgQzMyLjI2LDEyMi4yNzcsMjEuMjQ0LDEyMS4yNjMsMjAuNzA4LDk2Ljc1N3ogTTE0MC41NzksMjgwLjg2NkwyMy4yOCwyNDcuOThjLTAuMjE3LTAuMDYzLTAuNTA3LTAuMTA1LTAuNzMzLTAuMTE2ICAgIGMtMC40NjctMC4wMzEtMTEuNDg4LTEuMDQ0LTEyLjAyMS0yNS41NDRjLTAuMTktOC43NTQsMS4zNzYtMTUuMDcxLDQuNTE5LTE4LjI4OGMyLjAwOS0yLjA1Miw0LjM3NS0yLjQ3OSw1Ljk5NC0yLjQ3OSAgICBjMC44NTksMCwxLjQ3NCwwLjExNSwxLjUxOSwwLjExNWMwLDAsMC4wMDUsMCwwLDBsMTE5LjMxNiwzOC45MDhMMTQwLjU3OSwyODAuODY2eiBNMjk0LjI4NCwyMzkuNDU5ICAgIGMwLjE4NSwxLjgwNCwwLjM5MSwzLjQ0MywwLjU5MSw0LjY5M2wtMTQ3LjgxMiwzNi43NzFsMS4yOTItNDAuMDFsMzEuNjAxLTYuNDk3bDQuNjY3LDEuMTI5bDE3LjQ5Mi01LjY4NWw4MC42MzEtMTYuNTY5ICAgIGwxNS40NTctMy4xOEMyOTMuMjYxLDIxOS4xNDYsMjkzLjQ2NiwyMzEuNTE3LDI5NC4yODQsMjM5LjQ1OXogTTMwMi40MjYsMTg1LjA4NGMtMC4yNjksMC4wMDYtMC41MzgsMC4wNDItMC43OTEsMC4xMjIgICAgbC0xMS4xNDgsMy4xMjFsLTEwNi4xNDgsMjkuNzY0bC0xLjI5OC00MC4yODlsMzQuODI2LTExLjM1OWw4NC4zMjctMjcuNTAxYzAuMDExLTAuMDA1LDQuNDM2LTAuOTg4LDcuNjg0LDIuMzE1ICAgIGMzLjE0NCwzLjIxNCw0LjcwNCw5LjUzNyw0LjUyLDE4LjI4QzMxMy44NDgsMTg0LjAzNSwzMDIuODI3LDE4NS4wNTMsMzAyLjQyNiwxODUuMDg0eiIgZmlsbD0iI2Y2OTgyNyIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=";
// const bookstoreIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMjI1LjAwMDAwMHB0IiBoZWlnaHQ9IjIyNS4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDIyNS4wMDAwMDAgMjI1LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMjI1LjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTAgMTEyNSBsMCAtMTEyNSAxMTI1IDAgMTEyNSAwIDAgMTEyNSAwIDExMjUgLTExMjUgMCAtMTEyNSAwIDAKLTExMjV6IG0xMDUwIDUzNSBsMCAtNTAgLTM2IDAgYy0yMCAwIC0zNCAtNCAtMzIgLTggMiAtNCAxMiAtMjkgMjMgLTU1IGwyMAotNDcgMTI2IDAgMTI2IDAgMTkgNDcgYzExIDI3IDIxIDUxIDIyIDU1IDIgNSAtMTIgOCAtMzIgOCBsLTM2IDAgMCA1MCAwIDUwCjE0MCAwIDE0MCAwIDAgLTUwIDAgLTUwIC00NCAwIGMtNDIgMCAtNDQgLTEgLTYyIC00NyAtMTEgLTI3IC0yMCAtNTEgLTIyIC01NAotMiAtNCAxOSAtMTAgNDUgLTE0IDU2IC04IDE2MCAtNjAgMTc0IC04NyA2IC0xMCA5IC00MiA3IC03MSBsLTMgLTUyIC00NyAtMwotNDggLTMgMCA0MCBjMCAzNSAtNCA0MyAtMzIgNTcgLTE3IDkgLTU3IDE4IC04OCAyMSBsLTU2IDUgLTcyIC0xNjUgYy02OAotMTU4IC03MiAtMTcwIC03MiAtMjQyIGwwIC03NSAxMTkgMCBjNjUgMCAxMzIgNSAxNTAgMTEgbDMxIDExIDAgODQgMCA4NCAtNTYKMCAtNTUgMCAzIDQ4IDMgNDcgMTEwIDAgMTEwIDAgMyAtMTQ0IGMzIC0xNjcgMyAtMTY3IC05MyAtMjEyIC01NyAtMjcgLTY3Ci0yOSAtMTkyIC0yOSBsLTEzMyAwIDAgLTU1IDAgLTU1IDQwIDAgNDAgMCAwIC01MCAwIC01MCAtMTQwIDAgLTE0MCAwIDAgNTAgMAo1MCA0MCAwIDQwIDAgMCA1NSAwIDU1IC0xMDMgMCBjLTY4IDAgLTExOSA1IC0xNTAgMTYgLTYwIDIwIC0xNDEgOTMgLTE3NSAxNTgKLTI1IDQ2IC0yNyA2MSAtMjcgMTYxIDAgMTI1IDE1IDE3MiA3OSAyNDMgMzcgNDAgMTMwIDkyIDE2NiA5MiAyNSAwIDI1IDYgLTEKNjkgLTIxIDUwIC0yMiA1MSAtNjUgNTEgbC00NCAwIDAgNDMgYzAgMjQgMyA0NyA3IDUwIDMgNCA2NiA3IDE0MCA3IGwxMzMgMCAwCi01MHogbS00NDAgLTE0MTUgYzAgLTkgLTYgLTEyIC0xNyAtOSAtMTIgNCAtOSAtMSA3IC0xNSAyMCAtMTYgMjMgLTIzIDE0IC0zOAotMTMgLTIxIC00NSAtMjQgLTUyIC00IC0zIDEwIDAgMTIgMTIgOCA5IC00IDE2IC0yIDE2IDIgMCA1IC03IDExIC0xNSAxNSAtMTUKNSAtMjEgMzcgLTggNDkgMTIgMTMgNDMgNyA0MyAtOHogbTQ3IDIgYy0zIC04IC0xIC0yMCA0IC0yOCA2IC0xMCA5IC03IDkgMTQKMCAxOCA1IDI3IDE2IDI3IDE2IDAgMTUgLTkgLTcgLTY3IC0xMiAtMzIgLTM1IC0yOSAtNDIgNSAtMyAxNSAtOSAzNSAtMTIgNDUKLTYgMTMgLTIgMTcgMTUgMTcgMTQgMCAyMCAtNSAxNyAtMTN6IG0xMDUgLTIgYy0yIC01IC05IC05IC0xNSAtNyAtNSAyIC0xMwotMiAtMTcgLTkgLTEwIC0xNCAwIC01MCAxMSAtNDQgNCAzIDUgMTMgMiAyMiAtNCAxMSAtMiAxNCA4IDExIDggLTIgMTUgLTE0CjE3IC0yNSA0IC0yNCAtMzQgLTM5IC01NSAtMjEgLTE2IDEzIC0xNyA2MCAtMSA3NiAxNSAxNSA1NSAxMiA1MCAtM3ogbTM2NyAtOQpjMiAtMTEgLTQgLTI1IC0xMyAtMzIgLTkgLTYgLTE1IC0xOCAtMTQgLTI1IDIgLTggLTUgLTE0IC0xNiAtMTQgLTE1IDAgLTE5IDgKLTIwIDQ4IC0xIDQ3IC0xIDQ4IDI5IDQ1IDIwIC0yIDMxIC05IDM0IC0yMnogbTg2IC0xMCBjOCAtMjQgNiAtMzEgLTE0IC00NwotNDEgLTM0IC01NiAtMjUgLTU2IDMxIDAgNTAgMCA1MSAzMCA0OCAyMiAtMiAzMiAtMTAgNDAgLTMyeiBtNzUgMjcgYy0xIC0yNQotMTQgLTUzIC0yNSAtNTMgLTggMCAtMTEgLTggLTggLTIxIDUgLTE2IDIgLTIwIC0xMiAtMTggLTEzIDMgLTE4IDE1IC0xOSA1MgotMiA0NyAtMiA0NyAzMSA0NyAxOCAwIDMzIC0zIDMzIC03eiBtMzQxIC0zMyBjNyAtMjIgMTYgLTQwIDIyIC00MCA1IDAgNyAxOAo1IDQwIC0zIDMxIDAgNDAgMTIgNDAgMTEgMCAxNSAtMTIgMTUgLTQ5IGwwIC01MCAtMzUgMyBjLTIwIDIgLTM0IDggLTMyIDE0IDEKNyAtNSAxMiAtMTMgMTIgLTkgMCAtMTIgLTYgLTkgLTE1IDQgLTExIDIgLTEzIC05IC05IC0xNCA1IC0xNCAxMCAwIDUwIDggMjQKMTkgNDQgMjQgNDQgNCAwIDE0IC0xOCAyMCAtNDB6Ii8+CjxwYXRoIGQ9Ik04ODkgMTM4NiBjLTk2IC0zNCAtMTQ5IC0xMTMgLTE0OSAtMjIxIDAgLTgwIDEzIC0xMjIgNTIgLTE2OSA0NwotNTggOTUgLTc2IDIwNiAtNzYgbDkyIDAgMCA3NiBjMCA3MCAtNCA4NSAtNTkgMjEyIC05NCAyMjAgLTc5IDIwMSAtMTQyIDE3OHoiLz4KPHBhdGggZD0iTTEwODMgMTM2OCBjNDUgLTEwNiA2MCAtMTM4IDY3IC0xMzggNiAwIDQ2IDgzIDc3IDE1OCA0IDkgLTE1IDEyCi03NiAxMiBsLTgxIDAgMTMgLTMyeiIvPgo8cGF0aCBkPSJNMTE3MCAyMTAgYzAgLTE2IDUgLTMwIDEwIC0zMCA2IDAgMTAgMTQgMTAgMzAgMCAxNyAtNCAzMCAtMTAgMzAgLTUKMCAtMTAgLTEzIC0xMCAtMzB6Ii8+CjxwYXRoIGQ9Ik0xMjU1IDIzMCBjMyAtNSA4IC0xMCAxMSAtMTAgMiAwIDQgNSA0IDEwIDAgNiAtNSAxMCAtMTEgMTAgLTUgMCAtNwotNCAtNCAtMTB6Ii8+CjwvZz4KPC9zdmc+Cg==";

interface AppProps {
  history: any;
}

interface AppState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };

    document.title = "Store Demo"
  }
  
  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = (authenticated: boolean) => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async () => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  showLoggedInBar = () => (
    <Fragment>
      <LinkContainer to="/past">
        <NavItem><span className="orange line-height-24">Past orders</span></NavItem>
      </LinkContainer>
      <LinkContainer to="/best">
        <NavItem><span className="orange line-height-24">Best sellers</span></NavItem>
      </LinkContainer>
      <NavItem onClick={this.handleLogout}><span className="orange line-height-24">Log out</span></NavItem>
      <LinkContainer to="/cart">
        <NavItem>
          <div className="shopping-icon-container">
            <span className="glyphicon glyphicon-shopping-cart white" aria-hidden="true"></span>
          </div>
        </NavItem>
      </LinkContainer>
    </Fragment>
  );

  showLoggedOutBar = () => (
    <Fragment>
      <LinkContainer to="/signup">
        <NavItem><span className="orange">Sign up</span></NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem><span className="orange">Log in</span></NavItem>
      </LinkContainer>
    </Fragment>
  );

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                <span className="orange"> <img src={bookstoreIcon} alt="store" /> STORE</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated ? this.showLoggedInBar() : this.showLoggedOutBar()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes isAuthenticated={childProps.isAuthenticated} userHasAuthenticated={childProps.userHasAuthenticated} />
      </div>
    );
  }
}

export default withRouter(App as any);