import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCollegeInfo(
  email?: string | null,
): { batchYear: string; departmentCode: string; entryNo: string; degree: string } | null {
  if (!email) return null;

  const emailPattern = /^(\d{2})([a-z])([a-z]{2})(\d{3})@smvdu\.ac\.in$/;
  // /^(\d{2})([a-z])([a-z])([a-z]){2}(\d{3})@

  // Check if the email has the domain "smvdu.ac.in"
  if (!email.endsWith("@smvdu.ac.in")) {
    return null;
  }

  // Use the regular expression to extract information
  const match = email.match(emailPattern);

  if (match) {
    const [, batchYear, degree, departmentCode, entryNo] = match;

    if (!batchYear || !degree || !departmentCode || !entryNo) return null;

    return {
      batchYear,
      degree,
      departmentCode,
      entryNo,
    };
  } else {
    return null; // Return null for invalid email formats
  }
}

export const departmentCodeToName: Record<string, string> = {
  "cs": "Computer Science and Engineering",
  "ee": "Electrical Engineering",
  "ec": "Electronics and Communication Engineering",
  "me": "Mechanical Engineering",
  "ce": "Civil Engineering",
  "bt": "Biotechnology",
  "ch": "Chemical Engineering",
}