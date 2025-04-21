import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      const letter = process.env.CYPRESS_VIDEO_LETTER || "A";
      // Add Chrome flags for using fake video file
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome") {
          launchOptions.args.push(
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
            `--use-file-for-fake-video-capture=cypress/dataset/video/A.mjpeg`
          );
        }
        return launchOptions;
      });
      // implement node event listeners here
      config.env.currentLetter = letter;
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
