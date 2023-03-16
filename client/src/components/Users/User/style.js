
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
   
export default makeStyles((theme) => ({
    container: {
marginTop:"3px",
  padding:"20px"
 }
 ,
 username:{
  marginTop:'5px',
  marginLeft:'5px'
 },
 profilePicture:{
  color: theme.palette.getContrastText(deepPurple[300]),
  backgroundColor: deepPurple[300]

 }
,
 followbtn:{
  marginTop:'5px',
  padding:'4px',
  width:"100%",
  alignSelf:'right',
  borderRadius:"2px",
  alignContent:'end',
  color:'#225af5'
 }
}));
