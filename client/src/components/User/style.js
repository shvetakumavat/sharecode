import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
export default makeStyles({
 
  card: {
   padding:'50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '5px',
    height: '100%',
    position: 'relative',
  },

  
  userName: {
    marginTop:"10px",
    padding: '10px',
  },

  purple: {

    marginTop:"20px",
    color:'#ffffff',
   backgroundColor: deepPurple[300],
    
    marginLeft:'40px'
  }
});
