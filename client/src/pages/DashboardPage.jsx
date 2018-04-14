import React, { PropTypes } from 'react';

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
        </div>
        );
  }
}


DashboardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DashboardPage;
