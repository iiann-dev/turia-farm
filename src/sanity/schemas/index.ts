import { homePage, heroSection, statsStrip, featuredSeedlings, processTeaser, knowledgeSpotlight, homeSeo } from "./homePage";
import { seedling } from "./seedling";
import { article } from "./article";
import { processStep } from "./processStep";
import { catalogPage } from "./catalogPage";
import { siteConfig } from "./siteConfig";

export const schemaTypes = [
  homePage,
  heroSection,
  statsStrip,
  featuredSeedlings,
  processTeaser,
  knowledgeSpotlight,
  homeSeo,
  seedling,
  article,
  processStep,
  catalogPage,
  siteConfig,
];