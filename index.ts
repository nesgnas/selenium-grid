import { runAllTestsOnChrome, runAllTestsOnFirefox } from './tests';


async function main() {
    try {

        console.log("Starting Selenium Grid tests...");

        console.time("Total Test Execution Time");

        await runAllTestsOnChrome(parseInt(process.env.CHROME_NODES)); // Run tests on Chrome

        await runAllTestsOnFirefox(parseInt(process.env.FIREFOX_NODES)); // Run tests on Firefox

         // Log the total time for both Chrome and Firefox tests
        console.log("All tests have been successfully executed.\n");
        console.timeEnd("Total Test Execution Time");


    } catch (error) {
        console.error("Error while running the tests:", error);
    }
}

main();
