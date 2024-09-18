import { Builder, Session, Capabilities } from "selenium-webdriver";
import axios from "axios";

// Fetches the list of nodes and tries to match the session ID to the node executing the test
async function getNodeInfo(sessionId: string): Promise<string> {
    try {
        const response = await axios.get('http://171.233.47.253:8089/status');  // Adjust for your grid's status endpoint
        const nodes = response.data.value.nodes;

        for (const node of nodes) {
            for (const slot of node.slots) {
                if (slot.session && slot.session.sessionId === sessionId) {
                    return node.uri || "Not available";
                }
            }
        }
        return "Not available";
    } catch (error) {
        console.error("Error fetching node info:", error.message);
        return "Not available";
    }
}

// A helper function to log details of the running node
export async function logNodeDetails(driver: any, scenarioName: string) {
    const session: Session = await driver.getSession();
    const capabilities: Capabilities = await driver.getCapabilities();
    const sessionId = session.getId();

    console.log(`Scenario: ${scenarioName}`);
    console.log(`Browser: ${capabilities.getBrowserName()}`);
    console.log(`Session ID: ${sessionId}`);

    // Fetch the node info and log it
    const nodeInfo = await getNodeInfo(sessionId);
    console.log(`Node executing the test: ${nodeInfo}\n`);
}