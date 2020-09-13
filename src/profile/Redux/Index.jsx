
const Index  = (state={camera:[],lenses:[],editing:[],others:[]},action)=>{
    let {camera,lenses,editing,others} = {...state};
    switch(action.type){
        case 'UPDATE':
            return state=action.payload;
        case 'UPDATECAMERA':
            camera=action.payload;
            return state = {camera,lenses,editing,others};
        case 'UPDATELENSES':
            lenses=action.payload;
            return state = {camera,lenses,editing,others};
        case 'UPDATEEDITING':
            editing=action.payload;
            return state = {camera,lenses,editing,others};
        case 'UPDATEOTHERS':
            others=action.payload;
            return state = {camera,lenses,editing,others};
        default:
            return state;
    }

}

export default Index;