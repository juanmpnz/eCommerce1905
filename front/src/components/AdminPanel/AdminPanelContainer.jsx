/* IMPORTS */
// Config
import React, {Component} from 'react';
import {connect} from 'react-redux'
// Components
import style from './style.css'
// Functions
import {loginUser} from '../../store/action-creators/users'


const mapStateToProps = state => ({
    users: state.users
})
  
const mapDispatchToProps = dispatch => ({
    loginUser: (data) => dispatch(loginUser(data)),
})

class LoginContainer extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
        }

        this.changesHandler = this.changesHandler.bind(this)
        this.loginSubmitHandler = this.loginSubmitHandler.bind(this)
    }

    changesHandler(e){
        this.setState({[e.target.name]: e.target.value})
    }

    loginSubmitHandler(e){
        e.preventDefault()
        const {email, password} = this.state
        this.props.loginUser({email, password})
        this.setState({email:'', password:''})
    }
    
    render(){
        const { email, password } = this.state
        const {me} = this.props.users
        return (
            <div className={style.container}>
                <h2>Welcome,</h2>
                {me.id && (me.access === 'admin' || me.access === 'super')
                ?   <>
                        <h3>{me.name} !</h3>
                        <p>{`Have a nice day :)`}</p>
                    </>
                :   <form className={style.login} onSubmit={this.loginSubmitHandler}>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={this.changesHandler}/>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={this.changesHandler}/>
                        <button className={style.icon} onClick={this.loginSubmitHandler}>Login</button>
                    </form>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);