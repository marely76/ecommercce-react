import React from 'react';
import './collection-item.styles.scss';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';
import CustomButton from '../custom-button/custom-button.component';

const CollectionItem = ( { item, addItem } ) => {
const {name, price, imageUrl} = item;

return (
<div className='collection-item'>
    <div className='image'
         style = {{
             backgroundImage: `url(${imageUrl})`
         }}
       />
    <div className= 'collection-footer'>
    <span className='name'>{name}</span>
    <span className='price'>{price}</span>
    </div>
     <CustomButton onClick ={()=>addItem(item)} inverted>Add To Cart</CustomButton>

</div>

);
}
const mapDistpachToProps = distpach =>({
    addItem: item => distpach (addItem(item))
})
export default connect(null, mapDistpachToProps)(CollectionItem);