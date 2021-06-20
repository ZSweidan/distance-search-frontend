import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Box from "@material-ui/core/Box";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import CompanyCard from "../Components/CompanyCard";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    paddingTop: 200,
    width: "100%",
    // maxWidth: "36ch",
  },
});

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
      <Box m={2}>
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
      </Box>
      <Box m={2}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Organization</TableCell>
                <TableCell>Customer Locations</TableCell>
                <TableCell>Services</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
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
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default FilterPage;
