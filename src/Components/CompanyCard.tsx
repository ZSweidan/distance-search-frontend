import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
}));

type CompanyCardProps = {
  //   children: React.ReactNode;
  id: number;
  urlName: string;
  organization: string;
  customerLocations: string;
  willWorkRemotely: boolean;
  website: string;
  services: string;
  offices: any;
};
// ({id, urlName, organization, customerLocations, willWorkRemotely, services, offices, children})
const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  urlName,
  organization,
  customerLocations,
  willWorkRemotely,
  services,
  offices,
}) => {
  const classes = useStyles();

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

              {id}
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
        {offices.map((office: any) => (
          <ListItemText primary={`Office: ${office}`} />
        ))}
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CompanyCard;
