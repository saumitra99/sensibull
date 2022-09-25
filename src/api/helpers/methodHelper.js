import axios from "./axiosHelperLatest";

const getBaseURL = () => apiURLOriginal;
const apiURLOriginal = `${process.env.REACT_APP_API_URL}`;

export const get = (url = "", params, headers, apiBase = "api/v2") => {
  const urlUpdated =
    url.charAt(0) === "/" ? `${apiBase}${url}` : `${apiBase}/${url}`;
  return axios.get(getBaseURL() + urlUpdated, {
    headers: {
      ...headers,
    },
    params: {
      ...params,
    },
  });
};

export const post = (url = "", body, params, headers, apiBase = "api/v2") => {
  const urlUpdated =
    url.charAt(0) === "/" ? `${apiBase}${url}` : `${apiBase}/${url}`;
  return axios.post(getBaseURL() + urlUpdated, body, {
    headers: {
      ...headers,
    },
    params: {
      ...params,
    },
  });
};

export const put = (url = "", params, headers, data, apiBase = "api/v2") => {
  const urlUpdated =
    url.charAt(0) === "/" ? `${apiBase}${url}` : `${apiBase}/${url}`;
  return axios.put(
    getBaseURL() + urlUpdated,
    {
      ...data,
    },
    {
      headers: {
        ...headers,
      },
      params: {
        ...params,
      },
    }
  );
};

export const del = (url = "", body, params, headers, apiBase = "api") => {
  const urlUpdated =
    url.charAt(0) === "/" ? `${apiBase}${url}` : `${apiBase}/${url}`;
  return axios.delete(getBaseURL() + urlUpdated, body, {
    headers: {
      ...headers,
    },
    params: {
      ...params,
    },
  });
};
