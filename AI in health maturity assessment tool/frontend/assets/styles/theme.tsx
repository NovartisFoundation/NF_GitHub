import "@emotion/react";
import {
  defaultTextColor,
  areaPeopleWorkforceColor,
  areaDataTechnologyColor,
  areaGovernanceRegulatoryColor,
  areaDesignProcessesColor,
  areaPartnershipStakeholdersColor,
  areaBusinessModelsColor,
} from "./colors";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      primary: string;
    };
  }
}

const theme = {
  default: {
    colors: {
      primary: defaultTextColor,
    },
  },
  peopleWorkforce: {
    colors: {
      primary: areaPeopleWorkforceColor,
    },
  },
  dataTechnology: {
    colors: {
      primary: areaDataTechnologyColor,
    },
  },
  governanceRegulatory: {
    colors: {
      primary: areaGovernanceRegulatoryColor,
    },
  },
  designProcesses: {
    colors: {
      primary: areaDesignProcessesColor,
    },
  },
  partnershipStakeholders: {
    colors: {
      primary: areaPartnershipStakeholdersColor,
    },
  },
  businessModels: {
    colors: {
      primary: areaBusinessModelsColor,
    },
  },
};

export default theme;
