import { withImageProxy } from "@blazity/next-image-proxy";

export default withImageProxy({
  // whitelisting all https:// images
  whitelistedPatterns: [/^https:\/\//],
  fallbackUrl: "/images/broken.png",
});
