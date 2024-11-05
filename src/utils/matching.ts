import { distance } from 'fastest-levenshtein';

export function getMatchScore(str1: string, str2: string): number {
  const a = str1.toLowerCase().trim();
  const b = str2.toLowerCase().trim();
  
  // Exact match
  if (a === b) return 100;
  
  // Handle empty strings
  if (!a || !b) return 0;
  
  const maxLength = Math.max(a.length, b.length);
  const levenshteinDistance = distance(a, b);
  
  // Calculate similarity percentage
  const similarity = Math.max(0, 100 * (1 - levenshteinDistance / maxLength));
  
  // Boost score for partial matches
  if (b.includes(a) || a.includes(b)) {
    return Math.min(100, similarity + 15);
  }
  
  // Boost score for matching first characters
  if (a[0] === b[0]) {
    return Math.min(100, similarity + 5);
  }
  
  return similarity;
}