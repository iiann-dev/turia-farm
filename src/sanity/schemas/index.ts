import { homePage, heroSection, statsStrip, featuredSeedlings, processTeaser, knowledgeSpotlight, homeSeo } from "./homePage";
import { seedling } from "./seedling";
import { article } from "./article";
import { processStep } from "./processStep";
import { catalogPage } from "./catalogPage";
import { siteConfig } from "./siteConfig";
import { processPage } from "./processPage";
import { guidePage } from "./guidePage";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";
import { footer } from "./footer";

export const schemaTypes = [
  homePage,
  catalogPage,
  processPage,
  guidePage,
  aboutPage,
  contactPage,
  footer,
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