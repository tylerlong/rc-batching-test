import RingCentral from "@rc-ex/core";
import WSExtension from "@rc-ex/ws";

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({ jwt: process.env.RINGCENTRAL_JWT_TOKEN! });
  const wsExtension = new WSExtension({
    restOverWebSocket: true,
    debugMode: true,
  });
  await rc.installExtension(wsExtension);
  const r = await rc.restapi().account().extension(process.env.EXTENSION_IDS)
    .presence().get(undefined, {
      headers: {
        Accept: "application/vnd.ringcentral.multipart+json",
        "Content-Type": "application/vnd.ringcentral.multipart+json",
      },
    });
  await rc.revoke();
};
main();
