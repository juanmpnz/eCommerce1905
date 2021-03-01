/* IMPORTS */
// Config
import React from 'react'
import style from './style.css'
// Components
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import BackupIcon from '@material-ui/icons/Backup';

export default ({
    productId,
    name,
    description,
    price,
    stock,
    off,
    url,
    images,
    categories,
    categoriesList,
    changesHandler,
    addHandler,
    toggleCategoryHandler,
    updateHandler,
    deleteHandler,
    discardHandler,
    addUrlHandler,
    deleteImageHandler,
    updated,
}) => {
    return (
    <div className = {`${style.container} ${updated && productId ? style.updated : null}`}>
            <div className={style.header}>
                    <h2 className={style.title}>Products</h2>
            </div>
            <form onSubmit={e=>e.preventDefault()} className={`${style.form} `}>
                <section>
                    <label>Name</label>
                    <input name='name' type='text' placeholder={'Product name'} value={name} onChange={changesHandler}></input>
                </section>
                <section>
                    <label>Description</label>
                    <input name='description' onChange={changesHandler} type='text' value={description} placeholder='Description'/>
                </section>
                <section>
                    <label>Price $</label>
                    <input name='price' onChange={changesHandler} type='number' value={price} placeholder='$'/>
                </section>
                <section>
                    <label>Available stock</label>
                    <input name='stock' onChange={changesHandler} type='number' value={stock} placeholder='Stock'/>
                </section>
                <section>
                    <label>Off %</label>
                    <input name='off' onChange={changesHandler} type='number' value={off} placeholder='Off'/>
                </section>
            </form>
            <div className={style.sectionContainer}>
                    <h3 className={style.subtitle}> Categories</h3>
                    <div className={style.categories}>
                        {categoriesList.map(category=>
                            <div key={category.id}>
                                <button className={`${style.categoryButton} ${categories.includes(category.id) ? style.has : style.hasNot}`} onClick={()=>toggleCategoryHandler(category.id)}>{category.name}</button>
                            </div>
                        )}
                    </div>
            </div>
            <div className={style.sectionContainer}>
                <h3 className={style.subtitle}> Images</h3>
                <form onSubmit={addUrlHandler} className={style.imageForm}>
                    <input className={style.imageInput} onChange={changesHandler} name='url' type="text" placeholder={`Submit an url direction to add a new image`} value={url}/>
                    <div onClick={addUrlHandler} className={style.imageButton}>
                        <BackupIcon />
                    </div> 
                </form>
                { productId && images && images[0]
                    ?   <div className={style.imagesContainer}>
                        {images.map(i =>
                            <div className={style.cards} key={i.id} onClick={()=> deleteImageHandler(i.id)}>
                                <img src={i.url} alt="Product image"></img>
                                <div className={style.cardsInfo}></div>  
                            </div>
                        )}
                        </div>
                    :   images && images[0] 
                            ? <div className={style.imagesContainer}> 
                                {images.map((url, i) => 
                                    <div className={style.cards} key={i} onClick={()=> deleteImageHandler(url)}>
                                        <img src={url} alt="Product image"></img>
                                        <div className={style.cardsInfo}></div>  
                                    </div>
                                )}
                                </div>
                            :null
                }
            </div>
            <div className = {`${style.buttons}`}>
                {!productId 
                ?   <>
                        <button className={`${style.icon} ${style.create}`} onClick={addHandler}><AddCircleTwoToneIcon fontSize={'large'}/></button>
                        <button className={`${style.icon} ${style.delete}`} onClick={discardHandler}><HighlightOffTwoToneIcon fontSize={'large'}/></button> 
                    </>
                :   <>
                        {updated ? <button className={`${style.icon} ${style.update}`} onClick={updateHandler}><CreateTwoToneIcon fontSize={'large'}/></button> : null}
                        <button className={`${style.icon} ${style.delete}`} onClick={()=>deleteHandler(productId)}><DeleteForeverTwoToneIcon fontSize={'large'}/></button>
                    </>
                }
            </div>
    </div>
)}