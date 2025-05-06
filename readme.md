## Links
- test site
https://demo-bank.vercel.app/  


## Commands
- check `NodeJS` version    
`node -v`
- new project with Playwright:  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI:  
`npx playwright test`
`npx playwright test --repeat-each=10`
`npx playwright test --retries=3`
- run test with browser GUI:  
`npx playwright test --headed`
- viewing report  
`npx playwright show-report`
- run Trace Viewer on zip file
`npx playwright show-trace trace.zip`

#Updating Playwright
- check if Playwright should be updated
`npm outdated @playwright/test`
-update Playwright
`npm i @playwright/test`
-update browsers
`npx playwright install`
-verify Playwright version
`npx @playwright/test --version`


## Playwright Config modifications
- config file `playwright.config.ts`
- enable video on fail
```javascript
use: {
    video: {'retain-on-failure'},
},
```
- enable Trace Viewer on fail
```javascript
use: {
    trace: {'retain-on-failure'},
},
```