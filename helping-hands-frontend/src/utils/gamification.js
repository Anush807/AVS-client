// Utility functions for gamification

export const calculateBadge = (points) => {
  if (points >= 600) return "Gold";
  if (points >= 300) return "Silver";
  if (points >= 100) return "Bronze";
  return "None";
};

export const getNextBadgeInfo = (points) => {
  if (points < 100) {
    return {
      nextBadge: "Bronze",
      pointsNeeded: 100 - points,
      progress: (points / 100) * 100,
    };
  } else if (points < 300) {
    return {
      nextBadge: "Silver",
      pointsNeeded: 300 - points,
      progress: (points / 300) * 100,
    };
  } else if (points < 600) {
    return {
      nextBadge: "Gold",
      pointsNeeded: 600 - points,
      progress: (points / 600) * 100,
    };
  } else {
    return {
      nextBadge: "Max Level",
      pointsNeeded: 0,
      progress: 100,
    };
  }
};

export const BADGE_TIERS = {
  Bronze: { points: 100, color: "orange" },
  Silver: { points: 300, color: "gray" },
  Gold: { points: 600, color: "yellow" },
};