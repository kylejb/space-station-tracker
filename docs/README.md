# Space Station Tracker

Guidelines for supporting https://www.whereisthespacestation.com.

## Development

The following commands should be executed from the project's **root** folder.

### Requirements

-   NodeJS >= 18.x
-   npm >= 9.x

### Local development

1. Install dependencies for server and web:

    - Command to do so: `npm run installAll`

2. Start services locally:

    * API: will be available on [localhost:9000](http://localhost:9000/).
        * dev:  `npm run dev`
        * prod: `npm start`

    * WEB: will be available on [localhost:3000](http://localhost:3000/).
        * dev:  `cd web && npm run dev`
        * prod: `cd web && npm run preview`
