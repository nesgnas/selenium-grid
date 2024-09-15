import { WebDriver, By, until } from "selenium-webdriver";
import * as path from "node:path";

export async function exampleHomePageScenario(driver: WebDriver) {
    await driver.get("https://example.com");
    const title: string = await driver.getTitle();
    console.log(`Homepage Title: ${title}`);
}

export async function googleSearchScenario(driver: WebDriver) {
    await driver.get("https://google.com");
    const searchBox = await driver.findElement({ name: "q" });
    await searchBox.sendKeys("Selenium WebDriver");
    await searchBox.submit();

    await driver.wait(
        driver.getTitle().then((title: string) => title.includes("Selenium WebDriver")),
        10000
    );
    const resultTitle: string = await driver.getTitle();
    console.log(`Search Result Title: ${resultTitle}`);
}

export async function formSubmissionScenario(driver: WebDriver) {
    await driver.get("https://the-internet.herokuapp.com/login");

    // Locate the username field and enter text
    const usernameField = await driver.wait(until.elementLocated(By.id("username")), 10000);
    await usernameField.sendKeys("tomsmith");

    // Locate the password field and enter text
    const passwordField = await driver.wait(until.elementLocated(By.id("password")), 10000);
    await passwordField.sendKeys("SuperSecretPassword!");

    // Click the Login button
    const loginButton = await driver.findElement(By.css("button[type='submit']"));
    await loginButton.click();

    // Wait for the secure area message to display
    const successMessage = await driver.wait(until.elementLocated(By.css(".flash.success")), 10000).getText();
    console.log(`Login Success Message: ${successMessage}`);
}

export async function pageRedirectionScenario(driver: WebDriver) {
    await driver.get("https://the-internet.herokuapp.com/redirector");

    // Locate the redirect link and click it
    const redirectLink = await driver.wait(until.elementLocated(By.id("redirect")), 10000);
    await redirectLink.click();

    // Wait for the page to redirect and check the URL
    await driver.wait(until.urlContains("/status_codes"), 10000);
    const currentUrl: string = await driver.getCurrentUrl();
    console.log(`Redirected to URL: ${currentUrl}`);
}

export async function dropdownSelectionScenario(driver: WebDriver) {
    await driver.get("https://the-internet.herokuapp.com/dropdown");

    // Locate the dropdown element and select an option
    const dropdown = await driver.findElement(By.id("dropdown"));
    await dropdown.click();
    const option = await driver.findElement(By.css("option[value='1']"));
    await option.click();

    // Check that the selected option is correct
    const selectedOption = await driver.findElement(By.css("option[selected='selected']")).getText();
    console.log(`Selected Option: ${selectedOption}`);
}

// export async function fileUploadScenario(driver: WebDriver) {
//     await driver.get("https://the-internet.herokuapp.com/upload");
//
//     // Get the absolute path of the file to upload
//     // const filePath = path.resolve(__dirname, );
//
//     // Locate the file input and upload the file
//     const fileInput = await driver.findElement(By.id("file-upload"));
//     await fileInput.sendKeys("../sampleFile/data.json"); // Use the correct path for your file
//
//     // Click the Upload button
//     const uploadButton = await driver.findElement(By.id("file-submit"));
//     await uploadButton.click();
//
//     // Verify the file upload message
//     const uploadMessage = await driver.wait(until.elementLocated(By.id("uploaded-files")), 10000).getText();
//     console.log(`Uploaded File: ${uploadMessage}`);
// }

export async function checkboxInteractionScenario(driver: WebDriver) {
    await driver.get("https://the-internet.herokuapp.com/checkboxes");

    // Locate the first checkbox and toggle its state
    const checkbox1 = await driver.findElement(By.css("input[type='checkbox']:nth-of-type(1)"));
    const isChecked = await checkbox1.isSelected();

    if (!isChecked) {
        await checkbox1.click();
    }

    const newIsChecked = await checkbox1.isSelected();
    console.log(`Checkbox is now checked: ${newIsChecked}`);
}

export async function dragAndDropScenario(driver: WebDriver) {
    await driver.get("https://the-internet.herokuapp.com/drag_and_drop");

    // Locate the elements to drag and drop
    const sourceElement = await driver.findElement(By.id("column-a"));
    const targetElement = await driver.findElement(By.id("column-b"));

    // Perform drag and drop using JavaScript since WebDriver's drag-and-drop doesn't always work
    await driver.executeScript(`
        const source = arguments[0];
        const target = arguments[1];
        const dataTransfer = new DataTransfer();
        source.dispatchEvent(new DragEvent('dragstart', { dataTransfer }));
        target.dispatchEvent(new DragEvent('drop', { dataTransfer }));
        source.dispatchEvent(new DragEvent('dragend', { dataTransfer }));
    `, sourceElement, targetElement);

    // Verify that the elements have been swapped
    const headerA = await sourceElement.getText();
    const headerB = await targetElement.getText();
    console.log(`After drag and drop, column A: ${headerA}, column B: ${headerB}`);
}
