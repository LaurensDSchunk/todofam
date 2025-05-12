export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  const path = to.path;

  const unauthPaths = ["/", "/auth/sign-in", "/auth/sign-up", "/auth/verify"];

  const user = await useAuth().getUser();

  if (user && unauthPaths.includes(path)) {
    return navigateTo("/dashboard");
  }

  if (!user && !unauthPaths.includes(path)) {
    return navigateTo("/auth/sign-in");
  }
});
