const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
const updateVideo = async () => {

  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const result = await youtube.videos.list({
      id: "pg_vngerTiU",
      part: "statistics,snippet",
    });

    if (result.data.items.length > 0) {
      const stats = result.data.items[0].statistics;

      const newTitle = `Este video tiene ${stats.viewCount} vistas, ¿cómo lo sé?`;

      const currentTitle = result.data.items[0].snippet.title;

      if (currentTitle === newTitle) {
        return;
      }

      await youtube.videos.update({
        part: "snippet",
        requestBody: {
          id: "pg_vngerTiU",
          snippet: {
            title: newTitle,
            description: snippet.description,
            categoryId: 28,
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

updateVideo();
