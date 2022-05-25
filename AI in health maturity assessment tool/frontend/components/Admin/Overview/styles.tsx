import styled from "@emotion/styled";
import { brandColor } from "../../../assets/styles/colors";
import { mq } from "../../../assets/styles/mediaqueries";

export const adminOverviewStyle = {
  marginTop: 50,
  maginBottom: 67,

  [mq[1]]: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "150px repeat(3, 200px) 1fr",
    columnGap: 48,
    rowGap: 48,
    marginTop: 70,
  },
  [mq[3]]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "150px repeat(2, 200px) repeat(2, 1fr)",
    marginTop: 90,
  },
};
export const adminOverviewTitleStyle = {
  fontSize: 30,
  fontWeight: 900,

  [mq[1]]: {
    fontSize: 40,

    gridColumn: "1 / 4",
    gridRow: "1 / 2",
    margin: 0,
  },
  [mq[2]]: {
    width: 900,
    fontSize: 48,
  },
};
export const adminOverviewBestWorstStyle = {
  gridColumn: "1/2",
  gridRow: "3/4",

  [mq[1]]: {
    display: "flex",
  },

  "& > div": {
    marginRight: 20,
    width: "100%",

    "&:last-child": {
      margin: 0,
    },
  },
};

// All components that move with the filter country
interface IStyledCountries {
  country: string;
}
export const StyledAdminOverviewUncomplete = styled.div<IStyledCountries>(
  ({ country }) => ({
    gridColumn: "2/3",
    gridRow: country.length > 0 ? " 3/4" : "4/5",

    [mq[3]]: {
      gridColumn: "2/3",
      gridRow: "3/4",
    },
  })
);
export const StyledAdminOverviewComplete = styled.div<IStyledCountries>(
  ({ country }) => ({
    gridColumn: country.length > 0 ? "2/3" : "1/2",
    gridRow: country.length > 0 ? "2/3" : "4/5",

    [mq[3]]: {
      gridColumn: "2/3",
      gridRow: "2/3",
    },
  })
);
export const adminOverviewNumberPeopleStyle = {
  color: brandColor,
  margin: "0 10px",
};
export const StyledTopCountries = styled.div<IStyledCountries>(
  ({ country }) => ({
    gridColumn: "2/3",
    gridRow: "2/4",
    opacity: country.length > 0 ? 0 : 1,
    transition: "opacity .3s ease-out",

    [mq[3]]: {
      gridColumn: "3/4",
      gridRow: "2/5",
    },
  })
);
export const StyledAdminOverviewChart = styled.div<IStyledCountries>(
  ({ country }) => ({
    gridColumn: "1/3",
    gridRow: country.length > 0 ? "4/6" : "5/7",

    [mq[3]]: {
      gridColumn: country.length > 0 ? "3/4" : "1/3",
      gridRow: country.length > 0 ? "2/5" : "4/6",
    },
  })
);
