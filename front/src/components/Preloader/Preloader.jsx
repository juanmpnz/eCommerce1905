import React from "react"
import { connect } from "react-redux";
import style from "../Preloader/style.css"

class FullPageLoader extends React.Component{
    
    render(){
        const {loading} = this.props
        if(!loading) return null;        
        return ( 
          <div className={style.container}>
            <div className={style.preloader}></div>
          </div>)
    }
}
const mapsStateToProps = state => ({loading:state.categories.loading})
export default connect(mapsStateToProps)(FullPageLoader)