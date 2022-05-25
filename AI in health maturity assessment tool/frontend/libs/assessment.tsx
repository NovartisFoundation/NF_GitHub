import fetch from "isomorphic-unfetch";
import { AreaDatas, Session } from "../utils/types";

let baseRoot = process.env.API_URL;

if (process.env.API_URL_STAGING) {
  baseRoot = process.env.API_URL_STAGING;
}

const questionCollectionURL = `${baseRoot}/api/area`;
const initSessionURL = `${baseRoot}/api/session`;
const addResultsURL = (token) => `${baseRoot}/api/session/${token}/result`;
const getSessionURL = (token) => `${baseRoot}/api/session/${token}`;

export const fetchQuestions = async (): Promise<AreaDatas[]> => {
  const res = await fetch(questionCollectionURL);
  const data = await res.json();
  return data as AreaDatas[];
};

export const initSession = async (
  country: string,
  group: string,
  role: string
): Promise<string> => {
  const body = {
    country,
    group,
    role,
  };

  const res = await fetch(initSessionURL, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return data.token as string;
};

export const addResults = async (
  token: string,
  area: string,
  score: number,
  scoreByPillars: { slug: string; score: number }[]
): Promise<boolean> => {
  const body = {
    area,
    score,
    pillars: scoreByPillars,
  };

  const res = await fetch(addResultsURL(token), {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (data) {
    return true as boolean;
  }
  return false as boolean;
};

export const getSession = async (token: string): Promise<Session> => {
  const res = await fetch(getSessionURL(token));
  const data = await res.json();
  return data as Session;
};
