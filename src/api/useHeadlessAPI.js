import { useEffect, useState } from "react";

const { REACT_APP_HOST_URI, REACT_APP_GRAPHQL_ENDPOINT } = process.env;

function useHeadlessAPI(query) {
  const [data, setData] = useState();

  useEffect(() => {
    if (query) {
      const { AEMHeadless } = require("@adobe/aem-headless-client-js");

      const sdk = new AEMHeadless({
        serviceURL: REACT_APP_HOST_URI,
        endpoint: REACT_APP_GRAPHQL_ENDPOINT,
      });

      sdk.runQuery(query).then(({ data }) => {
        setData(data);
      });
    }
  }, [query]);

  return { data };
}

export default useHeadlessAPI;
