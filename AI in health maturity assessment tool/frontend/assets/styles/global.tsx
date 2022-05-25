import { Global } from "@emotion/react";

import brandFont from "./fonts";
import { mq } from "./mediaqueries";
import {
  grey,
  brandColor,
  defaultTextColor,
  bodyBackgroundColor,
} from "./colors";

export const layoutMaxWidth = 1400;
export const layoutSmallWidth = 600;

const globalStyles = (
  <Global
    styles={{
      "*": {
        boxSizing: "border-box",
      },

      "html, body": {
        margin: 0,
        padding: 0,
      },

      body: {
        fontSize: 12,
        fontWeight: 300,
        height: "100vh",
        fontFamily: brandFont,
        background: bodyBackgroundColor,

        [mq[1]]: {
          fontSize: 13,
        },

        [mq[2]]: {
          fontSize: 14,
        },

        [mq[3]]: {
          fontSize: 15,
        },
      },

      "#__next": {
        display: "flex",
        minHeight: "100%",
        flexDirection: "column",
        justifyContent: "center",
      },

      main: {
        flex: 1,
        width: "100%",
        paddingTop: 15,
        display: "flex",
        paddingBottom: 15,
        alignSelf: "center",
        color: defaultTextColor,

        [mq[2]]: {
          paddingTop: 30,
          paddingBottom: 30,
        },
      },

      p: {
        marginTop: 0,
        lineHeight: "1.5em",
      },

      ul: {
        padding: 0,
        paddingBottom: 15,
        lineHeight: "1.5em",
      },

      li: {
        listStyle: "none",
      },

      button: {
        border: 0,
        fontSize: "inherit",
        fontFamily: "inherit",
        backgroundColor: "transparent",

        "&:focus": {
          outline: 0,
        },
      },

      img: {
        maxWidth: "100%",
        objectFit: "contain",
      },

      a: {
        fontWeight: 500,
        color: brandColor,
        textDecoration: "none",
      },

      "input[type='text'], input[type='email'], input[type='password']": {
        padding: 15,
        width: "100%",
        borderRadius: 5,
        fontSize: "inherit",
        fontFamily: brandFont,
        color: defaultTextColor,
        backgroundColor: "white",
        border: `1px solid ${grey}`,

        "&:focus": {
          outlineColor: brandColor,
        },
      },

      hr: {
        height: 1,
        border: 0,
        width: "100%",
        backgroundColor: grey,
      },

      h1: {
        fontSize: 35,
        paddingTop: 30,
        fontWeight: 700,
        letterSpacing: 2,

        [mq[1]]: {
          fontSize: 40,
        },

        [mq[2]]: {
          fontSize: 45,
          paddingTop: 50,
        },

        [mq[3]]: {
          fontSize: 50,
        },
      },

      h2: {
        fontSize: 20,
        marginTop: 0,
        fontWeight: 300,
        lineHeight: "1.3em",

        [mq[1]]: {
          fontSize: 25,
        },

        [mq[2]]: {
          fontSize: 30,
        },

        [mq[3]]: {
          fontSize: 35,
        },
      },

      h3: {
        fontSize: 18,
        marginTop: 0,
        fontWeight: 700,
        marginBottom: 10,
        lineHeight: "1.3em",

        [mq[1]]: {
          fontSize: 20,
        },

        [mq[2]]: {
          fontSize: 25,
        },

        [mq[3]]: {
          fontSize: 30,
        },
      },

      h4: {
        fontSize: 16,
        marginTop: 0,
        fontWeight: 700,
        marginBottom: 10,
        lineHeight: "1.3em",

        [mq[1]]: {
          fontSize: 18,
        },

        [mq[2]]: {
          fontSize: 20,
        },

        [mq[3]]: {
          fontSize: 25,
        },
      },

      h5: {
        fontSize: 15,
        marginTop: 0,
        fontWeight: 700,
        lineHeight: "1.3em",

        [mq[1]]: {
          fontSize: 16,
        },

        [mq[2]]: {
          fontSize: 18,
        },

        [mq[3]]: {
          fontSize: 20,
        },
      },
    }}
  />
);

export default globalStyles;
