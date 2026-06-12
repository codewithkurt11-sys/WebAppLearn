import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"intro",   label:"How it Works"  },
  { id:"requests",label:"requests"      },
  { id:"bs4",     label:"BeautifulSoup" },
  { id:"select",  label:"CSS Selectors" },
  { id:"forms",   label:"Forms & POST"  },
  { id:"save",    label:"Save Data"     },
  { id:"ethics",  label:"⚖ Ethics"      },
  { id:"quiz",    label:"Quiz 🎯"        },
];

const QUIZ: Question[] = [
  { q:"Which library sends HTTP requests in Python?", opts:["urllib","requests","http.client","fetch"], ans:1, exp:"requests is the standard Python library for HTTP. It's not built-in — install with: pip install requests" },
  { q:"What does response.status_code tell you?", opts:["The page title","Whether the content is HTML","The HTTP response status (200, 404...)","The page size"], ans:2, exp:"200 = OK, 404 = Not Found, 403 = Forbidden. Always check status before processing the response." },
  { q:"Which BeautifulSoup method finds the FIRST matching element?", opts:["findall()","find_all()","find()","search()"], ans:2, exp:"find() returns the first match. find_all() returns a list of all matches." },
  { q:"How do you get the text content of a tag?", opts:["tag.content","tag.innerHTML","tag.text or tag.get_text()","tag.value"], ans:2, exp:"tag.text or tag.get_text() extracts the visible text. .get_text(strip=True) also removes whitespace." },
  { q:"How do you get an attribute value like href from a tag?", opts:["tag.attr('href')","tag['href'] or tag.get('href')","tag.getAttribute('href')","tag.href"], ans:1, exp:"tag['href'] raises KeyError if missing. tag.get('href') returns None safely — prefer get() when the attribute might not exist." },
  { q:"Why should you add time.sleep() between requests?", opts:["It makes scraping faster","To avoid overloading the server and getting blocked","To parse HTML correctly","To handle encoding issues"], ans:1, exp:"Without delays, rapid requests look like a DDoS attack. Servers rate-limit or ban IPs that make too many requests too fast." },
  { q:"What does response.text give you?", opts:["Raw bytes","The HTML as a string","A BeautifulSoup object","A list of links"], ans:1, exp:"response.text is the response body decoded as a string. response.content gives raw bytes. Pass response.text to BeautifulSoup." },
  { q:"Which CSS selector gets all elements with class 'card'?", opts:["#card","card",".card","*card"], ans:2, exp:".card selects by class name in CSS selector syntax. #card selects by id. soup.select('.card') finds all matching elements." },
  { q:"What does soup.select_one('.price') return vs soup.select('.price')?", opts:["They're identical","select_one returns the first match or None; select returns a list of all matches","select returns the first match; select_one returns all","select_one is faster but less accurate"], ans:1, exp:"select_one() is like find() — returns the first matching element or None. select() is like find_all() — returns a list. Use select_one() when you only need one element." },
  { q:"What does the robots.txt file tell scrapers?", opts:["How to parse HTML","Which pages the site owner asks scrapers not to visit","The site's login credentials","The site's HTML structure"], ans:1, exp:"robots.txt is a voluntary standard — sites list paths they'd prefer scrapers to avoid. Always check and respect robots.txt. Scraping disallowed paths isn't illegal everywhere but it may violate terms of service." },
];

