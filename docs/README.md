# Space Station Tracker

Guidelines for supporting https://www.whereisthespacestation.com.

## Development

The following commands should be executed from the project's **root** folder.

### Requirements

-   NodeJS >= 16.x
-   npm >= 8.3.x

### Local development

1. Install dependencies for server and web:

    - Command to do so: `npm run installAll`

2. Start services locally:

    - API: `npm run dev`

        - will be available at [localhost:9000](http://localhost:9000/).

    - WEB: `cd web && npm start`

        - will be available at [localhost:3000](http://localhost:3000/).

3. Build and start production build locally:
    - Build: `npm run build`
    - Run: `npm start`
