const { google } = require("googleapis");
const fs = require("fs");

const credentials = {
  installed: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uris: [process.env.REDIRECT_URI],
  },
};

const tokens = {
  refresh_token: process.env.REFRESH_TOKEN,
};

const oauth2Client = new google.auth.OAuth2(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0]
);

const updateVideo = async () => {
  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const result = await youtube.videos.list({
      id: "ebAAYj7HWWY", // <-- ID
      part: "statistics,snippet",
    });

    if (result.data.items.length > 0) {
      const stats = result.data.items[0].statistics;

      await youtube.videos.update({
        part: "snippet",
        requestBody: {
          id: "ebAAYj7HWWY", // <-- ID
          snippet: {
            title: `This video has ${stats.viewCount} views`,
            categoryId: 28,
          },
        },
      });
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

updateVideo();
