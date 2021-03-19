import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IVFDGCxFkFkbtr4njdN0hVrmEsy21gfI9BA1I6YrlRugrF0RYG8tX5AR0ahToz04sM3eMxj6qjIwsMCMRqe2et000nR4sD2Uy';
  
    const onToken = token => {
        
        alert(`{Payment sucessfully ${token}}`);
        console.log(token);
    }
    return (
        <StripeCheckout
        label = 'Pay Now'
        name ='Crown Clothing Llc'
        image= 'https://sendeyo.com/en/f3eb2117da'
        shippingAddress
        billingAddress={false}
        zipCode={false}
        description = {`Your total price is $${price}`}
        amount = {priceForStripe}
        panelLabel = 'Pay now'
        token = {onToken}
        stripeKey = {publishableKey}
         />
    )
}

export default StripeCheckoutButton;
