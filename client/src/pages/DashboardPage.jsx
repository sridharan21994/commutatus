import React, { PropTypes } from 'react';
import FormData from './FormData.jsx';

class DashboardPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value:""
    }
  }
  
  render(){
    return(
        <div>
          <h1>opportunites
            </h1>
            <FormData/>  
        </div>
        );
  }
}


DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DashboardPage;
