/* eslint-disable no-shadow */
/* eslint-disable camelcase */
export enum Position {
  Top = "TOP",
  Bottom = "BOTTOM",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum Align {
  Center = "CENTER",
  Left = "LEFT",
  Right = "RIGHT",
}

export enum Size {
  Small = "SMALL",
  Medium = "MEDIUM",
  Large = "LARGE",
  XLarge = "XLARGE",
}

export enum AssessmentStatus {
  start = "start",
  progress = "progress",
}

export enum Area {
  peopleWorkforce = "peopleWorkforce",
  dataTechnology = "dataTechnology",
  governanceRegulatory = "governanceRegulatory",
  designProcesses = "designProcesses",
  partnershipStakeholders = "partnershipStakeholders",
  businessModels = "businessModels",
}

export type AreaTypes = Area | "default";

export enum Level {
  exploring = 1,
  emerging = 2,
  leader = 3,
}

export type Label = { [locale: string]: string };

export interface AnswerDatas {
  visual: string; // path to the image/emoji
  answer: Label;
  score: number;
  tooltip: Label;
}

export enum QuestionTypes {
  image = "image",
  emoji = "emoji",
}

export interface QuestionDatas {
  type: string;
  theme: Label;
  question: Label;
  answers: AnswerDatas[];
}

export interface PillarDatas {
  title: Label;
  question: QuestionDatas[];
  slug: string;
}

export interface AreaDatas {
  slug: string;
  pillars: PillarDatas[];
}

export interface AssessmentDatas {
  area: AreaDatas[];
}

export interface SessionResults {
  area: Area;
  score: number;
  best?: number;
  pillars?: { score: number; slug: string; title: unknown[] }[];
}
export interface Session {
  token?: string;
  country: string;
  group: string;
  role?: string;
  results: SessionResults[];
  date?: Date;
  total?: number;
}

// ADMIN
export interface CountriesData {
  total: number;
  top: { name: string; count: number }[];
}

export interface AdminStatistics {
  total_participants: number;
  best: number;
  worst: number;
  countries: CountriesData;
  topology: { name: string; count: number }[];
  area_average: { slug: string; total: number }[];
  complete_assessment_pourcent: { pourcent: number; number: number };
  uncomplete_assessment_pourcent: { pourcent: number; number: number };
}

export interface AdminAreas {
  title: string;
  slug: string;
  maximum_score: number;
}

// OAUTH
export interface ServiceResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
export interface Auth {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}
