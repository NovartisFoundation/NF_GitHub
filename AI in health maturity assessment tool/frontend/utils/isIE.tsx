const isIE = (): boolean => {
  if (typeof window !== "undefined") {
    const ua = navigator.userAgent;

    /* MSIE used to detect old browsers and Trident used to newer ones */
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  }
  return false;
};

export default isIE;
