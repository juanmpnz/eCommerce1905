/* IMPORTS */
// Config
import React from 'react'
import { connect } from 'react-redux'
// Components
import globalStyle from '../../styles/style.css'
import style from './style.css'
import AdminUserContainer from './AdminUserContainer'
import AdminUserForm from './AdminUserForm'
import Empty from './Empty'
// Functions
import {fetchUsers, registerUser, addUserToMyList} from '../../store/action-creators/users'
import Unautorized from '../AdminPanel/Unautorized'

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = dispatch =>  ({
    fetchUsers: () => dispatch(fetchUsers()),
    addUserToMyList: (user) => dispatch(addUserToMyList(user)),
});

class AdminUsersContainer extends React.Component {
    constructor(){
      super()

      this.state = {
        name: '',
        email: '',
        phone: '',
        adress: '',
        password: '',
        access: 'basic',
      }
      this.changesHandler = this.changesHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
    }
    changesHandler(e) {
        this.setState({[e.target.name]: e.target.value });
    }
    submitHandler(e) {
        e.preventDefault();
        registerUser(this.state)
            .then(res => this.props.addUserToMyList(res.data))
        this.setState({
            name: '',
            email: '',
            phone: '',
            adress: '',
            password: '',
            access: 'basic',
        })
    }

    componentDidMount(){
      this.props.fetchUsers()
    }
  
    render() {
        const {users} = this.props
        const {name, email, phone, adress, password, access} = this.state
          return (
            <div className={style.container}>
              {users.me.id && users.me.access === 'super'
                ? <>
                    <div className={style.header}>
                      <h2 className={style.title}>Users</h2>
                    </div>
                    <div className={style.users}>
                    <AdminUserForm
                          name={name}
                          email={email}
                          phone={phone}
                          adress={adress}
                          password={password}
                          access={access}
                          changesHandler={this.changesHandler}
                          submitHandler={this.submitHandler}
                    />
                        {users.list && users.list[0]
                        ? users.list.map((user, index) =>
                          <AdminUserContainer
                                  key={user.id}
                                  user={user}
                                  index={index}
                          />)
                        : <Empty/>
                        }
                    </div>
                  </>
                  : <Unautorized/>}
            </div>
          )
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersContainer);