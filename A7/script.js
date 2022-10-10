class UsernamePasswordInput extends React.Component {
    checkUsername = () => {
        let username = document.getElementsByName("username")[0].value;
        if (username.length < 2 || !username.match(/^[a-zA-Z0-9]+$/) || !username.match(/^[A-Z]/)) {
            this.props.validateUsername(false);
            document.getElementsByName("username")[0].style.color = "red";
        }
        else {
            this.props.validateUsername(true);
            document.getElementsByName("username")[0].style.color = "green";
        }
    }

    checkPass = () => {
        let password = document.getElementsByName("password")[0].value;
        if (password.length < 8 || !password.match(/\d/) || !password.match(/[A-Z]/)) {
            this.props.validatePass(false);
            document.getElementsByName("password")[0].style.color = "red";
        }
        else {
            this.props.validatePass(true);
            document.getElementsByName("password")[0].style.color = "green";
        }
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    class="form-control form-control-lg"
                    onChange={this.checkUsername}
                />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    class="form-control form-control-lg"
                    onChange={this.checkPass}
                />
            </div>
        );
    }
}

class LoginForm extends React.Component {
    constructor() {
        super();

        this.state = {
            disabled: true,
            validUsername: false,
            validPass: false
        };
    }

    enableUsername = (flag) => {
        this.setState({validUsername: flag});
        let isDisabled = !(this.state.validPass && flag);
        this.setState({disabled: isDisabled});
    }

    enablePass = (flag) => {
        this.setState({validPass: flag});
        let isDisabled = !(this.state.validUsername && flag);
        this.setState({disabled: isDisabled});
    }

    render() {
        return (
            <div class="input-group">
                <UsernamePasswordInput validateUsername={this.enableUsername} validatePass={this.enablePass} />
                <button type="button" class="btn btn-primary" onClick={this.props.loginFn} disabled={this.state.disabled}>Submit</button>
            </div>
        );
    }
}

class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Hi, welcome back {this.props.username}</h1>
                <button type="button" class="btn btn-primary" onClick={this.props.logoutFn}>Log out</button>
            </div>
        );
    }
}

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loggedIn: false
        };
    }

    login = () => {
        this.setState({
            username: document.getElementsByName("username")[0].value,
            loggedIn: true
        });
    }

    logout = () => {
        this.setState({
            loggedIn: false,
            username: ""
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.loggedIn ?
                        <ProfilePage username={this.state.username} logoutFn={this.logout} /> :
                        <LoginForm loginFn={this.login} />
                }
            </div>
        );
    }
}

ReactDOM.render(
    <Container />,
    document.getElementById('form')
);