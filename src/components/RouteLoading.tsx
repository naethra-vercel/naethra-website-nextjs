import Loader from "@/components/Loader";

/** Full-page wait state for WordPress / API-backed routes. */
export function RouteLoading({
  title = "Loading...",
  subtitle = "Please wait while we prepare this page",
}: {
  title?: string;
  subtitle?: string;
} = {}) {
  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-background">
      <Loader title={title} subtitle={subtitle} size="md" />
    </div>
  );
}
