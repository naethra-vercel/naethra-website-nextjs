import awsHeroImage from "@/assets/aws/hero.png";
import cmsHeroImage from "@/assets/cms/hero.png";
import customWebPublishHeroImage from "@/assets/custom-web-publish/hero.png";
import dotNetHeroImage from "@/assets/dot-net/hero.png";
import filemakerHeroImage from "@/assets/filemaker/hero.png";
import filemakerServicesImage from "@/assets/filemaker/services.png";

/** Local hero assets for service detail pages only — keep out of wordpress.ts so home does not pay for them. */
export const serviceHeroImages = {
  aws: awsHeroImage,
  cms: cmsHeroImage,
  customWebPublish: customWebPublishHeroImage,
  dotNet: dotNetHeroImage,
  filemaker: filemakerHeroImage,
  filemakerServices: filemakerServicesImage,
} as const;
