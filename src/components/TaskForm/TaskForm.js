import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';
import './TaskForm.css';

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }  
    componentWillMount () {                 
        if(this.props.itemEditing !== null){        
            this.setState({                       
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status
            });
        }else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps){  
        if(nextProps && nextProps.itemEditing){
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status
            });
        }else if(!nextProps.task){
            this.setState({
                id : '',
                name : '',
                status : false
            })
        }
    }

    onCloseForm = () => {               
        this.props.onCloseForm();
    }

    handleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }

    onSaveTask = (event) => {       
        event.preventDefault();    
        this.props.onSaveTask(this.state);
        this.onClear();             
        this.onCloseForm();             
    }

    onClear = () => {          
        this.setState({ 
            name : '',
            status : false 
        })
    }

    render(){
        if(!this.props.isDisplayForm) return null;
        return(
            <div className='taskForm'>
                <div className='panel-heading'>
                    <h3>
                        {!this.state.id ? 'Thêm Công Việc' : 'Cập Nhật Công Việc'}
                    </h3>
                    <span className='fa fa-times-circle text-right' onClick={this.onCloseForm}>
                    </span>
                </div>
                <div className='form'>
                    <form onSubmit={this.onSaveTask}>
                        <label>Tên Công Việc :</label>
                        <input type='text' 
                            className='form-control'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                        ></input>
                        <label>Trạng Thái :</label>
                        <br/>
                        <select className='form-control'
                                name='status'
                                value={this.state.status}
                                onChange={this.handleChange}
                        >
                            <option value = {true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <div className='buttonForm'>
                            <button type='submit'
                                    className='btn btn-warning'
                            ><span className='fa fa-plus'></span>Lưu</button>
                            <button type='button' 
                                    className='btn btn-danger'
                                    onClick={this.onClear}
                            ><span className='fa fa-times'></span>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch , props) => {                 //la 1 action     chuyen dispatch thanh props 
    return {
        onSaveTask : (task) => {                                     //props cua taskForm
            dispatch(actions.saveTask(task))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);