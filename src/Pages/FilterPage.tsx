import React, { useState} from "react";
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
  const [partners, setPartners] = useState<Company[]>([]);
  const [validInput, setValidInput] = useState(false);
  const classes = useStyles();
  const getContacts = () => {
    let url = "http://127.0.0.1:9000/getRange";
    if (parseInt(range) < 0) {
      setValidInput(true);
    } else {
      setValidInput(false);
      try {
        axios
          .post(url, range, {})
          .then((res) => {
            const data: Company[] = res.data;
            const companyArr: Company[] = [];
            if (data.length !== 0) {
              data.forEach((obj) => {
                companyArr.push(obj);
              });
              companyArr.sort((a, b) =>
                a.organization.localeCompare(b.organization)
              );
            }
            setPartners(companyArr);
          })
          .catch(console.log)
          .catch((err) => console.log(err.respone.data.message));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <form>
          <label>
            Range of kms:
            <input
              type="number"
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
          {validInput === true ? (
            <h3>Please enter a positive integer</h3>
          ) : partners.length !== 0 ? (
            partners.map((company: Company) => (
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
            ))
          ) : (
            <>
              <h3>No available companies within the entered range</h3>
            </>
          )}
        </List>
      </Container>
    </>
  );
};

export default FilterPage;
