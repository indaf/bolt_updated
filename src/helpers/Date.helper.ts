export const generateTimeFilter = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const previousYear = currentYear - 1;
  const lastSixMonths = [];
  const monthNames = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    lastSixMonths.push({
      label: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
      value: `${monthNames[date.getMonth()]} ${date.getFullYear()}`,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
  }

  const timeFilters = [
    { label: "Depuis le début", value: "all", year: null, month: null },
    {
      label: `Année en cours (${currentYear})`,
      value: `${currentYear}`,
      year: currentYear,
      month: null,
    },
    {
      label: `Année précédente (${previousYear})`,
      value: `${previousYear}`,
      year: previousYear,
      month: null,
    },
    ...lastSixMonths,
  ];

  return timeFilters;
};
