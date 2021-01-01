import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'80%',
        margin:'6px auto'
    },
}));
const Password = (props) =>{
    const classes = useStyles();
    const [values, setValues] = useState({
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        props.setData(props.type=='p'?'password':'cpassword',event.target.value);
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    return(
        <>
        <FormControl className={classes.root} variant="outlined" >
    <InputLabel htmlFor="outlined-adornment-password">{props.type=='p'?'Password':'Confirm Password'}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={props.values}
                    onChange={handleChange('password')}
                    onBlur={props.validateFun}
                    onFocus={props.resetError}
                    onKeyDown={(e)=>(e.key=='Enter'?props.validate():'')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                                }
                    labelWidth={70}
                     />
        </FormControl>
        </>
    )

}

export default Password;