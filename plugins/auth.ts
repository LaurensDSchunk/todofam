export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuth();

  nuxtApp.hook("page:finish", async () => {
    //await auth.getUser();
  });
});
