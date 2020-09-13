const Index = (state=false,action) => {
    switch(action.type){
        case 'UPLOADMODAL':
            return state = !state;
        default:
            return state;
    }

}

export default Index;