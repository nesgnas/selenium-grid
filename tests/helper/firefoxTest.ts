import { Builder, By, until } from 'selenium-webdriver';
import * as dotenv from 'dotenv';
import {logNodeDetails} from "./instanceDetail";

dotenv.config();

export async function runFirefoxTest(scenario: (driver: any) => Promise<void>, scenarioName: string) {
    // Use the HUB_URL from the environment variables
    const hubUrl = process.env.HUB_URL || "http://localhost:4444/wd/hub";

    const driver = await new Builder().forBrowser("firefox").usingServer(hubUrl).build();

    try {
        //await logNodeDetails(driver, scenarioName);  // Log node details
        await scenario(driver);
    } finally {
        await driver.quit();
    }
}