import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";

interface IStyledColumns {
  columns: number[];
}

const StyledColumns = styled.div<IStyledColumns>(({ columns }) => {
  const columnsWidth = columns.map((column, index) => ({
    [`>:nth-of-type(${index + 1})`]: {
      width: "100%",

      [mq[1]]: {
        flex: column,
        marginLeft: 15,
        marginRight: 15,
      },

      [mq[2]]: {
        marginLeft: 30,
        marginRight: 30,
      },
    },
  }));

  const styles = {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column" as const,

    [mq[1]]: {
      marginLeft: -15,
      marginRight: -15,
      width: "calc(100% + 30px)",
      flexDirection: "row" as const,
    },

    [mq[2]]: {
      marginLeft: -30,
      marginRight: -30,
      width: "calc(100% + 60px)",
    },
  };

  return Object.assign(styles, ...columnsWidth);
});

export default StyledColumns;
