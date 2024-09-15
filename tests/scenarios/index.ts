import { WebDriver } from "selenium-webdriver";
import {
    exampleHomePageScenario,
    googleSearchScenario,
    formSubmissionScenario,
    pageRedirectionScenario,
    dropdownSelectionScenario,
    // fileUploadScenario,
    checkboxInteractionScenario,
    dragAndDropScenario
} from './scenarios';

// Object chứa các cặp [kịch bản, tên kịch bản]
const scenarioSample: [ (driver: WebDriver) => Promise<void>, string ][] = [
    [exampleHomePageScenario, "Example Home Page Scenario"],
    [googleSearchScenario, "Google Search Scenario"],
    [formSubmissionScenario, "Form Submission Scenario"],
    [pageRedirectionScenario, "Page Redirection Scenario"],
    [dropdownSelectionScenario, "Dropdown Selection Scenario"],
    // [fileUploadScenario, "File Upload Scenario"],
    [checkboxInteractionScenario, "Checkbox Interaction Scenario"],
    [dragAndDropScenario, "Drag and Drop Scenario"]
];

const scenarioUP: [ (driver: WebDriver) => Promise<void>, string ][] = []

export const scenarioList = scenarioSample