import React from "react";
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import globalStyle from "../../styles/style.css";
import Style from "../Contactus/style.css";

const changesHandler =(e)=>{
 console.log(e.target)
}


export default () => (
  <div>
    <h1 className={globalStyle.h1}>CONTACTO</h1>
    <div className={Style.container}>
      <div className={Style.cardOne}>
          <form>
          <TextField
          id="standard-full-width"
          name="name"
          label="NOMBRE"
          style={{ margin: 8 }}
          placeholder="Ingresa tu nombre"
           onChange={changesHandler}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
                <TextField
          id="standard-full-width"
          label="E-MAIL"
          style={{ margin: 8 }}
          placeholder="Ingresa tu e-mail"
       
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <TextField
          id="standard-full-width"
          label="MENSAJE"
          style={{ margin: 8 }}
          multiline
          fullWidth
          rows={4}
          defaultValue=""
        />
        <br/>
        <br/>
        <Button variant="contained">Enviar</Button>
          </form>
      </div>
      <div className={Style.cardTwo}>
          <div className={Style.items}>
          <span className={Style.dato}><HomeIcon ></HomeIcon></span> <p className={Style.parrafo}>Brandsen 805</p>
          </div>
          <div className={Style.items}> 
             <span className={Style.dato}><EmailIcon ></EmailIcon> </span> <p className={Style.parrafo}>site1905@gmail.com</p>
          </div>
          <div className={Style.items}>
          <span className={Style.dato}> <PhoneIcon ></PhoneIcon> </span> <p className={Style.parrafo}>011 4878 454</p>
          </div>
      </div>
      
    </div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.7558013685593!2d-58.36694498529643!3d-34.635610880451196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334b6925e5473%3A0x1ca5b2748858b40d!2sEstadio%20Alberto%20J.%20Armando!5e0!3m2!1ses!2sar!4v1605036784669!5m2!1ses!2sar" width="100%" height="450" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
    <br/>
    <br/>
  </div>
);




/* (e.target.name !== 'name' & e.target.name !== 'description' && e.target.value < 0)
|| (e.target.name === 'off' && e.target.value > 100)
?   console.warn('Uncompleted input')    
:   this.setState({
    [e.target.name]: e.target.value,
    updated: true}) */