/* IMPORTS */
// Config
import React from 'react'
// import {Link} from 'react-router-dom'
// Components
import style from './style.css'
import styles from "./singleProductStyle.js";
import Button from "@material-ui/core/Button";
import ReactStars from "react-rating-stars-component";
// import SingleLineGridList from './SingleLineGridList'
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
// import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
// Functions
import {getRate} from '../../../utils'

export default ({
    selectedProduct,
    itsComments,
    me,
    units,
    comment,
    imageChangeHandler,
    changesHandler,
    submitOrderHandler,
    submitMessageHandler,
    updateProductHandler,
    deleteHandler,
    deleteComment,
    createRating,
    contador,
    imagenPrincipal,
}) => {

    const ratingStar = {
        size: 25,
        count: 5,
        isHalf: false,
        value: selectedProduct.rates ? getRate(selectedProduct.rates) : 0,
        color: "#012574",
        activeColor: "#F9C312",
        onChange: (newValue) => {
          createRating(selectedProduct.id, newValue)
        },
    }

    return (
        selectedProduct.id
        ?   <div className={style.container}>
                {/* PATH */}
                <div className={style.path}>Home / Productos / <span className={style.strong}>{selectedProduct.name}</span></div>

                {/* PRODUCT CONTAINER  */}
                <div style={styles.everyFather}>
                    <div style={styles.fatherAllSingleProduct}>
                        <div style={styles.FatherLittleImg}>
                        {selectedProduct.images &&
                            selectedProduct.images.map((img) => {
                            return (
                                <img
                                value={`${img.url}`}
                                style={styles.littleImg}
                                src={`${img.url}`}
                                onClick={imageChangeHandler}
                                />
                            );
                            })}
                        </div>
                        <div>

                        {/* IMAGEN PRINCIPAL */}
                        {selectedProduct.images && selectedProduct.images[0] && !contador ? (
                            <img style={styles.imgPrincipal} src={selectedProduct.images[0].url} />
                        ) : (
                            <img style={styles.imgPrincipal} src={imagenPrincipal} />
                        )}
                        </div>
                        <div style={styles.descriptionFather}>

                        {/* DESCRIPCION DEL PRODUCTO */}
                        <h1 className={styles.hola}>{selectedProduct.name}</h1>
                        <h1 style={styles.price}>{selectedProduct.stock ? `$ ${selectedProduct.price}` : 'SIN STOCK'}</h1>
                        {me.id 
                        ?   <>
                                <p style={styles.valoracion}>Valora nuestro producto:</p>
                                <ReactStars {...ratingStar}/>
                            </>
                        : null
                        }
                        <span style={styles.valoracion}>
                            Valoracion general : {getRate(selectedProduct.rates)}
                        </span>
                        {selectedProduct.off ? (
                            <h2 style={styles.oferta}>
                            ¡OFERTA {selectedProduct.off}% EN ESTE PRODUCTO!
                            </h2>
                        ) : null}

                        <p style={styles.littleDescription}>{selectedProduct.description}</p>
                        <div>
                            <p style={styles.textCantidad}>Cantidad</p>
                            <input type="number" name='units' value={units} onChange={changesHandler} style={styles.inputCantidad}/>
                            {" "}
                            <br />
                            {me.id
                            ? <Button variant="contained" color="default" style={styles.buttonColor} onClick={submitOrderHandler}> Agregar al Carrito</Button>
                            : null}
                            {me.access === "admin" || me.access === "super"
                            ? (<>
                                <Button variant="contained" color="default" style={styles.buttonColorEdit} onClick={() => updateProductHandler(selectedProduct.id)}>Editar Producto</Button>
                                <Button variant="contained" color="default" style={styles.buttonColorDelete} onClick={() => deleteHandler(selectedProduct.id)}>Eliminar</Button>
                              </>) 
                            : null}
                        </div>
                        </div>
                    </div>
                </div>

                {/* <div className={style.productContainer}>
                    <div className={style.images}>
                        <SingleLineGridList images={selectedProduct.images}/>
                    </div>
                    <div className={style.main}>
                        <div className={style.mainInfo}>
                            <h2>{selectedProduct.name}</h2>
                            <p>{selectedProduct.description}</p>
                            <h4>${selectedProduct.price}</h4>
                            <h4>Rate: {getRate(selectedProduct.rates)}</h4>
                        </div>
                        <form className={style.form} onSubmit={submitOrderHandler}>
                            <input type="number" name='units' value={units} onChange={changesHandler}/>
                            <button className={`${style.icon} ${style.create}`}type='submit' onClick={submitOrderHandler}><ShoppingCartTwoToneIcon/></button>
                        </form>
                    </div>
                </div> */}

                {/* COMMENTS */}
                <div className={style.commentsContainer}>
                    <h3 className={style.subtitle}> Comments</h3>
                    {me.id
                        ?   <form className={style.form} onSubmit={submitMessageHandler}>
                                <input type="text" name='comment' value={comment} onChange={changesHandler} placeholder='Comment this product...'/>
                                <button className={`${style.icon} ${style.create}`}type='submit' onClick={submitMessageHandler}><AddCircleTwoToneIcon/></button>
                            </form>
                        :   null
                        }
                    {
                    itsComments[0]
                        ? itsComments.map((comment,index) => 
                        <div className={`${style.comment} ${index % 2 ? style.odd : style.pair}`}>
                            <div className={style.content}>{`${comment.user.name}: ${comment.content}`}</div>
                            {comment.user.id === me.id || (me.access === 'admin' || me.access === 'super')
                                ? <button className={`${style.icon} ${style.delete}`} onClick={()=>deleteComment(comment.id)}><DeleteForeverTwoToneIcon/></button>
                                : null}
                        </div>
                        )
                    : <div className={style.empty}>
                        <h2>{`:(`}</h2>
                        <p>As Coco says: 'no comments'.</p> 
                    </div>
                    }
                </div>

            </div>
        : <></>
    )
}