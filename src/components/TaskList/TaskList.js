import React, { Component } from 'react';
import { connect } from 'react-redux';

import './TaskList.css';
import TaskListItem from '../TaskListItem/TaskListItem';
import * as actions from '../../actions/index';

class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        }
    }

    onChange = (event) => {           
        var target = event.target;          
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name : name === 'filterName' ? value : this.state.filterName, 
            status : name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter)
        this.setState({             
            [name] : value
        });
    }

    render(){
        var { tasks, filterTable, keyword, sort  } = this.props;  
            //filter on table
            if(filterTable.name){                          
                tasks = tasks.filter((task)=>{          
                return task.name.toLowerCase().indexOf(filterTable.name) !== -1;     
                })
            }
            tasks = tasks.filter((task)=>{             
                if(filterTable.status === -1){    //null undefine !==0        
                    return task;
                }else{
                    return task.status === (filterTable.status === 1 ? true : false);  
                }
            }) 

            //search
            if(keyword){                      
                tasks = tasks.filter((task) => {        /* **********khong su dung thu vien lodash*************** filter tasks và nhận lại task */ 
                return task.name.toLowerCase().indexOf(keyword) !== -1;       //trả về tên của task
            })
        }
        //sort
        if(sort.by === 'name'){
            tasks.sort((a,b)=>{
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -(sort.value);
                else return 0;
            })
        }else{
            tasks.sort((a,b)=> {
                if(a.status > b.status) return -(sort.value);
                else if(a.status < b.status) return sort.value;
                else return 0;
            })
        }

            //su dung thu vien lodash
            // tasks = filter(tasks, (task)=>{
            //     return task.name.toLowerCase().indexOf(keyword) !== -1;
            //});
        var elmTask = tasks.map((task, index)=>{             //duyet qua r hien thi
            return <TaskListItem         
                        key={task.id} 
                        index={index} 
                        task={task} 
                    />
        });


        return(
        <div className='table'>
            <table className='table table-bordered table-hover tableJob'>
                <thead>
                    <tr>
                        <th className='text-center'>STT</th>
                        <th className='text-center thName'>Tên</th>
                        <th className='text-center'>Trạng Thái</th>
                        <th className='text-center'>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" 
                                    className="form-control"
                                    name="filterName" 
                                    value = { this.state.filterName }          
                                    onChange={ this.onChange }
                            />
                        </td>
                        <td>
                            <select className='form-control' 
                                    name='filterStatus'
                                    value = {this.state.filterStatus}
                                    onChange = { this.onChange }
                            >
                               <option value={-1}>Tất Cả</option>
                               <option value={0}>Ẩn</option>
                               <option value={1}>Kích Hoạt</option>
                           </select>
                        </td>
                        <td></td>
                    </tr>
                    { elmTask }
                </tbody>
            </table>
        </div>
    )}
}

const mapStateToProps = (state) => {                 //state ở store         
    return {
        tasks : state.tasks,
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort                           //props
    }
}

const mapDispatchToProps = (dispatch,props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
}
//component đã có props là tasks
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);