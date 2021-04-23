import { makeStyles } from '@material-ui/styles';

const centeredStyleObj = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default makeStyles({
  container: {
    ...centeredStyleObj,
    height: '70vh',
  },
  cardContainer: {
    
    width: 300,
    height: 400,
    padding: '2rem',
    ...centeredStyleObj,
  },
  title: {
    fontSize: '3rem',
  },
  titleGridContainer: {
    ...centeredStyleObj,
  },
});
