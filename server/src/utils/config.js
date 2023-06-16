console.log("config.js");
// null coalescing operator
const PORTasString = process.env.port || "5000";
if (!PORTasString) {
	console.error("No port specified!");
	process.exit(1);
}
const PORT = parseInt(PORTasString);
if (isNaN(PORT)) {
	console.error("Invalid port specified!");
	process.exit(1);
}

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    console.error("No MongoDB URL specified!");
    process.exit(1);
}

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
if (!FRONTEND_ORIGIN) {
    console.error("No frontend origin specified!");
    process.exit(1);
}

//  "mongodb+srv://karolwisniewski2001:<password>@wordle.dbvmneg.mongodb.net/?retryWrites=true&w=majority"
const config = {
    apiServer: {
        port: PORT || 5000
    },
    mongodb: {
        url: MONGODB_URL
    }
};

console.log(config);

export default config;