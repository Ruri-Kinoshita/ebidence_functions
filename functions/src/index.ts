import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import * as functions from "firebase-functions";

// 講師用OGP
export const createOgp = functions.https.onRequest(async (req, res) => {
  const path = req.path.split("/")[1];
  console.log(path);

  let title: string;
  let description: string;

  // switch文
  switch (path) {
    case "question_zoom":
      title = "質問zoom";
      description =
        "決まった時間にzoomを繋いで順番に技術的質問ができます。\n・Flutter修行プランの人は参加自由\n・アーカイブはアプリに上がります";
      break;
    case "spatial_cushion":
      title = "雑談SpatialChat";
      description =
        "誰でも参加自由\nSpatialChatというツールを使って交流しましょう！";
      break;
    case "study_meeting":
      title = "共同勉強会zoom";
      description = "誰でも参加自由\n・アーカイブはアプリに上がります";
      break;
    default:
      title = "Flutter大学webアプリ";
      description = "Flutter大学公式のwebアプリです。";
      break;
  }
  console.log("title is", title);

  try {
    res.set("Cache-Control", "public, max-age=600, s-maxage=600");
    const html = createHtml(path, title, description);
    res.status(200).send(html);
  } catch (error) {
    res.status(404).send("404 Not Found");
  }
});
const createHtml = (path: string, title: string, description: string) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Flutter大学</title>
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Flutter大学">
    <meta name="twitter:site" content="${title}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
  </head>
  <body>
    <script type="text/javascript">window.location="/${path}_";</script>
  </body>
</html>
`;
};
