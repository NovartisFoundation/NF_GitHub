import styled from "@emotion/styled";

import { mq } from "../../assets/styles/mediaqueries";

const size = {
  default: [
    { width: 125, height: 20 },
    { width: 150, height: 23 },
    { width: 200, height: 23 },
    { width: 200, height: 23 },
  ],
  login: [
    { width: 150, height: 17.5 },
    { width: 200, height: 23 },
    { width: 250, height: 30 },
    { width: 300, height: 35 },
  ],
};

interface IStyledlogo {
  context: string;
}

const Styledlogo = styled.img<IStyledlogo>(({ context }) => {
  const isContextLogin = context === "login";

  return {
    display: "block",
    width: size[context][0].width,
    height: size[context][0].height,
    margin: isContextLogin && "20px auto 60px",

    [mq[1]]: {
      width: size[context][1].width,
      height: size[context][1].height,
      margin: isContextLogin && "50px auto",
    },

    [mq[2]]: {
      width: size[context][2].width,
      height: size[context][2].height,
      margin: isContextLogin && "60px auto",
    },

    [mq[3]]: {
      width: size[context][3].width,
      height: size[context][3].height,
      margin: isContextLogin && "70px auto",
    },
  };
});

export default Styledlogo;
