import { request } from "./request";
import { URL, requestMethods } from "../utilities/Constants";

const { post, put, get } = requestMethods;
const { BASE_URL } = URL;

export const postApi = async ({ url, params }) => {
  return await request({
    method: post,
    url,
    data: params,
  });
};

export const putApi = async ({ token, url: requestUrl, data }) => {
  const url = BASE_URL + requestUrl;
  return await request({
    method: put,
    url,
    data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getApi = async ({ token, url }) => {
  return await request({
    method: get,
    url,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const multipartPostApiWithToken = async ({
  params,
  access_token,
  url,
  config,
  specificConfig,
}) => {
  let configuration = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "multipart/form-data",
    },
  };
  if (specificConfig) {
    configuration = config;
  }

  return await request({
    method: post,
    url,
    data: params,
    ...configuration,
  });
};

export const postApiWithToken = async ({ access_token, url, data }) => {
  return await request({
    method: post,
    url,
    data,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
