import { XMLParser } from "fast-xml-parser"
import type { NewsItem } from "@shared/types"

const parser = new XMLParser()

async function getRss(url: string) {
  console.log(`Fetching RSS feed from: ${url}`)
  try {
    const xmlContent: string = await myFetch(url)
    const result = parser.parse(xmlContent)
    const items = result?.rss?.channel?.item || []

    const news: NewsItem[] = items.map((item: any) => {
      return {
        id: item.guid || item.link,
        title: item.title,
        url: item.link,
        pubDate: item.pubDate,
        extra: {
          hover: item.description,
        },
      }
    }).filter(Boolean)

    return news
  } catch (error) {
    console.error(`Error fetching RSS feed from: ${url}`, error)
    return []
  }
}

const jimmysongBlog = defineSource(async () => {
  return getRss("https://jimmysong.io/blog/index.xml")
})

const jimmysongAI = defineSource(async () => {
  return getRss("https://jimmysong.io/ai/index.xml")
})

export default {
  "jimmysong-blog": jimmysongBlog,
  "jimmysong-ai": jimmysongAI,
}
