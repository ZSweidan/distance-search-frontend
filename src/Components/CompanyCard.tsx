import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));


type CompanyCardProps = {
  id: number;
  urlName: string;
  organization: string;
  customerLocations: string;
  willWorkRemotely: boolean;
  website: string;
  services: string;
  offices: Object;

}
// ({id, urlName, organization, customerLocations, willWorkRemotely, services, offices, children}) 
const CompanyCard: React.FC<CompanyCardProps> = ({id, urlName, organization, customerLocations, willWorkRemotely, services, offices}) => {

  const classes = useStyles();
 
  return (
    <>
    <TableRow key={id}>
    <TableCell component="th" scope="row">
      {organization}
    </TableCell>
    <TableCell>{customerLocations}</TableCell>
    <TableCell>{services}</TableCell>
    {/* <TableCell align="right">{row.carbs}</TableCell>
    <TableCell align="right">{row.protein}</TableCell> */}
  </TableRow>
  </>
  )
  return (
   <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={organization}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              {/* {willWorkRemotely} */}
              </Typography>
              Customer Location
              {customerLocations}
            </React.Fragment>
          }
        />
        <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              {customerLocations}
              </Typography>
      </ListItem>
      <Divider variant="inset" component="li" />
      </>

  );
}

export default CompanyCard;