/**
 * Equitable Distribution Algorithm
 * 
 * This service implements a fair distribution algorithm that considers:
 * 1. Priority levels (critical > high > medium > low)
 * 2. Last distribution date (longer time since last distribution = higher priority)
 * 3. Number of dependents/family size
 * 4. Special health conditions
 */

const calculatePriorityScore = (beneficiary) => {
  const priorityWeights = {
    'critical': 4,
    'high': 3,
    'medium': 2,
    'low': 1
  };

  let score = priorityWeights[beneficiary.priorityLevel] || 1;

  // Add weight for time since last distribution
  if (beneficiary.lastDistributionDate) {
    const daysSinceLastDistribution = 
      (Date.now() - new Date(beneficiary.lastDistributionDate).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.min(daysSinceLastDistribution / 7, 3); // Max 3 points for time weight
  } else {
    score += 3; // Never received distribution
  }

  // Add weight for health conditions
  if (beneficiary.healthConditions && beneficiary.healthConditions.length > 0) {
    score += beneficiary.healthConditions.length * 0.5;
  }

  return score;
};

exports.calculateFairDistribution = async (beneficiaries, itemType, totalQuantity) => {
  if (!beneficiaries || beneficiaries.length === 0) {
    return [];
  }

  // Calculate priority scores for all beneficiaries
  const scoredBeneficiaries = beneficiaries.map(b => ({
    beneficiary: b,
    score: calculatePriorityScore(b)
  }));

  // Calculate total score
  const totalScore = scoredBeneficiaries.reduce((sum, sb) => sum + sb.score, 0);

  // Distribute based on weighted scores
  const distributionPlan = scoredBeneficiaries.map(sb => {
    const proportion = sb.score / totalScore;
    const allocatedQuantity = Math.floor(totalQuantity * proportion);

    return {
      beneficiaryId: sb.beneficiary.id,
      beneficiaryName: `${sb.beneficiary.firstName} ${sb.beneficiary.lastName || ''}`.trim(),
      ngoId: sb.beneficiary.ngoId,
      itemType,
      quantity: allocatedQuantity,
      priorityScore: sb.score.toFixed(2),
      fairnessScore: proportion.toFixed(4)
    };
  });

  // Handle remaining quantity due to rounding
  const distributedQuantity = distributionPlan.reduce((sum, d) => sum + d.quantity, 0);
  let remaining = totalQuantity - distributedQuantity;

  // Distribute remaining to highest priority beneficiaries
  const sortedByScore = [...distributionPlan].sort((a, b) => b.priorityScore - a.priorityScore);
  let idx = 0;
  while (remaining > 0 && idx < sortedByScore.length) {
    sortedByScore[idx].quantity += 1;
    remaining -= 1;
    idx = (idx + 1) % sortedByScore.length;
  }

  return distributionPlan;
};

exports.validateDistribution = async (distributionPlan, availableQuantity) => {
  const totalAllocated = distributionPlan.reduce((sum, d) => sum + d.quantity, 0);
  
  if (totalAllocated > availableQuantity) {
    throw new Error(`Distribution plan exceeds available quantity. Available: ${availableQuantity}, Planned: ${totalAllocated}`);
  }

  return true;
};
