import React, { Component } from 'react';

import './Control.css';

import Search from '../Search/Search';
import Sort from '../Sort/Sort';
class Control extends Component{
    render(){
        return(
            <div className='row'>
                {/* search *********************/}
                <Search />
                <Sort />
            </div>
        )
    }
}

export default Control;