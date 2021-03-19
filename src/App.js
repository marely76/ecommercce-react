import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import CheckOutPage from  './pages/checkoutpage/checkout.component.jsx';


import { auth, createUserProfileDocument} from './firebase/firebase.utils.jsx';

import {setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';






class App extends React.Component {
  
  unsubscribeFromAuth= null;

  
  componentDidMount() {

    const {setCurrentUser}= this.props;
    
    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth => {
      if (userAuth){
        const userRef= await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
        
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          });
      });
      }
      setCurrentUser(userAuth);
      
    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  render() {

 
  return (
    <div>
    <Header/>
    <Switch>
    <Route exact path ='/' component={HomePage}/>
    <Route path ='/shop' component={ShopPage}/>
    <Route exact path ='/checkout' component={CheckOutPage}/>
    <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
    </Switch>
    
    </div>
  );
}
}
const mapStateToProps = createStructuredSelector ( {
 setCurrentUser: selectCurrentUser
 
})
  



const mapDistpachToProps = dispatch => ({
  
  setCurrentUser: user => dispatch(setCurrentUser(user))
  });
export default connect (mapStateToProps, mapDistpachToProps)(App);

