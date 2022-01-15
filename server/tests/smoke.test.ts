import axios from 'axios';

// const domain = 'whereisthespacestation.com';
const landingDomain = 'www.whereisthespacestation.com';

// async function hasRedirect(from, to) {
//     const res = await axios(from);
//     expect(res.status).toEqual(301);
//     expect(res.headers.location).toEqual(to);
// }

async function isOk(url: string) {
    const res = await axios(url);
    expect(res.status).toEqual(200);
}

// our tests
describe('landing', () => {
    // test.concurrent('non-www/non-https redirects to landing', async () => {
    //     await hasRedirect(`http://${domain}`, `https://${domain}`);
    //     await hasRedirect(`https://${domain}`, `https://${landingDomain}`);
    // });
    test.concurrent('landing is ok', async () => {
        await isOk(`https://${landingDomain}`);
    });
    // test.concurrent('landing https redirect', async () => {
    //     await hasRedirect(`http://${landingDomain}`, `https://${landingDomain}`);
    // });
});
