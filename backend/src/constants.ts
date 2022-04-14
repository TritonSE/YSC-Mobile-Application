require("dotenv").config();

const PORT = process.env.PORT || 3000;
const YSC_SERVER = process.env.YSC_SERVER || "";

export { PORT, YSC_SERVER };
