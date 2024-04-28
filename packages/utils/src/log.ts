const log = async (message: string) => {
  if (
    process.env.NODE_ENV === "development" ||
    !process.env.DUB_SLACK_HOOK_CRON ||
    !process.env.DUB_SLACK_HOOK_LINKS
  )
    console.log(message);
  /* Log a message to the console */
};
export default log;
