export const calculateChartDataForExercise = (exercise: any) => {
  let dailyStats: Array<any> = [];
  exercise.forEach((ex: any) => {
    let currDate = new Date(ex.timestamp).toLocaleDateString();
    if (dailyStats.filter((stat: any) => stat.date == currDate).length > 0) {
      let index = dailyStats.findIndex((stat: any) => stat.date == currDate);
      dailyStats[index].exercises += 1;
      dailyStats[index].difficulty += ex.data.difficulty
        ? ex.data.difficulty
        : 1;
      dailyStats[index].avgTime += ex.data.referenceTime
        ? +ex.data.referenceTime
        : 5;
    } else {
      dailyStats.push({
        date: currDate,
        exercises: 1,
        difficulty: ex.data.difficulty ? ex.data.difficulty : 1,
        avgTime: ex.data.referenceTime ? +ex.data.referenceTime : 5,
      });
    }
  });
  dailyStats = dailyStats.map((stat: any) => {
    stat.difficulty = stat.difficulty / stat.exercises;
    stat.avgTime = stat.avgTime / stat.exercises;
    return stat;
  });
  return dailyStats;
};

export const calculateChartDataForAdaptive = (results: any) => {
  let dailyStats: Array<any> = [];
  results.forEach((ex: any) => {
    let currDate = new Date(ex.date).toLocaleDateString();
    if (dailyStats.filter((stat: any) => stat.date == currDate).length > 0) {
      let index = dailyStats.findIndex((stat: any) => stat.date == currDate);
      dailyStats[index].games += 1;
      dailyStats[index].accuracy +=
        ex.data.error != undefined ? 100 - 25 * ex.data.error : 0;
      dailyStats[index].avgTime += ex.data.duration ? +ex.data.duration : 0;
    } else {
      dailyStats.push({
        date: currDate,
        games: 1,
        accuracy: ex.data.error != undefined ? 100 - 25 * ex.data.error : 0,
        avgTime: ex.data.duration ? +ex.data.duration : 0,
      });
    }
  });
  dailyStats = dailyStats.map((stat: any) => {
    stat.accuracy = stat.accuracy / stat.games;
    stat.avgTime = stat.avgTime / stat.games;
    return stat;
  });
  return dailyStats;
};

export const calculateChartDataForConsignes = (results: any) => {
  let dailyStats: Array<any> = [];
  results.forEach((ex: any) => {
    let currDate = new Date(ex.date).toLocaleDateString();
    if (dailyStats.filter((stat: any) => stat.date == currDate).length > 0) {
      let index = dailyStats.findIndex((stat: any) => stat.date == currDate);
      dailyStats[index].games += 1;
    } else {
      dailyStats.push({
        date: currDate,
        games: 1,
      });
    }
  });
  return dailyStats;
};

export const calculateChartDataForTempo = (results: any) => {
  let dailyStats: Array<any> = [];
  results.forEach((ex: any) => {
    let currDate = new Date(ex.date).toLocaleDateString();
    if (dailyStats.filter((stat: any) => stat.date == currDate).length > 0) {
      let index = dailyStats.findIndex((stat: any) => stat.date == currDate);
      dailyStats[index].games += 1;
      dailyStats[index].accuracy += ex.score;
    } else {
      dailyStats.push({
        date: currDate,
        games: 1,
        accuracy: ex.score,
      });
    }
  });
  dailyStats = dailyStats.map((stat: any) => {
    stat.accuracy = (stat.accuracy / stat.games).toFixed(2);
    return stat;
  });
  return dailyStats;
};

export const calculateChartForShootNoShoot = (results: any) => {
  let dailyStats: Array<any> = [];
  results.forEach((ex: any) => {
    let currDate = new Date(ex.date).toLocaleDateString();
    if (dailyStats.filter((stat: any) => stat.date == currDate).length > 0) {
      let index = dailyStats.findIndex((stat: any) => stat.date == currDate);
      dailyStats[index].sessions += 1;
      dailyStats[index].accuracy += ex.score;
      dailyStats[index].reactionTime += ex.data.averageReactionTime;
    } else {
      dailyStats.push({
        date: currDate,
        sessions: 1,
        accuracy: ex.score,
        reactionTime: ex.data.averageReactionTime,
      });
    }
  });
  dailyStats = dailyStats.map((stat: any) => {
    stat.accuracy = (stat.accuracy / stat.sessions).toFixed(2);
    stat.reactionTime = (stat.reactionTime / stat.sessions).toFixed(2);
    return stat;
  });
  return dailyStats;
};
