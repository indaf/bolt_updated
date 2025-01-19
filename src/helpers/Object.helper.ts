export const reassignValueToObjectField = (
  object: any,
  field: string,
  value: any
) => {
  return {
    ...object,
    [field]: value,
  };
};

export const checkRequiredFields = (object: any, fields: Array<string>) => {
  let requiredFields = fields.filter((field) => !object[field]);
  return requiredFields.length === 0;
};

export const preloadImgs = (images: Array<string>) => {
  images.forEach((picture) => {
    const img = new Image();
    img.src = picture;
  });
};

export const retrievePopularCriteriaForExercise = (exercises: Array<any>) => {
  const criteriaCount: { [key: string]: number } = {};

  exercises.forEach((exercise) => {
    const { distance, weapon, bodyPosition, tacticalPosition, trigger } =
      exercise.data;

    if (distance)
      criteriaCount["Distance"] = (criteriaCount["Distance"] || 0) + 1;
    if (weapon) criteriaCount["Arme"] = (criteriaCount["Arme"] || 0) + 1;
    if (bodyPosition)
      criteriaCount["Position"] = (criteriaCount["Position"] || 0) + 1;
    if (tacticalPosition)
      criteriaCount["Gestuelle"] = (criteriaCount["Gestuelle"] || 0) + 1;
    if (trigger)
      criteriaCount["Déclenchement"] =
        (criteriaCount["Déclenchement"] || 0) + 1;
  });

  const popularCriteria = Object.keys(criteriaCount).map((key) => ({
    name: key,
    count: criteriaCount[key],
  }));

  return popularCriteria;
};

export const calculateStatsByInstructor = (results: any, exercices: any) => {
  const instructorStats: Array<{
    id: string;
    firstName: string;
    lastName: string;
    exerciseCount: number;
    uniqueShooterCount?: number;
    avgDifficulty?: number;
    resultCount?: number;
  }> = [];

  exercices.forEach((exercise: any) => {
    const userId = exercise.user.id;
    const firstName = exercise.user.first_name;
    const lastName = exercise.user.last_name;

    let instructor = instructorStats.find(
      (instructor) => instructor.id === userId
    );

    if (!instructor) {
      instructor = {
        id: userId,
        firstName,
        lastName,
        exerciseCount: 0,
        resultCount: 0,
      };
      instructorStats.push(instructor);
    }

    instructor.exerciseCount += 1;
  });

  instructorStats.forEach((instructor) => {
    const exercisesByInstructor = exercices.filter(
      (exercise: any) => exercise.user.id === instructor.id
    );

    const totalDifficulty = exercisesByInstructor.reduce(
      (sum: number, exercise: any) =>
        sum + (exercise.data.difficulty ? exercise.data.difficulty : 1),
      0
    );

    const avgDifficulty =
      exercisesByInstructor.length > 0
        ? totalDifficulty / exercisesByInstructor.length
        : 0;
    instructor.avgDifficulty = avgDifficulty;
  });

  results.forEach((result: any) => {
    const userId = result.instructor.id;
    const instructor = instructorStats.find(
      (instructor) => instructor.id === userId
    );
    if (instructor) {
      instructor.uniqueShooterCount = (instructor.uniqueShooterCount || 0) + 1;
      instructor.resultCount = (instructor.resultCount || 0) + 1;
    }
  });
  return instructorStats;
};

export const calculateStatsAdaptivePerUser = (results: any) => {
  let userStats: Array<any> = [];

  results.forEach((result: any) => {
    if (
      userStats.filter((r: any) => r.user?.id == result.user?.id).length == 0
    ) {
      userStats.push({
        userId: result.user.id,
        name: `${result.user.first_name} ${result.user.last_name}`,
        gamesPlayed: 0,
        totalTime: 0,
        avgAccuracy: 0,
      });
    }
    let index = userStats.findIndex((u: any) => u.userId == result.user.id);
    userStats[index].gamesPlayed += 1;
    userStats[index].totalTime += result.data.duration;
    userStats[index].avgAccuracy += 100 - 25 * result.data.error;
  });

  userStats.forEach((user: any) => {
    user.avgAccuracy = user.avgAccuracy / user.gamesPlayed;
    user.totalTime = user.totalTime / user.gamesPlayed;
  });
  return userStats;
};

export const calculateStatsPerExercice = (results: any) => {
  let exStats: Array<any> = [];

  results.forEach((result: any) => {
    if (
      exStats.filter((r: any) => r.exId == result.data.exercice_id).length == 0
    ) {
      exStats.push({
        exId: result.data.exercice_id,
        name: result.data.name,
        displayed: 0,
      });
    }
    let index = exStats.findIndex(
      (u: any) => u.exId == result.data.exercice_id
    );
    exStats[index].displayed += 1;
  });

  return exStats;
};

export const calculateStatsPerConsigne = (results: any) => {
  let exStats: Array<any> = [];

  results.forEach((result: any) => {
    if (
      exStats.filter(
        (r: any) =>
          r.name ==
          result.data.instruction.target +
            " - " +
            result.data.instruction.direction
      ).length == 0
    ) {
      exStats.push({
        name:
          result.data.instruction.target +
          " - " +
          result.data.instruction.direction,
        displayed: 0,
        target: result.data.instruction.target,
        direction: result.data.instruction.direction,
      });
    }
    let index = exStats.findIndex(
      (u: any) =>
        u.name ==
        result.data.instruction.target +
          " - " +
          result.data.instruction.direction
    );
    console.log(index);
    exStats[index].displayed += 1;
  });

  return exStats;
};

export const calculateStatsTempoPerUser = (results: any) => {
  let userStats: Array<any> = [];

  results.forEach((result: any) => {
    if (
      userStats.filter((r: any) => r.user?.id == result.user?.id).length == 0
    ) {
      userStats.push({
        userId: result.user.id,
        name: `${result.user.first_name} ${result.user.last_name}`,
        gamesPlayed: 0,
        avgAccuracy: 0,
      });
    }
    let index = userStats.findIndex((u: any) => u.userId == result.user.id);
    userStats[index].gamesPlayed += 1;
    userStats[index].avgAccuracy += result.score;
  });

  userStats.forEach((user: any) => {
    user.avgAccuracy =
      user.gamesPlayed > 0 ? user.avgAccuracy / user.gamesPlayed : 0;
  });
  return userStats;
};
