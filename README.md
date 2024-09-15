# selenium-grid

```dotenv
# .env

# Selenium Grid Hub URLs and Ports
HUB_URL=http://localhost:4444/wd/hub
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317

# Event Bus Ports
SE_EVENT_BUS_PUBLISH_PORT=4442
SE_EVENT_BUS_SUBSCRIBE_PORT=4443

# Exposed Ports for Chrome and Firefox Nodes
CHROME_VNC_PORT=5900
FIREFOX_VNC_PORT=5901

# OpenTelemetry settings
OTEL_TRACES_EXPORTER=otlp

CHROME_NODES=3
FIREFOX_NODES=3

```