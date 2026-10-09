"use server";

import { unlockDownload } from "@/lib/downloads";

export async function unlockDownloadAction(packageId: number, password: string) {
  return unlockDownload(packageId, password);
}
