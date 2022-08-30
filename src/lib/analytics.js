// analytics
import ReactGA from "react-ga4";

console.log(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID)

ReactGA.initialize(process.env.REACT_APP_GOOGLE_MEASUREMENT_ID);

export default ReactGA;
