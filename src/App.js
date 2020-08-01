import React, { Component } from 'react'; //import react

import { connect } from 'react-redux';
import * as actions from './actions/index';

import './App.css'; //import css
import TaskForm from './components/TaskForm/TaskForm';  
import Control from './components/Control/Control';
import TaskList from './components/TaskList/TaskList';

class App extends Component {

  onToggleForm = () => { 
    var {itemEditing} = this.props;
    if(itemEditing && itemEditing.id !== ''){
      this.props.onOpenForm();
    }else{
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id : '',
      name : '',
      status : false
    });
  }

  onSort = (sortBy, sortValue) => {         
    this.setState({
        sortBy : sortBy,                  
        sortValue : sortValue             
      });
  }

  render(){
    var { isDisplayForm } = this.props;

    return (
      <div>
        <div className='appTitle'>
            Quản Lý Công Việc
          </div>
          <hr/>
    
          <div className='container'>
            <div className='row'>
              <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>   
                <TaskForm /> 
              </div>  
              <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12 '}>
                <button type='button' className='btn btn-primary' onClick={this.onToggleForm}>
                  <span className='fa fa-plus'>
                  </span>Thêm Công Việc
                </button>

                <Control />
               
                <TaskList />
              </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditing : state.itemEditing
  };
};

const mapDispatchToProps = (dispatch,props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm : () => {
      dispatch(actions.openForm());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