function TabIntro() {
  return (<>
    <Card>
      <CardTitle color={T.muted2}>🕷 What is Web Scraping?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        The moment web scraping clicks, it feels like a superpower. You realize that every website — job boards, news sites, sports stats, price trackers — is just HTML you can read and extract. Instead of manually copying a hundred rows into a spreadsheet, you write 20 lines of Python and it does it in three seconds.
      </p>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Web scraping is writing code to <strong style={{ color:T.text }}>automatically visit websites and extract data</strong> from their HTML. Instead of manually copying information, Python does it for you — in seconds, for thousands of pages.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:10 }}>
        {[
          { title:"Use cases", items:["Price tracking","News aggregation","Job listings","Sports stats","Research data","Government data"] },
          { title:"What you'll use", items:["requests — fetch pages","BeautifulSoup — parse HTML","CSV/JSON — save results","time — rate limiting","re — regex patterns","pathlib — file management"] },
        ].map(col => (
          <div key={col.title} style={{ background:T.surface, borderRadius:8, padding:"12px 14px" }}>
            <div style={{ fontSize:10, color:T.muted, fontFamily:"'Fira Code',monospace", letterSpacing:"1px", marginBottom:8 }}>{col.title.toUpperCase()}</div>
            {col.items.map(i => <div key={i} style={{ fontSize:12, color:T.muted2, padding:"2px 0" }}>→ {i}</div>)}
          </div>
        ))}
      </div>
    </Card>
    <Card>
      <CardTitle color={T.muted2}>The Scraping Pipeline</CardTitle>
      <div style={{ fontFamily:"'Fira Code',monospace" }}>
        {[
          { n:"1", label:"requests.get(url)", desc:"Download the raw HTML from the website", color:T.sky },
          { n:"2", label:"BeautifulSoup(html)", desc:"Parse the HTML into a searchable tree", color:T.accent },
          { n:"3", label:"soup.find / select", desc:"Extract the elements you want", color:T.green },
          { n:"4", label:"tag.text / tag['href']", desc:"Get text content or attribute values", color:T.amber },
          { n:"5", label:"json.dump / csv.writer", desc:"Save results to a file", color:T.rose },
        ].map(s => (
          <div key={s.n} style={{ display:"flex", gap:12, padding:"8px 0", borderBottom:`1px solid ${T.border}`, alignItems:"flex-start" }}>
            <span style={{ width:22, height:22, borderRadius:"50%", background:`${s.color}22`, color:s.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0, marginTop:1 }}>{s.n}</span>
            <div>
              <div style={{ color:s.color, fontSize:12 }}>{s.label}</div>
              <div style={{ color:T.muted2, fontSize:11, marginTop:2 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
    <Card>
      <CardTitle color={T.muted2}>Installation</CardTitle>
      <CodeBlock lang="py" code={`# Install the required libraries\n# In your terminal:\npip install requests beautifulsoup4\n\n# On Alpine Linux (Acode/Termux):\npip3 install requests beautifulsoup4`}/>
    </Card>
  </>);
}

function TabRequests() {
  return (<>
    <Card>
      <CardTitle color={T.muted2}>📡 requests Library</CardTitle>
      <CodeBlock lang="py" showLines code={`import requests\n\n# Basic GET request\nresponse = requests.get("https://example.com")\n\nprint(response.status_code)  # 200 = OK\nprint(response.url)          # final URL (after redirects)\nprint(response.headers)      # HTTP headers dict\nprint(len(response.text))    # how many characters\n\n# Always check status!\nif response.status_code == 200:\n    html = response.text      # the page's HTML\nelse:\n    print(f"Failed: {response.status_code}")\n\n# Shortcut — raise exception for bad status\nresponse.raise_for_status()  # raises if 4xx or 5xx`}/>
    </Card>
    <Card>
      <CardTitle color={T.muted2}>Headers & Session</CardTitle>
      <CodeBlock lang="py" showLines code={`import requests\n\n# Add headers to look like a real browser\nHEADERS = {\n    "User-Agent": (\n        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "\n        "AppleWebKit/537.36 Chrome/120.0 Safari/537.36"\n    ),\n    "Accept-Language": "en-US,en;q=0.9",\n}\n\nresponse = requests.get("https://example.com", headers=HEADERS)\n\n# Session — reuse connection, persist cookies\nsession = requests.Session()\nsession.headers.update(HEADERS)\n\n# All requests through session keep cookies / headers\nr1 = session.get("https://site.com/login")\nr2 = session.get("https://site.com/dashboard")  # still logged in\n\n# Timeout — don't wait forever\nresponse = requests.get(url, timeout=10)  # seconds`}/>
      <InfoBox type="warn">Many websites block requests without a User-Agent header. Always set one to mimic a real browser.</InfoBox>
    </Card>
  </>);
}

function TabBS4() {
  return (<>
    <Card>
      <CardTitle color={T.muted2}>🥣 BeautifulSoup — Parse HTML</CardTitle>
      <CodeBlock lang="py" showLines code={`import requests\nfrom bs4 import BeautifulSoup\n\nresponse = requests.get("https://books.toscrape.com")\nsoup = BeautifulSoup(response.text, "html.parser")\n\n# Navigate the tree\nprint(soup.title)          # <title>Books to Scrape</title>\nprint(soup.title.text)     # "Books to Scrape"\nprint(soup.h1.text)        # first <h1>\nprint(soup.a["href"])      # href attribute of first <a>\n\n# find() — returns FIRST matching tag\ntitle = soup.find("h1")\nlink  = soup.find("a", href=True)\nbox   = soup.find("div", class_="product_pod")\n\n# find_all() — returns LIST of all matches\nheadings = soup.find_all("h3")         # all h3 tags\nlinks    = soup.find_all("a")          # all anchor tags\ncards    = soup.find_all("article", class_="product_pod")\n\nprint(f"Found {len(cards)} books")`}/>
    </Card>
    <Card>
      <CardTitle color={T.muted2}>Complete Example — Scrape Books</CardTitle>
      <CodeBlock lang="py" showLines code={`import requests\nfrom bs4 import BeautifulSoup\nimport time\n\nBASE_URL = "https://books.toscrape.com/catalogue/"\nHEADERS  = {"User-Agent": "Mozilla/5.0 (Educational scraper)"}\n\ndef scrape_page(url):\n    response = requests.get(url, headers=HEADERS)\n    soup     = BeautifulSoup(response.text, "html.parser")\n    books    = []\n\n    for article in soup.find_all("article", class_="product_pod"):\n        title = article.h3.a["title"]        # book title\n        price = article.find(\n            "p", class_="price_color"\n        ).text.strip()                        # "£12.99"\n        rating = article.p["class"][1]        # "Three"\n        books.append({\n            "title":  title,\n            "price":  price,\n            "rating": rating,\n        })\n    return books\n\n# Scrape first 3 pages\nall_books = []\nfor page_num in range(1, 4):\n    url   = f"{BASE_URL}page-{page_num}.html"\n    books = scrape_page(url)\n    all_books.extend(books)\n    print(f"Page {page_num}: scraped {len(books)} books")\n    time.sleep(1)    # be polite — wait 1 second!\n\nprint(f"Total: {len(all_books)} books")`}/>
    </Card>
  </>);
}

function TabSelect() {
  return (<>
    <Card>
      <CardTitle color={T.muted2}>🎯 CSS Selectors with .select()</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        If you know CSS, you can use the same selector syntax with BeautifulSoup's <IC>.select()</IC> method — often more concise than find_all.
      </p>
      <CodeBlock lang="py" showLines code={`from bs4 import BeautifulSoup\n\nsoup = BeautifulSoup(html, "html.parser")\n\n# Tag selectors\nsoup.select("h1")           # all <h1> tags\nsoup.select("p")            # all <p> tags\n\n# Class selectors\nsoup.select(".card")        # class="card"\nsoup.select(".price.sale")  # has both classes\n\n# ID selectors\nsoup.select("#main")        # id="main"\n\n# Attribute selectors\nsoup.select("a[href]")               # <a> with href\nsoup.select('a[href^="https"]')      # href starts with https\nsoup.select('img[src$=".jpg"]')      # src ends with .jpg\nsoup.select('[data-id="42"]')        # custom data attribute\n\n# Descendant selectors\nsoup.select("div.card h3")          # h3 inside .card div\nsoup.select("ul.menu > li")         # direct child li of .menu ul\nsoup.select("div.card a.title")     # .title link inside .card\n\n# select() returns a list — select_one() returns the first\nfirst_link = soup.select_one("nav a")`}/>
    </Card>
    <Card>
      <CardTitle color={T.muted2}>Getting Values</CardTitle>
      <CodeBlock lang="py" showLines code={`# For each element\nfor tag in soup.select("article.product"):\n    # Text content\n    title  = tag.select_one("h3").text.strip()\n\n    # Attribute\n    link   = tag.select_one("a")["href"]         # KeyError if missing\n    link   = tag.select_one("a").get("href", "") # safe\n\n    # Nested element text\n    price  = tag.select_one(".price").get_text(strip=True)\n\n    # Image source\n    img    = tag.select_one("img")\n    src    = img["src"] if img else ""\n\n    # Check class\n    is_sale = "sale" in tag.get("class", [])\n\n    print(title, price, link)`}/>
    </Card>
  </>);
}

function TabForms() {
  return (<>
    <Card>
      <CardTitle color={T.muted2}>📝 POST Requests & Forms</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Some data is only accessible after submitting a form — like a search box. Use POST requests to simulate form submissions.</p>
      <CodeBlock lang="py" showLines code={`import requests\nfrom bs4 import BeautifulSoup\n\n# Inspect the form first in browser DevTools (F12)\n# Look for: <form action="/search" method="POST">\n#           <input name="q">\n\nsession = requests.Session()\nsession.headers.update({\n    "User-Agent": "Mozilla/5.0 (Educational)\"\n})\n\n# GET the page first (for cookies / CSRF token)\npage = session.get("https://example.com/search")\nsoup = BeautifulSoup(page.text, "html.parser")\n\n# Extract hidden CSRF token if needed\ncsrf = soup.find("input", {"name": "csrf_token"})\ntoken = csrf["value"] if csrf else ""\n\n# Submit form data\nresult = session.post(\n    "https://example.com/search",\n    data={\n        "q":          "python tutorial",\n        "csrf_token": token,\n    }\n)\n\n# Parse the results\nresults_soup = BeautifulSoup(result.text, "html.parser")\nfor item in results_soup.select(".search-result"):\n    print(item.select_one("h3").text)`}/>
    </Card>
    <Card>
      <CardTitle color={T.muted2}>Query Parameters (GET forms)</CardTitle>
      <CodeBlock lang="py" showLines code={`import requests\n\n# Many search forms just add params to the URL\n# e.g. https://site.com/search?q=python&page=1\n\n# Method 1 — manual URL\nresponse = requests.get(\n    "https://books.toscrape.com/catalogue/search/",\n    params={"q": "mystery", "page": 1}\n)\nprint(response.url)  # shows full URL with params\n\n# Method 2 — loop pages\nfor page in range(1, 6):\n    response = requests.get(\n        "https://example.com/products",\n        params={"category": "books", "page": page, "limit": 20}\n    )\n    # process page...`}/>
    </Card>
  </>);
}

function TabSave() {
  return (<>
    <Card>
      <CardTitle color={T.muted2}>💾 Save Data to Files</CardTitle>
      <CodeBlock lang="py" showLines code={`import json\nimport csv\nfrom pathlib import Path\n\nbooks = [\n    {"title": "Python Crash Course", "price": "£25.99", "rating": "Five"},\n    {"title": "Automate the Boring Stuff", "price": "£18.50", "rating": "Four"},\n]\n\n# ─── Save as JSON ───────────────────────────────────────────\nPath("books.json").write_text(\n    json.dumps(books, indent=2, ensure_ascii=False)\n)\n\n# ─── Save as CSV ────────────────────────────────────────────\nwith open("books.csv", "w", newline="", encoding="utf-8") as f:\n    writer = csv.DictWriter(f, fieldnames=["title","price","rating"])\n    writer.writeheader()\n    writer.writerows(books)\n\n# ─── Save to SQLite ─────────────────────────────────────────\nimport sqlite3\n\nconn   = sqlite3.connect("scrape.db")\ncursor = conn.cursor()\ncursor.execute("""\n    CREATE TABLE IF NOT EXISTS books (\n        id     INTEGER PRIMARY KEY AUTOINCREMENT,\n        title  TEXT,\n        price  TEXT,\n        rating TEXT\n    )\n""")\nfor book in books:\n    cursor.execute(\n        "INSERT INTO books (title, price, rating) VALUES (?,?,?)",\n        (book["title"], book["price"], book["rating"])\n    )\nconn.commit()\nconn.close()\nprint(f"Saved {len(books)} books to SQLite")`}/>
    </Card>
    <Card>
      <CardTitle color={T.muted2}>Full Production Pipeline</CardTitle>
      <CodeBlock lang="py" showLines code={`import requests, json, time\nfrom bs4 import BeautifulSoup\nfrom pathlib import Path\n\nHEADERS = {"User-Agent": "Mozilla/5.0 (Educational scraper)"}\nOUTPUT  = Path("data")\nOUTPUT.mkdir(exist_ok=True)\n\ndef scrape(url: str) -> dict:\n    """Scrape a single page and return structured data."""\n    res  = requests.get(url, headers=HEADERS, timeout=10)\n    res.raise_for_status()\n    soup = BeautifulSoup(res.text, "html.parser")\n\n    return {\n        "url":    url,\n        "title":  soup.title.text.strip() if soup.title else "",\n        "links":  [\n            a.get("href","") for a in soup.select("a[href]")\n        ][:20],  # first 20 links only\n    }\n\nURLS = [\n    "https://books.toscrape.com",\n    "https://books.toscrape.com/catalogue/page-2.html",\n]\n\nresults = []\nfor i, url in enumerate(URLS):\n    try:\n        print(f"[{i+1}/{len(URLS)}] {url}")\n        data = scrape(url)\n        results.append(data)\n        time.sleep(1.5)      # rate limit!\n    except Exception as e:\n        print(f"  Error: {e}")\n\n(OUTPUT / "results.json").write_text(\n    json.dumps(results, indent=2)\n)\nprint(f"Done. Saved {len(results)} pages.")`}/>
    </Card>
  </>);
}

function TabEthics() {
  return (<>
    <Card>
      <CardTitle color={T.rose}>⚖ Ethics & Legality</CardTitle>
      <InfoBox type="warn">Web scraping exists in a grey area. Always check a site's Terms of Service and robots.txt before scraping.</InfoBox>
    </Card>
    {[
      { title:"✅ Always Do This", color:T.green, items:[
        "Check robots.txt — https://site.com/robots.txt",
        "Read the Terms of Service for scraping policies",
        "Add delays (time.sleep) — 1–3 seconds between requests",
        "Set a descriptive User-Agent identifying your bot",
        "Only collect data you actually need",
        "Use official APIs if they exist",
        "Cache responses to avoid re-scraping",
      ]},
      { title:"❌ Never Do This", color:T.rose, items:[
        "Scrape at high speed (no sleep) — it's like a DDoS attack",
        "Scrape personal data without consent",
        "Bypass login walls or paywalls",
        "Ignore robots.txt Disallow rules",
        "Republish scraped content commercially without permission",
        "Overwhelm small/hobby websites",
      ]},
    ].map(section => (
      <Card key={section.title}>
        <CardTitle color={section.color}>{section.title}</CardTitle>
        <div>
          {section.items.map(item => (
            <div key={item} style={{ display:"flex", gap:10, padding:"6px 0", borderBottom:`1px solid ${T.border}`, fontSize:12.5, color:T.muted2, alignItems:"flex-start" }}>
              <span style={{ color:section.color, fontSize:14, flexShrink:0 }}>{section.color===T.green?"✓":"✗"}</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Card>
    ))}
    <Card>
      <CardTitle color={T.sky}>robots.txt Example</CardTitle>
      <CodeBlock lang="py" code={`# https://example.com/robots.txt\n\nUser-agent: *          # applies to all bots\nDisallow: /admin/      # don't scrape /admin/\nDisallow: /private/    # don't scrape /private/\nAllow: /               # everything else is OK\n\nCrawl-delay: 2         # wait 2 seconds between requests\n\n# Specific bot rule\nUser-agent: Googlebot\nAllow: /`}/>
      <InfoBox type="info">If <IC>Disallow: /</IC> — don't scrape that site at all. If there's an API, use it instead.</InfoBox>
    </Card>
  </>);
}

export default function WebScraping() {
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem("cif_tab_scraping") ?? "intro"; } catch { return "intro"; }
  });
  const content: Record<string, React.ReactNode> = {
    intro:<TabIntro/>, requests:<TabRequests/>, bs4:<TabBS4/>,
    select:<TabSelect/>, forms:<TabForms/>, save:<TabSave/>, ethics:<TabEthics/>,
  };
  return (
    <div>
      <PageHeader eyebrow="Web Scraping · Beginner" title="Web Scraping" sub="Extract data from any website using requests + BeautifulSoup" color="#94a3b8"/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Web scraping turns the entire internet into your personal dataset. Job boards, sports stats, product prices, news headlines, government data — all of it is accessible with 20 lines of Python. Data scientists, researchers, and freelancers use scrapers constantly.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab} pageId="scraping"/>
        {tab==="quiz"
          ? <Card><CardTitle color={T.muted2}>🎯 Web Scraping Quiz</CardTitle><Quiz questions={QUIZ} trackId="scraping"/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
