require("dotenv").config();

const PORT = process.env.PORT || 3000;
const YSC_HOST = process.env.YSC_HOST || "";

export { PORT, YSC_HOST };
