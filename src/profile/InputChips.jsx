import React, { useState} from 'react';
import ChipInput from 'material-ui-chip-input';
const InputChips = (props) =>{
    const [yourChips, setYourChips] = useState(props.data?props.data:[]);
    const handleAddChip = (chip) => {
        setYourChips((preVal)=>{
            props.getFun(props.variable,[...preVal,chip]);
            return [...preVal,chip];
        });
        
    };
    const handleDeleteChip = (chip,index) => {
        setYourChips(preVal =>{
            const val = preVal.filter((val,ind)=>{
                return ind!==index;
            }); 
            props.getFun(props.variable,val);
            return val; 
         });
    };
    return(
        <>
            <ChipInput
                value={yourChips}
                onAdd={handleAddChip}
                onDelete={(chip, index) => handleDeleteChip(chip, index)}
            />
        </>
    )
}

export default InputChips;