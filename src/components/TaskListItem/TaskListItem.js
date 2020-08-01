import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';
import './TaskListItem.css';

class TaskListItem extends Component{

    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.id);

    }

    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);       //~ dispatch(actions.deleteItem)
        this.props.onCloseForm();
    }

    onEditTask = () => {
        this.props.onOpenForm();                
        this.props.onEditTask(this.props.task);
    }

    render(){
        var { task, index } = this.props;                
        return(
            <tr>
                <td className='text-center'>{index +1}</td>
                <td className='text-center'>{task.name}</td>
                <td className='text-center'>
                <span onClick={this.onUpdateStatus} 
                      className={task.status === true ? 'badge badge-success': 'badge badge-danger'}>
                {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                </span>
                </td>
                <td className='text-center'>
                    <button type='button' 
                            className='btn btn-warning'
                            onClick={this.onEditTask}
                    ><span className='fa fa-pencil'></span>
                    Sửa</button>
                    <button type='button' 
                            className='btn btn-danger'
                            onClick={this.onDelete}
                    ><span className='fa fa-trash' ></span>
                    Xóa</button>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListItem);

