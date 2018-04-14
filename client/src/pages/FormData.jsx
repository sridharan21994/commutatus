import React,{ PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

class FormData extends React.Component{
constructor(props){
    super(props);
    this.state={
        item:{},
        error:"",
        disabled: true
    }
    this.onChange=this.onChange.bind(this);
}

componentWillMount(){
    axios.get("http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/529?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c")
    .then(response=>{
        response=JSON.parse(JSON.stringify(response.data));
                response.modifiedSkills = "";
                response.modifiedBackgrounds = "";
                response.skills.map(function(item,index){
                    (response.skills.length===(index+1)) ? (response.modifiedSkills += item.name):(response.modifiedSkills += item.name + ", ");
                });
                response.backgrounds.map(function(item,index){
                    (response.backgrounds.length===index+1) ? (response.modifiedBackgrounds += item.name):(response.modifiedBackgrounds += item.name + ", ");
                });

      this.setState({
           item:{ title: response.title,
            applications_close_date: response.applications_close_date,
            earliest_start_date: response.earliest_start_date,
            latest_end_date: response.latest_end_date,
            description: response.description,
            backgrounds: response.modifiedBackgrounds,
            skills: response.modifiedSkills,
            selection_process: response.role_info.selection_process,
            salary: response.specifics_info.salary,
            role_info_city: response.role_info.city}
      });
    })
    .catch(err=>{console.log(err)});
  }
toggleEdit(){
    this.setState({
        disabled: !this.state.disabled
    })
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
submitForm(){
    var data = {opportunity:{}};
    data.opportunity.skills=[];
    data.opportunity.backgrounds=[];
    this.state.item.skills.split(", ").map(function(item){
       data.opportunity.skills.push({"name":item});
    });
    this.state.item.backgrounds.split(", ").map(function(item){
       data.opportunity.backgrounds.push({"name":item});
    });
    data.opportunity = Object.assign({},this.state.item, {backgrounds: data.opportunity.backgrounds},{skills:data.opportunity.skils});
     axios.patch("http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/529?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c",data)
     .then(response=>{
         console.log(response);
     })
        .catch(err=>{
            console.log(err);
        })
}
renderList(item,index){
    return ( <div style={{textAlign:"center"}} key={index}>
           <TextField
            style={{width:"80%"}}
            floatingLabelStyle={{fontSize:"30px",color:"rgb(0, 188, 212)"}}
            disabled={this.state.disabled}
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
        <Card style={{textAlign:"center",width:"900px",margin:"0 auto"}}>
                <RaisedButton
                  style={{margin:"5px 10px"}}
                  label={'Toggle Edit'}
                  primary={true}
                  onClick={this.toggleEdit.bind(this)}
                />   
                <RaisedButton
                  style={{margin:"5px 10px"}}
                  label={'Submit'}
                  primary={true}
                  onClick={this.submitForm.bind(this)}
                />    
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