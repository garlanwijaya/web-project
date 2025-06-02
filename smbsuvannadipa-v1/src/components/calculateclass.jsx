// src/components/calculateClass.js
export default function calculateClass(age) {
  if (isNaN(age)) return "";
  if (age >= 5 && age <= 8) return "A";
  if (age >= 9 && age <= 11) return "B";
  if (age >= 12 && age <= 14) return "C";
  if (age >= 15) return "D";
  return "";
}
