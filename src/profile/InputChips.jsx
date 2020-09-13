import React, {useState} from 'react';
import ChipInput from 'material-ui-chip-input';
import {updatecamera,updatelenses,updateediting,updateothers} from './Redux/Action';
import {useSelector,useDispatch} from 'react-redux';
const InputChips = (props) =>{
    const disptch = useDispatch();
    const [yourChips, setYourChips] = useState(props.data?props.data:[]);
    // props.sendData(props.data,props.indx);
    const handleAddChip = (chip) => {
        setYourChips((preVal)=>{
            updateInfoState(preVal,chip,props.indx);
            // props.sendData([...preVal,chip],props.indx);
            return [...preVal,chip];
        });
        
    };
    const handleDeleteChip = (chip,index) => {
        setYourChips(preVal =>{
            const val = preVal.filter((val,ind)=>{
                return ind!==index;
            }); 
            updateInfoState(val,null,props.indx);
            // props.sendData(val,props.indx);
            return val; 
         });
    };
    const updateInfoState = (preVal,chip,indx)=>{
        if(indx === 0){
            disptch(updatecamera(chip?[...preVal,chip]:[...preVal])); 
         }else if(indx === 1){
            disptch(updatelenses(chip?[...preVal,chip]:[...preVal])); 
         }else if(indx === 2){
            disptch(updateediting(chip?[...preVal,chip]:[...preVal])); 
         }else if(indx === 3){
            disptch(updateothers(chip?[...preVal,chip]:[...preVal])); 
         }
    }
    return(
        <>
            <ChipInput
                value={yourChips}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
            />
        </>
    )
}

export default InputChips;