const requestPromise = require('request-promise')
const request = require('request')
const cheerio = require('cheerio')
const fs = require("fs")


const URLS = [

    {
        url: "https://www.imdb.com/title/tt1910272/?ref_=nv_sr_srsg_0_tt_8_nm_0_q_steins%2520gate",
        id: "steinsGate"
    },
    { url: "https://www.imdb.com/title/tt3358020/?ref_=nv_sr_srsg_0_tt_7_nm_1_q_parasyt", id: "parasyte" }
]

const result = async () => {
    let animeData = []

    for (let anime of URLS) {
        let response = await requestPromise({
            url: anime.url,
            headers: {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.5",
                "Connection": "keep-alive",
                "DNT": "1",
                "Host": "www.imdb.com",
                "Referer": "https://www.imdb.com/",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "TE": "trailers",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0"
            },
            gzip: true
        })
        let file = fs.createWriteStream(`${anime.id}.jpg`)
      
        let $ = cheerio.load(response)
        let title = $('span[class="hero__primary-text"]').text()
        let poster = $(`img[class="ipc-image"]`).attr('src')
        animeData.push({
            title,
            poster
        })
        let stream = request({
            url: poster,
            headers: {

                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.5",
                "Connection": "keep-alive",
                "DNT": "1",
                "Referer": "https://www.imdb.com/",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                "TE": "trailers",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0"
            },
            gzip: true
            
        }).pipe(file)
    }

    // Move the fs.writeFileSync outside the loop
    fs.writeFileSync("./data.json", JSON.stringify(animeData), 'utf-8')
    
    console.log(animeData)
}

result()
