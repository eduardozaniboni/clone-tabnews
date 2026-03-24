import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      minTimeout: 0,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch(`${process.env.APP_URL}/api/v1/status`);

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

export default {
  waitForAllServices,
};
