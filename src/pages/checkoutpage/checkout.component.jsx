import React from 'react';
import './checkout.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectCartItems, SelectCartTotal } from '../../redux/cart/cart.selectors';

import CheckOutItem  from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe/stripe.button.component';


const checkOutPage = ({carItems, total}) => (
<div className='checkout-page'> 
    <div className ='checkout-header'>
        
        <div className ='header-block'>
            <span>Product</span>
        </div>
        
        <div className ='header-block'>
            <span>Description</span>
        </div>

        <div className ='header-block'>
            <span>Quantity</span>
        </div>

        <div className ='header-block'>
            <span>Price</span>
        </div>

        <div className ='header-block'>
            <span>Remove</span>
        </div>
    </div>
    {
        
        carItems.map ( cartItem => 
            <CheckOutItem  key = { cartItem.id } cartItem= {cartItem}/>
        )
    }

    
    <div className ='total'>
    <span>TOTAL: ${total}</span>
    </div>
    <div className='test-warning'>
    '* Please use the following test credicard for Payments*'
    <br />
      4242 4242 4242 4242
      Exp: 01/2015 CW:123
    </div>
    <StripeCheckoutButton price= {total} />

    </div>
    

    )
    
   const mapStatetoProps= createStructuredSelector (
       {
           carItems: selectCartItems,
           total: SelectCartTotal
       }
   );




export default connect(mapStatetoProps)(checkOutPage);