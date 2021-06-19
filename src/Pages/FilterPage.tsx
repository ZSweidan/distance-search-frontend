import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import CompanyCard from "../Components/CompanyCard";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Company {
  id: number;
  urlName: string;
  organization: string;
  customerLocations: string;
  willWorkRemotely: boolean;
  website: string;
  services: string;
  offices: Object;
}
const FilterPage: React.FC = () => {
  const [range, setRange] = useState("");
  const [partners, setPartners] = useState<any[]>([]);
  const classes = useStyles();
  const getContacts = () => {
    let url = "http://127.0.0.1:9000/getRange";
    try {
      axios
        .post(url, range, {})
        .then((res) => {
          console.log("sorting", res.data[0].id);
          const data: Company[] = res.data;
          const companyArr: Company[] = [];
          data.forEach((obj) => {
            console.log(obj.urlName);
            companyArr.push(obj);
          });
          companyArr.sort((a, b) =>
            a.organization.localeCompare(b.organization)
          );
          setPartners(companyArr);
        })
        .catch(console.log)
        .catch((err) => console.log(err.respone.data.message));
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <form>
          <label>
            Range of kms:
            <input
              name="numberOfKm"
              onChange={(event) => {
                setRange(event.target.value);
              }}
            />
          </label>
          <input
            type="submit"
            value="Submit"
            onClick={(event) => {
              getContacts();
              event.preventDefault();
            }}
          />
        </form>
        <List className={classes.root}>
          {partners.map((company: Company) => (
            <CompanyCard
              key={`card-${company.id}`}
              id={company.id}
              urlName={company.urlName}
              organization={company.organization}
              customerLocations={company.customerLocations}
              willWorkRemotely={company.willWorkRemotely}
              website={company.website + ""}
              services={company.services}
              offices={company.offices}
            />
          ))}
        </List>
      </Container>
    </>
  );
};

export default FilterPage;
