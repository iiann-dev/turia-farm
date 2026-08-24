import { homePage, heroSection, statsStrip, featuredSeedlings, processTeaser, knowledgeSpotlight, homeSeo } from "./homePage";
import { seedling } from "./seedling";
import { article } from "./article";
import { processStep } from "./processStep";
import { catalogPage } from "./catalogPage";
import { siteConfig } from "./siteConfig";
import { processPage } from "./processPage";
import { guidePage } from "./guidePage";

export const schemaTypes = [
  homePage,
  catalogPage,
  processPage,
  guidePage,
  siteConfig,
  seedling,
  article,
  processStep,
  heroSection,
  statsStrip,
  featuredSeedlings,
  processTeaser,
  knowledgeSpotlight,
  homeSeo,
];