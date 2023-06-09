import React from "react";
import NavBar from "./NavBar";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import MatchCard from "./MatchCard";

const EventView = () => {
    const { eventDate } = useParams();
    const [details, setDetails] = React.useState([]);
    React.useEffect(() => {
        const getData = async () => {
            const headers = {
                "X-RapidAPI-Key":
                    "9e0c0ccf07msh5034fcd9c9e8340p12555cjsn516087d377c1",
                "X-RapidAPI-Host": "mma-stats.p.rapidapi.com",
            };
            try {
                const response = await axios.get(
                    `https://mma-stats.p.rapidapi.com/${eventDate}`,
                    { headers }
                );
                setDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, []);
    const date = moment(eventDate, "MMMM_DD_YYYY");
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center p-4 gap-4">
                <h1>UFC Event - {date.format("MM/DD/YYYY")}</h1>
                <div className="flex flex-col justify-center items-center text-center gap-2 w-1/2">
                    {details.length > 0
                        ? details.map((el) => (
                              <MatchCard key={uuid()} match={el} />
                          ))
                        : null}
                </div>
                <button className="btn-sway">Lock In Predictions</button>
            </div>
        </>
    );
};
export default EventView;
