
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
  },
  fileInput: {
  
    margin: '10px 0',
    padding:12,
    border:"solid 1px #ccc",
    borderRadius:'5px',
  },
  buttonSubmit: {
    borderRadius:'5px',
    marginLeft:5,
    width:'30%'
  },
  border:{
    border:"solid 1px #f00255"
  }
}));
