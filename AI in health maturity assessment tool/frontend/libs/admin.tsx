import fetch from "isomorphic-unfetch";
import { getNumberWithOneDecimal } from "../config/admin";
import { AdminAreas, AdminStatistics, Area, Session } from "../utils/types";

let baseRoot = process.env.API_URL;

if (process.env.API_URL_STAGING) {
  baseRoot = process.env.API_URL_STAGING;
}

const statsURL = (country) =>
  `${baseRoot}/api/dashboard/stats?country=${country}`;
const sessionsURL = `${baseRoot}/api/dashboard/sessions`;

const addDefaultValueResultsArray = (array, areas) => {
  const basicArray = [
    {
      area: Area.peopleWorkforce,
      score: 0,
    },
    {
      area: Area.dataTechnology,
      score: 0,
    },
    {
      area: Area.governanceRegulatory,
      score: 0,
    },
    {
      area: Area.designProcesses,
      score: 0,
    },
    {
      area: Area.partnershipStakeholders,
      score: 0,
    },
    {
      area: Area.businessModels,
      score: 0,
    },
  ];

  return basicArray.map(({ area, score }) => {
    const oldArrayItem = array.find((x) => x.area === area);
    if (oldArrayItem) {
      return {
        area,
        score: getNumberWithOneDecimal(
          (oldArrayItem.score * 10) /
            areas.find(({ slug }) => slug === oldArrayItem.area).maximum_score
        ),
      };
    }
    return {
      area,
      score,
    };
  });
};

export const fetchStats = async (
  token: string,
  country = ""
): Promise<AdminStatistics> => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(statsURL(country), { headers });
  const data = await res.json();
  return data as AdminStatistics;
};

export const fetchSessions = async (
  token: string
): Promise<{
  areas: AdminAreas[];
  rows: Session[];
}> => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(sessionsURL, { headers });
  const data = await res.json();

  const globalMaxScore = data.areas.reduce(
    // Multiply by 1 to indicates that these are numbers, not strings
    (accumulator, currentValue) => accumulator + currentValue.maximum_score * 1,
    0
  );

  // Add total prop
  data.rows = data.rows.map(({ country, group, results, date, role }) => {
    const resultsArray = addDefaultValueResultsArray(results, data.areas);

    return {
      country,
      group,
      role,
      results: resultsArray,
      date,
      total: getNumberWithOneDecimal(
        resultsArray.reduce(
          // Multiply by 1 to indicates that these are numbers, not strings
          (accumulator, currentValue) => accumulator + currentValue.score * 1,
          0
        )
      ),
    };
  });

  return data as {
    areas: AdminAreas[];
    rows: Session[];
  };
};
