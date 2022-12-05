import React from "react";
import { useState , useEffect } from "react";
import axios from 'axios';
import { Card , CardContent , Typography } from "@mui/material";
import CountUp from "react-countup";
import cx from "classnames";
import styles from "./Cards.module.css";
import { cases, recover, death} from "../../images/index";
function Cards() {
    const url = "https://api.covid19api.com";
    const [globalData, setGlobalData] = useState({});
    const [searchResults, setSearchResults] = useState("");
    const [countries,setCountries] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`${url}/summary`).then(resp => {
                  console.log(resp.data);
                  setGlobalData(resp.data['Global']);
                  setCountries(resp.data['Countries']);
              });
              } catch (error) {
                console.log("error", error);
                return error;
              }
          };
          fetchData();
      },[]);

    const handleChangeSearch = (e) => {
        setSearchResults(e.target.value);
    };

    return (
      <div className={styles.container}>
         <Typography className={styles.sectionTitle}>Global Statistics</Typography>  
         <div className={styles.GlobalStatistics}>
            <CardContent component={Card} className={cx(styles.card, styles.cases)}>
              <img src={cases} className={styles.smallimage} alt="cases"/>
              <Typography color="textSecondary" gutterBottom>Cases</Typography>
              <Typography variant="h5"><CountUp start={0} end={globalData ? globalData['TotalConfirmed'] : ""} duration={2.5} separator="," /></Typography>
              <Typography variant="body2">Number cases of {new Date(globalData['Date']).toDateString()}</Typography>
            </CardContent>
            <CardContent component={Card} className={cx(styles.card, styles.recovere)}>
              <img src={recover} className={styles.smallimage} alt="recovere"/>
              <Typography color="textSecondary" gutterBottom>Recovered</Typography>
              <Typography variant="h5"><CountUp start={0} end={globalData ? globalData['TotalRecovered'] : ""} duration={2.5} separator="," /></Typography>
              <Typography variant="body2">Number Recovered of {new Date(globalData['Date']).toDateString()}</Typography>
            </CardContent>
            <CardContent component={Card} className={cx(styles.card, styles.deaths)}>
              <img src={death} className={styles.smallimage} alt="death"/>
              <Typography color="textSecondary" gutterBottom>Deaths</Typography>
              <Typography variant="h5"><CountUp start={0} end={globalData ? globalData['TotalDeaths'] : ""} duration={2.5} separator="," /></Typography>
              <Typography variant="body2">Number deaths of {new Date(globalData['Date']).toDateString()}</Typography>
            </CardContent>
         </div>
         <Typography className={styles.sectionTitle}>statistics per country </Typography> 
         <input className={styles.search} onChange={handleChangeSearch} placeholder="Enter Country Name" value={searchResults} type="text"/>
         <div className={styles.countriesStatistics}>
         <CardContent component={Card} className={styles.card}>
            <div className={styles.content}>
                <p><strong>Country</strong></p>
            </div>
            <div className={styles.content}>
                <p><strong>Cases</strong></p>
            </div>
            <div className={styles.content}>
                <p><strong>Recovered</strong></p>
            </div>
            <div className={styles.content}>
                <p><strong>Deaths</strong></p>
            </div>
        </CardContent>
         { countries ? (countries.filter(({ Country }) => Country.toLowerCase().includes(searchResults.toLowerCase())).map((value, index) => (    
         <CardContent key={index} component={Card} className={styles.card}>
            <div className={styles.content}>
                <p>{value['Country']}</p>
            </div>
            <div className={styles.content}>
                <p>{value['TotalConfirmed']}</p>
            </div>
            <div className={styles.content}>
                <p>{value['TotalRecovered']}</p>
            </div>
            <div className={styles.content}>
                <p>{value['TotalDeaths']}</p>
            </div>
        </CardContent>
        ))): "No data" }
         </div>
      </div>
    );
  };
  
  export default Cards;