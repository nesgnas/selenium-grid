import { runChromeTest } from './helper/chromeTest';
import { runFirefoxTest } from './helper/firefoxTest';
import { scenarioList } from "./scenarios";
import { chunkScenarios } from "./utils";




export async function runAllTestsOnChrome(instanceCount: number) {
    console.time("Total Chrome Test Time");  // Correct the label

    const promises = [];

    // Split scenarios into groups based on the number of instances
    const scenarioGroups = chunkScenarios(scenarioList, instanceCount);

    // Run each group of scenarios in parallel
    for (const group of scenarioGroups) {
        const groupPromises = group.map(([scenario, scenarioName]) => runChromeTest(scenario, scenarioName));
        promises.push(...groupPromises);

        // Wait for all scenarios in the group to complete before running the next group
        await Promise.all(groupPromises);
    }

    console.log("All Chrome tests have been successfully executed.\n");
    console.timeEnd("Total Chrome Test Time");  // Correct the label
    console.log("-------------------")

}

export async function runAllTestsOnFirefox(instanceCount: number) {
    console.time("Total Firefox Test Time");  // Correct the label

    const promises = [];

    // Split the scenarios into groups based on the number of Firefox instances
    const scenarioGroups = chunkScenarios(scenarioList, instanceCount);

    // Run each group of scenarios in parallel
    for (const group of scenarioGroups) {
        const groupPromises = group.map(([scenario, scenarioName]) => runFirefoxTest(scenario, scenarioName));
        promises.push(...groupPromises);

        // Wait for all scenarios in the group to complete before running the next group
        await Promise.all(groupPromises);
    }

    console.log("All Firefox tests have been successfully executed.\n");

    console.timeEnd("Total Firefox Test Time");  // Correct the label
    console.log("-------------------")


}
