import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: "hiszm0i2o1ez85n2dm5wuyq7",
  },
});
