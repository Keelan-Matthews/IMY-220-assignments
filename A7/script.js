class UsernamePasswordInput extends React.Component {
    checkUsername = () => {
        let username = document.getElementsByName("username")[0].value;
        if (username.length < 2 || !username.match(/^[a-zA-Z0-9]+$/) || !username.match(/^[A-Z]/))
            this.props.validateUsername(false);
        else
            this.props.validateUsername(true);
    }

    checkPass = () => {
        let password = document.getElementsByName("password")[0].value;
        if (password.length < 8 || !password.match(/\d/) || !password.match(/[A-Z]/)) 
            this.props.validatePass(false);
        else
            this.props.validatePass(true);
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
    enableButton(flag) {
        document.getElementsByTagName("button")[0].disabled = !flag;
    }

    render() {
        return (
            <div class="input-group">
                <UsernamePasswordInput validateUsername={this.enableButton} validatePass={this.enableButton} />
                <button type="button" class="btn btn-primary" disabled onClick={this.props.loginFn}>Submit</button>
            </div>
        );
    }
}

class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <h1>Hi, welcome back {this.props.username}</h1>
                <button type="button" class="btn btn-primary">Log out</button>
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

    render() {
        return (
            <div>
                {
                    this.state.loggedIn ?
                    <ProfilePage username={this.state.username} /> :
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