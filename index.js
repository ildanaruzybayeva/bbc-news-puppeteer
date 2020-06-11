const puppeteer = require("puppeteer");
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

const ninjasURL = "https://tretton37.com/meet"

app.get('/', (req, res) => {
    try {
        async function getData(url) {
        const browser = await puppeteer.launch({headless: false}); 
        const page = await browser.newPage();
        
        await page.goto(url);

        const people1337 = await page.evaluate(() => {
            const ninjas = Array.from(document.querySelectorAll('h1'))
            return ninjas.map(n => n.innerText).slice(1, ninjas.length - 1) // Exclued Meet our ninjas and new awesome ninja h1 from the array
        })

        res.send(people1337);
        browser.close();
        }

        getData(ninjasURL)
        
    } catch(err) {
        console.log(err)
    }
})



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


