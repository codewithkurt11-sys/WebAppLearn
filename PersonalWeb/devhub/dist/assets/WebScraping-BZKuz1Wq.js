import{r as p,j as e,T as t}from"./index-CNTZnqQQ.js";import{P as u,T as d,a as r,b as o,Q as h,I as l,C as a,c as n}from"./shared-Cgke19x4.js";const m=[{id:"intro",label:"How it Works"},{id:"requests",label:"requests"},{id:"bs4",label:"BeautifulSoup"},{id:"select",label:"CSS Selectors"},{id:"forms",label:"Forms & POST"},{id:"save",label:"Save Data"},{id:"ethics",label:"⚖ Ethics"},{id:"quiz",label:"Quiz 🎯"}],g=[{q:"Which library sends HTTP requests in Python?",opts:["urllib","requests","http.client","fetch"],ans:1,exp:"requests is the standard Python library for HTTP. It's not built-in — install with: pip install requests"},{q:"What does response.status_code tell you?",opts:["The page title","Whether the content is HTML","The HTTP response status (200, 404...)","The page size"],ans:2,exp:"200 = OK, 404 = Not Found, 403 = Forbidden. Always check status before processing the response."},{q:"Which BeautifulSoup method finds the FIRST matching element?",opts:["findall()","find_all()","find()","search()"],ans:2,exp:"find() returns the first match. find_all() returns a list of all matches."},{q:"How do you get the text content of a tag?",opts:["tag.content","tag.innerHTML","tag.text or tag.get_text()","tag.value"],ans:2,exp:"tag.text or tag.get_text() extracts the visible text. .get_text(strip=True) also removes whitespace."},{q:"How do you get an attribute value like href from a tag?",opts:["tag.attr('href')","tag['href'] or tag.get('href')","tag.getAttribute('href')","tag.href"],ans:1,exp:"tag['href'] raises KeyError if missing. tag.get('href') returns None safely — prefer get() when the attribute might not exist."},{q:"Why should you add time.sleep() between requests?",opts:["It makes scraping faster","To avoid overloading the server and getting blocked","To parse HTML correctly","To handle encoding issues"],ans:1,exp:"Without delays, rapid requests look like a DDoS attack. Servers rate-limit or ban IPs that make too many requests too fast."},{q:"What does response.text give you?",opts:["Raw bytes","The HTML as a string","A BeautifulSoup object","A list of links"],ans:1,exp:"response.text is the response body decoded as a string. response.content gives raw bytes. Pass response.text to BeautifulSoup."},{q:"Which CSS selector gets all elements with class 'card'?",opts:["#card","card",".card","*card"],ans:2,exp:".card selects by class name in CSS selector syntax. #card selects by id. soup.select('.card') finds all matching elements."},{q:"What does soup.select_one('.price') return vs soup.select('.price')?",opts:["They're identical","select_one returns the first match or None; select returns a list of all matches","select returns the first match; select_one returns all","select_one is faster but less accurate"],ans:1,exp:"select_one() is like find() — returns the first matching element or None. select() is like find_all() — returns a list. Use select_one() when you only need one element."},{q:"What does the robots.txt file tell scrapers?",opts:["How to parse HTML","Which pages the site owner asks scrapers not to visit","The site's login credentials","The site's HTML structure"],ans:1,exp:"robots.txt is a voluntary standard — sites list paths they'd prefer scrapers to avoid. Always check and respect robots.txt. Scraping disallowed paths isn't illegal everywhere but it may violate terms of service."}];function f(){return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"🕷 What is Web Scraping?"}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:"The moment web scraping clicks, it feels like a superpower. You realize that every website — job boards, news sites, sports stats, price trackers — is just HTML you can read and extract. Instead of manually copying a hundred rows into a spreadsheet, you write 20 lines of Python and it does it in three seconds."}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["Web scraping is writing code to ",e.jsx("strong",{style:{color:t.text},children:"automatically visit websites and extract data"})," from their HTML. Instead of manually copying information, Python does it for you — in seconds, for thousands of pages."]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10},children:[{title:"Use cases",items:["Price tracking","News aggregation","Job listings","Sports stats","Research data","Government data"]},{title:"What you'll use",items:["requests — fetch pages","BeautifulSoup — parse HTML","CSV/JSON — save results","time — rate limiting","re — regex patterns","pathlib — file management"]}].map(s=>e.jsxs("div",{style:{background:t.surface,borderRadius:8,padding:"12px 14px"},children:[e.jsx("div",{style:{fontSize:10,color:t.muted,fontFamily:"'Fira Code',monospace",letterSpacing:"1px",marginBottom:8},children:s.title.toUpperCase()}),s.items.map(i=>e.jsxs("div",{style:{fontSize:12,color:t.muted2,padding:"2px 0"},children:["→ ",i]},i))]},s.title))})]}),e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"The Scraping Pipeline"}),e.jsx("div",{style:{fontFamily:"'Fira Code',monospace"},children:[{n:"1",label:"requests.get(url)",desc:"Download the raw HTML from the website",color:t.sky},{n:"2",label:"BeautifulSoup(html)",desc:"Parse the HTML into a searchable tree",color:t.accent},{n:"3",label:"soup.find / select",desc:"Extract the elements you want",color:t.green},{n:"4",label:"tag.text / tag['href']",desc:"Get text content or attribute values",color:t.amber},{n:"5",label:"json.dump / csv.writer",desc:"Save results to a file",color:t.rose}].map(s=>e.jsxs("div",{style:{display:"flex",gap:12,padding:"8px 0",borderBottom:`1px solid ${t.border}`,alignItems:"flex-start"},children:[e.jsx("span",{style:{width:22,height:22,borderRadius:"50%",background:`${s.color}22`,color:s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0,marginTop:1},children:s.n}),e.jsxs("div",{children:[e.jsx("div",{style:{color:s.color,fontSize:12},children:s.label}),e.jsx("div",{style:{color:t.muted2,fontSize:11,marginTop:2},children:s.desc})]})]},s.n))})]}),e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"Installation"}),e.jsx(a,{lang:"py",code:`# Install the required libraries
# In your terminal:
pip install requests beautifulsoup4

# On Alpine Linux (Acode/Termux):
pip3 install requests beautifulsoup4`})]})]})}function x(){return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"📡 requests Library"}),e.jsx(a,{lang:"py",showLines:!0,code:`import requests

# Basic GET request
response = requests.get("https://example.com")

print(response.status_code)  # 200 = OK
print(response.url)          # final URL (after redirects)
print(response.headers)      # HTTP headers dict
print(len(response.text))    # how many characters

# Always check status!
if response.status_code == 200:
    html = response.text      # the page's HTML
else:
    print(f"Failed: {response.status_code}")

# Shortcut — raise exception for bad status
response.raise_for_status()  # raises if 4xx or 5xx`})]}),e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"Headers & Session"}),e.jsx(a,{lang:"py",showLines:!0,code:`import requests

# Add headers to look like a real browser
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 Chrome/120.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

response = requests.get("https://example.com", headers=HEADERS)

# Session — reuse connection, persist cookies
session = requests.Session()
session.headers.update(HEADERS)

# All requests through session keep cookies / headers
r1 = session.get("https://site.com/login")
r2 = session.get("https://site.com/dashboard")  # still logged in

# Timeout — don't wait forever
response = requests.get(url, timeout=10)  # seconds`}),e.jsx(l,{type:"warn",children:"Many websites block requests without a User-Agent header. Always set one to mimic a real browser."})]})]})}function b(){return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"🥣 BeautifulSoup — Parse HTML"}),e.jsx(a,{lang:"py",showLines:!0,code:`import requests
from bs4 import BeautifulSoup

response = requests.get("https://books.toscrape.com")
soup = BeautifulSoup(response.text, "html.parser")

# Navigate the tree
print(soup.title)          # <title>Books to Scrape</title>
print(soup.title.text)     # "Books to Scrape"
print(soup.h1.text)        # first <h1>
print(soup.a["href"])      # href attribute of first <a>

# find() — returns FIRST matching tag
title = soup.find("h1")
link  = soup.find("a", href=True)
box   = soup.find("div", class_="product_pod")

# find_all() — returns LIST of all matches
headings = soup.find_all("h3")         # all h3 tags
links    = soup.find_all("a")          # all anchor tags
cards    = soup.find_all("article", class_="product_pod")

print(f"Found {len(cards)} books")`})]}),e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"Complete Example — Scrape Books"}),e.jsx(a,{lang:"py",showLines:!0,code:`import requests
from bs4 import BeautifulSoup
import time

BASE_URL = "https://books.toscrape.com/catalogue/"
HEADERS  = {"User-Agent": "Mozilla/5.0 (Educational scraper)"}

def scrape_page(url):
    response = requests.get(url, headers=HEADERS)
    soup     = BeautifulSoup(response.text, "html.parser")
    books    = []

    for article in soup.find_all("article", class_="product_pod"):
        title = article.h3.a["title"]        # book title
        price = article.find(
            "p", class_="price_color"
        ).text.strip()                        # "£12.99"
        rating = article.p["class"][1]        # "Three"
        books.append({
            "title":  title,
            "price":  price,
            "rating": rating,
        })
    return books

# Scrape first 3 pages
all_books = []
for page_num in range(1, 4):
    url   = f"{BASE_URL}page-{page_num}.html"
    books = scrape_page(url)
    all_books.extend(books)
    print(f"Page {page_num}: scraped {len(books)} books")
    time.sleep(1)    # be polite — wait 1 second!

print(f"Total: {len(all_books)} books")`})]})]})}function y(){return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"🎯 CSS Selectors with .select()"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["If you know CSS, you can use the same selector syntax with BeautifulSoup's ",e.jsx(n,{children:".select()"})," method — often more concise than find_all."]}),e.jsx(a,{lang:"py",showLines:!0,code:`from bs4 import BeautifulSoup

soup = BeautifulSoup(html, "html.parser")

# Tag selectors
soup.select("h1")           # all <h1> tags
soup.select("p")            # all <p> tags

# Class selectors
soup.select(".card")        # class="card"
soup.select(".price.sale")  # has both classes

# ID selectors
soup.select("#main")        # id="main"

# Attribute selectors
soup.select("a[href]")               # <a> with href
soup.select('a[href^="https"]')      # href starts with https
soup.select('img[src$=".jpg"]')      # src ends with .jpg
soup.select('[data-id="42"]')        # custom data attribute

# Descendant selectors
soup.select("div.card h3")          # h3 inside .card div
soup.select("ul.menu > li")         # direct child li of .menu ul
soup.select("div.card a.title")     # .title link inside .card

# select() returns a list — select_one() returns the first
first_link = soup.select_one("nav a")`})]}),e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"Getting Values"}),e.jsx(a,{lang:"py",showLines:!0,code:`# For each element
for tag in soup.select("article.product"):
    # Text content
    title  = tag.select_one("h3").text.strip()

    # Attribute
    link   = tag.select_one("a")["href"]         # KeyError if missing
    link   = tag.select_one("a").get("href", "") # safe

    # Nested element text
    price  = tag.select_one(".price").get_text(strip=True)

    # Image source
    img    = tag.select_one("img")
    src    = img["src"] if img else ""

    # Check class
    is_sale = "sale" in tag.get("class", [])

    print(title, price, link)`})]})]})}function S(){return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"📝 POST Requests & Forms"}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:"Some data is only accessible after submitting a form — like a search box. Use POST requests to simulate form submissions."}),e.jsx(a,{lang:"py",showLines:!0,code:`import requests
from bs4 import BeautifulSoup

# Inspect the form first in browser DevTools (F12)
# Look for: <form action="/search" method="POST">
#           <input name="q">

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Educational)"
})

# GET the page first (for cookies / CSRF token)
page = session.get("https://example.com/search")
soup = BeautifulSoup(page.text, "html.parser")

# Extract hidden CSRF token if needed
csrf = soup.find("input", {"name": "csrf_token"})
token = csrf["value"] if csrf else ""

# Submit form data
result = session.post(
    "https://example.com/search",
    data={
        "q":          "python tutorial",
        "csrf_token": token,
    }
)

# Parse the results
results_soup = BeautifulSoup(result.text, "html.parser")
for item in results_soup.select(".search-result"):
    print(item.select_one("h3").text)`})]}),e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"Query Parameters (GET forms)"}),e.jsx(a,{lang:"py",showLines:!0,code:`import requests

# Many search forms just add params to the URL
# e.g. https://site.com/search?q=python&page=1

# Method 1 — manual URL
response = requests.get(
    "https://books.toscrape.com/catalogue/search/",
    params={"q": "mystery", "page": 1}
)
print(response.url)  # shows full URL with params

# Method 2 — loop pages
for page in range(1, 6):
    response = requests.get(
        "https://example.com/products",
        params={"category": "books", "page": page, "limit": 20}
    )
    # process page...`})]})]})}function j(){return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"💾 Save Data to Files"}),e.jsx(a,{lang:"py",showLines:!0,code:`import json
import csv
from pathlib import Path

books = [
    {"title": "Python Crash Course", "price": "£25.99", "rating": "Five"},
    {"title": "Automate the Boring Stuff", "price": "£18.50", "rating": "Four"},
]

# ─── Save as JSON ───────────────────────────────────────────
Path("books.json").write_text(
    json.dumps(books, indent=2, ensure_ascii=False)
)

# ─── Save as CSV ────────────────────────────────────────────
with open("books.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["title","price","rating"])
    writer.writeheader()
    writer.writerows(books)

# ─── Save to SQLite ─────────────────────────────────────────
import sqlite3

conn   = sqlite3.connect("scrape.db")
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS books (
        id     INTEGER PRIMARY KEY AUTOINCREMENT,
        title  TEXT,
        price  TEXT,
        rating TEXT
    )
""")
for book in books:
    cursor.execute(
        "INSERT INTO books (title, price, rating) VALUES (?,?,?)",
        (book["title"], book["price"], book["rating"])
    )
conn.commit()
conn.close()
print(f"Saved {len(books)} books to SQLite")`})]}),e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"Full Production Pipeline"}),e.jsx(a,{lang:"py",showLines:!0,code:`import requests, json, time
from bs4 import BeautifulSoup
from pathlib import Path

HEADERS = {"User-Agent": "Mozilla/5.0 (Educational scraper)"}
OUTPUT  = Path("data")
OUTPUT.mkdir(exist_ok=True)

def scrape(url: str) -> dict:
    """Scrape a single page and return structured data."""
    res  = requests.get(url, headers=HEADERS, timeout=10)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, "html.parser")

    return {
        "url":    url,
        "title":  soup.title.text.strip() if soup.title else "",
        "links":  [
            a.get("href","") for a in soup.select("a[href]")
        ][:20],  # first 20 links only
    }

URLS = [
    "https://books.toscrape.com",
    "https://books.toscrape.com/catalogue/page-2.html",
]

results = []
for i, url in enumerate(URLS):
    try:
        print(f"[{i+1}/{len(URLS)}] {url}")
        data = scrape(url)
        results.append(data)
        time.sleep(1.5)      # rate limit!
    except Exception as e:
        print(f"  Error: {e}")

(OUTPUT / "results.json").write_text(
    json.dumps(results, indent=2)
)
print(f"Done. Saved {len(results)} pages.")`})]})]})}function T(){return e.jsxs(e.Fragment,{children:[e.jsxs(r,{children:[e.jsx(o,{color:t.rose,children:"⚖ Ethics & Legality"}),e.jsx(l,{type:"warn",children:"Web scraping exists in a grey area. Always check a site's Terms of Service and robots.txt before scraping."})]}),[{title:"✅ Always Do This",color:t.green,items:["Check robots.txt — https://site.com/robots.txt","Read the Terms of Service for scraping policies","Add delays (time.sleep) — 1–3 seconds between requests","Set a descriptive User-Agent identifying your bot","Only collect data you actually need","Use official APIs if they exist","Cache responses to avoid re-scraping"]},{title:"❌ Never Do This",color:t.rose,items:["Scrape at high speed (no sleep) — it's like a DDoS attack","Scrape personal data without consent","Bypass login walls or paywalls","Ignore robots.txt Disallow rules","Republish scraped content commercially without permission","Overwhelm small/hobby websites"]}].map(s=>e.jsxs(r,{children:[e.jsx(o,{color:s.color,children:s.title}),e.jsx("div",{children:s.items.map(i=>e.jsxs("div",{style:{display:"flex",gap:10,padding:"6px 0",borderBottom:`1px solid ${t.border}`,fontSize:12.5,color:t.muted2,alignItems:"flex-start"},children:[e.jsx("span",{style:{color:s.color,fontSize:14,flexShrink:0},children:s.color===t.green?"✓":"✗"}),e.jsx("span",{children:i})]},i))})]},s.title)),e.jsxs(r,{children:[e.jsx(o,{color:t.sky,children:"robots.txt Example"}),e.jsx(a,{lang:"py",code:`# https://example.com/robots.txt

User-agent: *          # applies to all bots
Disallow: /admin/      # don't scrape /admin/
Disallow: /private/    # don't scrape /private/
Allow: /               # everything else is OK

Crawl-delay: 2         # wait 2 seconds between requests

# Specific bot rule
User-agent: Googlebot
Allow: /`}),e.jsxs(l,{type:"info",children:["If ",e.jsx(n,{children:"Disallow: /"})," — don't scrape that site at all. If there's an API, use it instead."]})]})]})}function v(){const[s,i]=p.useState(()=>{try{return localStorage.getItem("cif_tab_scraping")??"intro"}catch{return"intro"}}),c={intro:e.jsx(f,{}),requests:e.jsx(x,{}),bs4:e.jsx(b,{}),select:e.jsx(y,{}),forms:e.jsx(S,{}),save:e.jsx(j,{}),ethics:e.jsx(T,{})};return e.jsxs("div",{children:[e.jsx(u,{eyebrow:"Web Scraping · Beginner",title:"Web Scraping",sub:"Extract data from any website using requests + BeautifulSoup",color:"#94a3b8"}),e.jsxs("div",{style:{padding:"0 24px 40px"},children:[e.jsx("p",{style:{fontSize:13,color:t.muted2,lineHeight:1.7,marginBottom:20},children:"Web scraping turns the entire internet into your personal dataset. Job boards, sports stats, product prices, news headlines, government data — all of it is accessible with 20 lines of Python. Data scientists, researchers, and freelancers use scrapers constantly."}),e.jsx(d,{tabs:m,active:s,onChange:i,pageId:"scraping"}),s==="quiz"?e.jsxs(r,{children:[e.jsx(o,{color:t.muted2,children:"🎯 Web Scraping Quiz"}),e.jsx(h,{questions:g,trackId:"scraping"})]}):c[s]]})]})}export{v as default};
