import * as types from '../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));   //get data in localstorage
var initialState = data ? data : [];             //check if have data get data or return empty arr

var s4 = () =>{
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}

var findIndex = (tasks,id) => {                 
    var result = -1;       //k tim thay la -1            
    tasks.forEach((task,index)=>{       
      if(task.id === id){                
        result = index;                  
      }
    });
    return result;               
}


var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.LIST_ALL : return state;
        case types.SAVE_TASK : 
            var task = {
                id : action.task.id,
                name : action.task.name,
                status : action.task.status === 'true' ? true : false 
            }
            if(!task.id){
                task.id = randomID();
                state.push(task);
            }else{
                let index = findIndex(state,task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks',JSON.stringify(state));          //lưu ở localstorage dạng string 
            return [...state];          //nếu dùng kiểu dấu bằng sẽ tham chiếu vùng nhớ nên viết theo cách ...state giống như hàm map coppy ra arr ms 
        case types.UPDATE_STATUS_TASK : {
            let id = action.id;
            let index = findIndex(state,id);
            state[index] = {
                ...state[index],
                status : !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        }
        case types.DELETE_TASK : {
            let id = action.id;
            let index = findIndex(state,id);
            state.splice(index,1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];  
        }
        default : return state;
    }
};

export default myReducer;