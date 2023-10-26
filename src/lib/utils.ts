import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractCollegeInfo(
  email?: string | null,
): { batchYear: string; departmentCode: string; entryNo: string } | null {
  if (!email) return null;

  const emailPattern = /^(\d{2})([a-z]{3})(\d{3})@smvdu\.ac\.in$/;

  // Check if the email has the domain "smvdu.ac.in"
  if (!email.endsWith("@smvdu.ac.in")) {
    return null;
  }

  // Use the regular expression to extract information
  const match = email.match(emailPattern);

  if (match) {
    const [, batchYear, departmentCode, entryNo] = match;

    if (!batchYear || !departmentCode || !entryNo) return null;

    return {
      batchYear,
      departmentCode,
      entryNo,
    };
  } else {
    return null; // Return null for invalid email formats
  }
}