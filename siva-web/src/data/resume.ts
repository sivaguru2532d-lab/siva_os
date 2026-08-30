export interface ResumeData {
  fileUrl: string | null;
  fileName: string | null;
  lastUpdated: string | null;
}

// Set these fields only after a real PDF is uploaded to your public storage or backend.
// Upload, replace, and delete operations should be exposed only through authenticated tooling.
export const resumeData: ResumeData = {
  fileUrl: null,
  fileName: null,
  lastUpdated: null,
};
