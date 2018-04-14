import React,{ PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class FormData extends React.Component{
constructor(props){
    super(props);
    this.state={
        item:{},
        error:""
    }
    this.onChange=this.onChange.bind(this);
}

componentWillMount(){
    axios.get("http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/529?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c")
    .then(response=>{
        response=JSON.parse(JSON.stringify(response.data));
                console.log(response,typeof response);
      this.setState({
           item:{ title: response.title,
            applications_close_date: response.applications_close_date,
            earliest_start_date: response.earliest_start_date,
            latest_end_date: response.latest_end_date,
            description: response.description,
            backgrounds: response.backgrounds,
            skills: response.skills,
            selection_process: response.role_info.selection_process,
            salary: response.specifics_info.salary,
            role_info_city: response.role_info.city}
      });
        console.log(this.state);
    })
    .catch(err=>{console.log(err)});
  }
onChange(event){
    const field = event.target.name;
    const item = this.state.item;
    item[field] = event.target.value;

    this.setState({
      item,
      error:""        
    });
  
}
renderList(item,index){
    return ( <div key={index}>
           <TextField
            onChange={this.onChange}
            hintText={item}
            floatingLabelFixed={true}
            floatingLabelText={item}
            type="text"
            name={item}
            value={this.state.item[item]?this.state.item[item]:""}
            />
            </div>)
}

render(){
     return (
        <Card>
            <p className="error">{this.state.error}</p>
            {Object.keys(this.state.item).map(this.renderList.bind(this))}
        </Card>
  );
}

}

FormData.contextTypes = {
  router: PropTypes.object.isRequired
};

export default FormData;