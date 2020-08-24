import React, {useState} from 'react';
import ChipInput from 'material-ui-chip-input';
const InputChips = () =>{
    const [yourChips, setYourChips] = useState([1]);
    const handleAddChip = (chip) => {
        setYourChips((preVal)=>{
            return [...preVal,chip];
        });
    };
    const handleDeleteChip = (chip,index) => {
        console.log(chip,index);
        setYourChips(preVal =>{
            return  preVal.filter((val,ind)=>{
                return ind!==index;
            });  
         });
    };
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