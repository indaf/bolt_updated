import API from "../index.service";

export const getGameScores = (game: string) => {
  return API.get("/gamescore/" + game);
};

export const getGameScoresForUser = (game: string, type: string = "recent") => {
  return API.get("/gamescore/" + game + "/top/user?type=" + type);
};

export const getTopGameScoresOfMonth = (game: string, timeRange: any) => {
  let query = "";
  if (timeRange != undefined && timeRange.year != null) {
    query = "?year=" + timeRange.year;
    if (timeRange.month != null) {
      query += "&month=" + timeRange.month;
    }
  }
  return API.get("/gamescore/" + game + "/top" + query);
};

export const createGameScore = (data: any) => {
  return API.post("/gamescore/", data);
};
