/* IMPORTS */
// Config
import React from 'react'
import { connect } from 'react-redux'
// Components
import AdminUser from './AdminUser'
import {updateUser, deleteUser} from '../../store/action-creators/users'
  
const mapDispatchToProps = dispatch =>  ({
    updateUser: (index, id, user) => dispatch(updateUser(index, id, user)),
    deleteUser: (id) => dispatch(deleteUser(id)),
});

class AdminUserContainer extends React.Component {
    constructor(){
      super()

      this.state = {
        name: '',
        email: '',
        phone: '',
        adress: '',
        password: '',
        access: 'basic',
        updated: false,
      }
      this.changesHandler = this.changesHandler.bind(this)
      this.updateHandler = this.updateHandler.bind(this)
      this.deleteHandler = this.deleteHandler.bind(this)
    }
    
    changesHandler(e) {
        this.setState({[e.target.name]: e.target.value , updated: true});
    }
    
    updateHandler(e){
        e.preventDefault()
        const {user, index} = this.props
        const {name, email, phone, adress,access} = this.state
        this.props.updateUser(index, user.id, {...this.props.user, name, email, phone, adress, access})
        this.setState({updated: false})
    }

    deleteHandler(id){this.props.deleteUser(id)}

    componentDidMount(){
        const {name, email, phone, adress, password,access} = this.props.user
        this.setState({name, email, phone, adress, password, access})
    }
  
    render() {
        const {name, email, phone, adress, password,access} = this.state
        return <AdminUser
                    name={name}
                    email={email}
                    phone={phone}
                    adress={adress}
                    password={password}
                    access={access}
                    updated={this.state.updated}
                    changesHandler={this.changesHandler}
                    updateHandler={this.updateHandler}
                    deleteHandler={this.deleteHandler}
                    userId={this.props.user.id}
                    index={this.props.index}
                />          
      }
  }

export default connect(null, mapDispatchToProps)(AdminUserContainer);