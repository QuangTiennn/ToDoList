import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Sort.css';
import * as actions from '../../actions/index';
class Sort extends Component{
    constructor(props){
        super(props);
        this.state = {
            sort : {
                by : 'name',
                value : 1
            }
        }
    }
    onClick = (sortBy,sortValue) => {      
        this.props.onSort({
            by : sortBy,
            value : sortValue
        });
    }

    componentWillReceiveProps(nextProps){
        
    }
    render(){
        return(
            <div>
                <button className="btn btn-primary dropdown-toggle dropdownSort btnSort" 
                    type="button" 
                    id="dropdownMenu1" 
                    data-toggle="dropdown" 
                    aria-haspopup="true" 
                    aria-expanded="false">Sắp Xếp<span className="fa fa-caret-square-o-down ml-5"></span>
                </button>
                <ul className='dropdown-menu' aria-labelledby="dropdownMenu1">
                    <li onClick={()=>this.onClick('name', 1)}>  
                        <a role='button' href='/#'
                            className={this.props.sort.by === 'name' && this.props.sort.value === 1 ? 'sort_selected' : ''}
                        >
                            <span className='fa fa-sort-alpha-asc pr-5'>Tên A-Z</span>
                        </a>
                    </li>
                    <li onClick={()=>this.onClick('name', -1)}>
                    <a role='button' href='/#'
                            className={this.props.sort.by === 'name' && this.props.sort.value === -1 ? 'sort_selected' : ''}
                    >
                            <span className='fa fa-sort-alpha-desc pr-5'>Tên Z-A</span>
                        </a>
                    </li>
                    <hr/>
                    <li onClick={()=>this.onClick('status', 1)}>
                    <a role='button' href='/#' 
                            className={this.props.sort.by === 'status' && this.props.sort.value === 1 ? 'sort_selected' : ''}
                    >
                        Trạng Thái Kích Hoạt
                        </a>
                    </li>
                    <li onClick={()=>this.onClick('status', -1)}>
                    <a role='button' href='/#' 
                            className={this.props.sort.by === 'status' && this.props.sort.value === -1 ? 'sort_selected' : ''}
                    >
                            Trạng Thái Ẩn
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sort : state.sort,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort : (sort) => {             //component cos props la onSort
            dispatch(actions.sortTask(sort));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
