import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    "stackbitVersion": "~0.6.0",
    "nodeVersion": "20",
    "ssgName": "custom",
    "contentSources": [],
    "postInstallCommand": "npm i --no-save @stackbit/types",
    "devCommand": "npm run dev"
})
