import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Search.css';
import * as actions from '../../actions/index';
class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onChange = (event) =>{                        
        var target = event.target;       
        var name = target.name;        
        var value = target.value;      
        this.setState({
            [name] : value             
        });
    }

    onSearch = () =>{              
       this.props.onSearch(this.state.keyword);           //dispatch searchTask        
    }

    render(){
        var { keyword } = this.state;
        return(
            <div className='row mt-15'> 
                <div className='input-search'>
                    <input type='text' 
                            className='form-control' 
                            placeholder='nhập từ khóa ...'
                            name='keyword'
                            value={ keyword }      
                            onChange={this.onChange}> 
                    </input>
                    <button className='btn btn-primary'
                            type='button'
                            onClick={this.onSearch}> 
                        <span className='fa fa-search'></span>Tìm</button>
                    
                </div>
            </div>
    )}
}

const mapStateToProps = () => {
    return {};
};

const mapDispatchProps = (dispatch, props) => {
    return {
        onSearch : (keyword)=>{
            dispatch(actions.searchTask(keyword));
        }
    };
};

export default connect(mapStateToProps, mapDispatchProps)(Search);