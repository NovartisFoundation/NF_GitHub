import { Area, AreaDatas, AreaTypes } from "./types";

export interface IUserData {
  name: string;
  role: string;
  country: string;
  group: string;
  activeArea?: Area;
  areasCompleted?: Area[];
  activeAssessment?: number[][];
  token: string;
}
export interface IAuthData {
  accessToken: string;
  refreshToken: string;
}

export const getUserDataFromLocalStorage = ():
  | IUserData
  | Record<string, never> => {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem("novartisAssessment"));
};

// ASSESSMENT
export const addUserDataOnLocalStorage = (data: IUserData): void => {
  if (typeof window !== "undefined")
    localStorage.setItem("novartisAssessment", JSON.stringify(data));
};

export const addActiveAreaOnLocalStorage = (activeArea: AreaTypes): void => {
  const userData = getUserDataFromLocalStorage();

  const data = {
    ...userData,
    activeArea,
  };

  if (typeof window !== "undefined")
    localStorage.setItem("novartisAssessment", JSON.stringify(data));
};

export const addAreaCompletedOnLocalStorage = (
  areaCompleted: AreaTypes
): void => {
  const userData = getUserDataFromLocalStorage();
  const { areasCompleted } = userData;

  const data = {
    ...userData,
    areasCompleted: areasCompleted
      ? [...areasCompleted, areaCompleted]
      : [areaCompleted],
  };

  if (typeof window !== "undefined")
    localStorage.setItem("novartisAssessment", JSON.stringify(data));
};

export const addActiveAssessmentOnLocalStorage = (
  assessment: AreaDatas
): void => {
  const userData = getUserDataFromLocalStorage();
  const { pillars } = assessment;

  const data = {
    ...userData,
    activeAssessment: pillars.map(({ question }) =>
      Array.from({ length: question.length })
    ),
  };

  if (typeof window !== "undefined")
    localStorage.setItem("novartisAssessment", JSON.stringify(data));
};

export const addAnswerOnLocalStorage = (
  pillar: number,
  question: number,
  answer: number
): void => {
  const userData = getUserDataFromLocalStorage();
  const { activeAssessment } = userData;

  activeAssessment[pillar][question] = answer;

  const data = {
    ...userData,
    activeAssessment,
  };

  if (typeof window !== "undefined")
    localStorage.setItem("novartisAssessment", JSON.stringify(data));
};

export const getNameFromLocalStorage = (): string => {
  if (typeof window === "undefined") return "";
  return JSON.parse(localStorage.getItem("novartisAssessment"))?.name;
};

export const getGroupFromLocalStorage = (): string => {
  if (typeof window === "undefined") return "";
  return JSON.parse(localStorage.getItem("novartisAssessment")).group;
};

export const getActiveAreaFromLocalStorage = (): AreaTypes => {
  if (typeof window === "undefined") return "default";
  return JSON.parse(localStorage.getItem("novartisAssessment"))?.activeArea;
};

export const getAreasCompletedFromLocalStorage = (): Area[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("novartisAssessment"))?.areasCompleted;
};

export const getTokenFromLocalStorage = (): string => {
  if (typeof window === "undefined") return "";
  return JSON.parse(localStorage.getItem("novartisAssessment"))?.token;
};

export const getAnswerFromLocalStorage = (
  pillar: number,
  question: number
): number => {
  const userData = getUserDataFromLocalStorage();
  const { activeAssessment } = userData;

  if (!activeAssessment || activeAssessment.length < 1) return null;
  return activeAssessment[pillar][question];
};

export const getArrayActiveAssessmentOnLocalStorage = (): number[][] => {
  const userData = getUserDataFromLocalStorage();
  const { activeAssessment } = userData;

  if (typeof window === "undefined") return [[]];

  return activeAssessment;
};

export const getActiveAssessmentOnLocalStorage = (): number => {
  const userData = getUserDataFromLocalStorage();
  const { activeAssessment } = userData;

  if (typeof window === "undefined") return 0;

  return activeAssessment
    .map((pillar) =>
      pillar.reduce(
        // Multiply by 1 to indicates that these are numbers, not strings
        (accumulator, currentValue) => accumulator + currentValue * 1,
        0
      )
    )
    .reduce((accumulator, currentValue) => accumulator + currentValue * 1, 0);
};

export const resetActiveAssessmentOnLocalStorage = (): void => {
  const userData = getUserDataFromLocalStorage();

  const data = {
    ...userData,
    activeAssessment: [],
  };

  if (typeof window !== "undefined")
    localStorage.setItem("novartisAssessment", JSON.stringify(data));
};

export const replaceUserDataOnLocalStorage = (newData: IUserData): void => {
  // If external user ; the new local storage is not empty
  // so replace the current local storage with this new local storage
  if (
    newData && // 👈 null and undefined check
    Object.keys(newData).length !== 0 &&
    newData.constructor === Object &&
    newData.token !== getTokenFromLocalStorage()
  ) {
    addUserDataOnLocalStorage(newData);
  }

  if (newData && newData.areasCompleted) {
    const userData = getUserDataFromLocalStorage();
    if (userData && userData.areasCompleted) {
      if (newData.areasCompleted.length > userData.areasCompleted.length) {
        addUserDataOnLocalStorage(newData);
      }
    }
  }
};

// AUTH
export const addAuthDataOnLocalStorage = (data: IAuthData): void => {
  if (typeof window !== "undefined")
    localStorage.setItem("novartisAuth", JSON.stringify(data));
};
export const getAccessTokenFromLocalStorage = (): string => {
  if (typeof window === "undefined") return "";
  return JSON.parse(localStorage.getItem("novartisAuth"))?.accessToken;
};
export const getRefreshTokenFromLocalStorage = (): string => {
  if (typeof window === "undefined") return "";
  return JSON.parse(localStorage.getItem("novartisAuth"))?.refreshToken;
};
