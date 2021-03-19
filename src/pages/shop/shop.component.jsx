import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/spinner/with-spinner.component';
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collection-overview/collections-overview.component';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading : true
    }
    unSubscribeSnapshot =  null;
    componentDidMount () {
        const collectionRef = firestore.collection('collections');
        const {updateCollections} = this.props;
        collectionRef.get().then( snapshop => {
        const collectionMap = convertCollectionsSnapshotToMap(snapshop);
        updateCollections(collectionMap);
        console.log(updateCollections(collectionMap));
        this.setState({loading : false });
        })
    }
    render () {
        const {match} = this.props;
        const  { loading } = this.state;
        return ( 
            
            <div className='shop-page'>
            
            <Route exact path = {`${match.path}`} render= { props => ( 
                 <CollectionsOverviewWithSpinner isLoading = {loading} {...props}/>)}/> 
             <Route exact path ={`${match.path}/:collectionId`} 
             render = { props => ( <CollectionsPageWithSpinner isLoading = 
                {loading} {...props }/>)}/>
            </div>
         

        )
    }
    
} 

const mapDistpchToProps =  distpach => ({
    updateCollections: collectionsMap => distpach(updateCollections(collectionsMap))
})




export default  connect (null, mapDistpchToProps)(ShopPage);