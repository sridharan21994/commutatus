import React, { PropTypes } from 'react';


class Base extends React.Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  

  render(){
    return(
        <div style={{ height: '500px' }}>
             <p>hello react</p>
             {this.props.children}
        </div>
       );
  }
}

Base.propTypes = {
  children: PropTypes.object.isRequired
};
Base.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Base;
