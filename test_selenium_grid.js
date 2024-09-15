const { Builder, By, Key, until } = require('selenium-webdriver');

async function runChromeTest() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to Google instead of Example Domain
        await driver.get('https://www.google.com');

        // Wait for the search input to appear, then perform a search
        let searchBox = await driver.wait(until.elementLocated(By.name('q')), 10000);
        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);

        // Wait for the search results page to load
        await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
        let resultTitle = await driver.getTitle();
        console.log("[chrome] Search Result Title: " + resultTitle);
    } catch (error) {
        console.error("[chrome] Error in Test: ", error);
    } finally {
        await driver.quit();
    }
}

async function runFirefoxTest() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {
        // Navigate to Google instead of Example Domain
        await driver.get('https://www.google.com');

        // Wait for the search input to appear, then perform a search
        let searchBox = await driver.wait(until.elementLocated(By.name('q')), 10000);
        await searchBox.sendKeys('Selenium WebDriver', Key.RETURN);

        // Wait for the search results page to load
        await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
        let resultTitle = await driver.getTitle();
        console.log("[firefox] Search Result Title: " + resultTitle);
    } catch (error) {
        console.error("[firefox] Error in Test: ", error);
    } finally {
        await driver.quit();
    }
}

async function runTests() {
    await Promise.all([runChromeTest(), runFirefoxTest()]);
}

runTests().catch(error => console.error("Unhandled Error in Tests: ", error));
