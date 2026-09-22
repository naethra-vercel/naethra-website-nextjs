import { JarvisAIAssistantNew } from "./JarvisAIAssistantNew";

// Redirect to JarvisAIAssistantNew while keeping JarvisAIAssistantBackup available for backup reference
export function JarvisAIAssistant() {
  return <JarvisAIAssistantNew />;
}
