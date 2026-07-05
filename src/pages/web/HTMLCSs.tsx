import { storage } from "../../services/storage";
import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"whatishtml",  label:"What is HTML"      },
  { id:"basics",      label:"HTML Basics"       },
  { id:"elements",    label:"HTML Elements"     },
  { id:"forms",       label:"Forms & Input"     },
  { id:"whatiscss",   label:"What is CSS"       },
  { id:"cssbasics",   label:"CSS Basics"        },
  { id:"selectors",   label:"Selectors"         },
  { id:"boxmodel",    label:"Box Model"         },
  { id:"flexbox",     label:"Flexbox"           },
  { id:"grid",        label:"CSS Grid"          },
  { id:"responsive",  label:"Responsive Design" },
  { id:"project",     label:"Mini Project"      },
  { id:"quiz",        label:"Quiz 🎯"           },
];

const QUIZ: Question[] = [
  { q:"What does HTML stand for?", opts:["Hyperlink & Text Markup Language","HyperText Markup Language","HyperText Machine Language","HighText Markup Language"], ans:1, exp:"HTML stands for HyperText Markup Language. HyperText means text with links. Markup means you annotate content with tags that describe its meaning." },
  { q:"Which tag makes the biggest heading?", opts:["<h6>","<heading>","<h1>","<big>"], ans:2, exp:"<h1> is the biggest, most important heading. They go from h1 (biggest) to h6 (smallest). Use only one <h1> per page — it's like the page title for search engines." },
  { q:"How do you make a link to an external website?", opts:['<link href="url">','<a src="url">','<a href="url">','<url>'], ans:2, exp:'<a href="https://..."> creates a clickable link. The href attribute holds the URL. Add target="_blank" to open in a new tab.' },
  { q:"Which CSS property changes the text color?", opts:["font-color","text-color","color","foreground"], ans:2, exp:"The color property sets the text color in CSS. You can use color names (red), hex (#ff0000), rgb(255,0,0), or hsl values." },
  { q:"What does the CSS box model include?", opts:["content, padding, border, margin","width, height, font, color","position, display, float, clear","selector, property, value, rule"], ans:0, exp:"Every HTML element is a box with four layers: content (the actual stuff), padding (space inside the border), border (the edge), and margin (space outside the border)." },
  { q:"What CSS property makes an element a flex container?", opts:["display: flex","position: flex","flex: true","layout: flex"], ans:0, exp:"display: flex turns an element into a flex container. Its direct children become flex items that you can align and distribute with justify-content and align-items." },
  { q:"Which meta tag makes a site mobile-friendly?", opts:['<meta charset="UTF-8">','<meta name="viewport" content="width=device-width, initial-scale=1">','<meta name="mobile">','<meta responsive>'], ans:1, exp:'The viewport meta tag tells the browser to use the device\'s actual width instead of pretending it\'s a desktop. Without it, your media queries won\'t work on mobile.' },
  { q:"What does CSS grid's 'fr' unit mean?", opts:["font-ratio","fractional unit — divides available space","frame","frequency"], ans:1, exp:"fr stands for fractional unit. 1fr means 'take 1 share of the available space'. So grid-template-columns: 1fr 2fr gives you two columns where the second is twice as wide." },
  { q:"What is the correct CSS selector for all elements with class 'card'?", opts:["#card","card",".card","*card"], ans:2, exp:".card selects all elements with class='card'. #card selects an element with id='card'. The period (.) is for classes, the hash (#) is for IDs." },
  { q:"Which HTML input type shows a password field (hides characters)?", opts:['type="hidden"','type="text"','type="password"','type="secret"'], ans:2, exp:'type="password" masks the input so nobody can shoulder-surf your password. The data is still sent in plain text unless you use HTTPS — always use HTTPS for forms.' },
];

function TabWhatIsHTML() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>🌐 What is HTML?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Every single webpage you've ever visited is built with HTML. It's not a programming language — it doesn't do logic. It's a <strong style={{ color:T.text }}>markup language</strong> that tells the browser what content to show and what it means. Heading? Paragraph? Link? Image? That's HTML's job.
      </p>
      <InfoBox type="info">HTML stands for <strong style={{ color:T.text }}>HyperText Markup Language</strong>. HyperText = text with links. Markup = describing content with tags. It's been the backbone of the web since 1991.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>🏠 Real World Analogy</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Think of a webpage like building a house. <strong style={{ color:T.text }}>HTML is the frame and walls</strong> — it gives everything structure and says "this is a door, this is a window, this is a wall." CSS is the paint, furniture, and decoration. JavaScript is the electricity and plumbing that makes things work.
      </p>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65 }}>
        You can build a house with just the frame — it'll be ugly, but it'll stand. That's a webpage with only HTML.
      </p>
    </Card>
    <Card>
      <CardTitle color={T.amber}>🔤 How HTML Tags Work</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        HTML uses <strong style={{ color:T.text }}>tags</strong> to wrap content. Most tags come in pairs: an opening tag and a closing tag (with a slash). The browser reads these tags and decides how to display the content.
      </p>
      <CodeBlock lang="html" showLines code={`<!-- Opening tag + content + closing tag = element -->
<p>This is a paragraph.</p>

<!-- The tag name tells the browser what this IS -->
<h1>This is a main heading</h1>     <!-- most important -->
<h2>This is a subheading</h2>       <!-- second level -->
<p>This is a paragraph of text.</p> <!-- body text -->

<!-- Some tags are self-closing — they don't wrap content -->
<img src="photo.jpg" alt="A photo"> <!-- image -->
<br>                                 <!-- line break -->
<hr>                                 <!-- horizontal rule -->`}/>
      <InfoBox type="tip">Browsers are very forgiving — they'll try to display broken HTML. But that doesn't mean you should write broken HTML. Bad structure causes weird layouts and hurts search rankings.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Common Mistakes to Avoid</CardTitle>
      {[
        { bad:"Forgetting closing tags: <p>Hello", good:"Always close: <p>Hello</p>", color:T.rose },
        { bad:"Wrong nesting: <b><i>text</b></i>", good:"Correct nesting: <b><i>text</i></b>", color:T.rose },
        { bad:"Using tags for looks: <br><br><br> for spacing", good:"Use CSS margins for spacing", color:T.amber },
        { bad:"Missing alt on images: <img src='x.jpg'>", good:"Always: <img src='x.jpg' alt='description'>", color:T.amber },
      ].map((m, i) => (
        <div key={i} style={{ background:T.bg2, borderRadius:8, padding:"10px 12px", marginBottom:8, fontSize:12 }}>
          <div style={{ color:T.rose, fontFamily:"'Fira Code',monospace", marginBottom:4 }}>✗ {m.bad}</div>
          <div style={{ color:T.green, fontFamily:"'Fira Code',monospace" }}>✓ {m.good}</div>
        </div>
      ))}
    </Card>
  </>);
}

function TabBasics() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>📄 The HTML Document Structure</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Every HTML page has the same skeleton. You'll write this so many times it'll become muscle memory. Let's break down every single line so you know why it's there.
      </p>
      <CodeBlock lang="html" showLines code={`<!DOCTYPE html>
<!-- ↑ tells the browser: "this is HTML5, use modern rules"
     without this, browsers enter "quirks mode" and act weird -->

<html lang="en">
<!-- ↑ the root element — everything goes inside here
     lang="en" helps screen readers and search engines -->

  <head>
  <!-- ↑ info ABOUT the page — not visible on screen -->

    <meta charset="UTF-8">
    <!-- ↑ supports all characters including emoji and accented letters
         without this, special characters show as garbage -->

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- ↑ makes the page work on mobile phones
         without this, mobile browsers zoom out and everything looks tiny -->

    <title>My Page Title</title>
    <!-- ↑ shows in the browser tab and search results
         this is very important for SEO -->

    <link rel="stylesheet" href="style.css">
    <!-- ↑ loads your CSS file — rel tells browser it's a stylesheet -->

  </head>

  <body>
  <!-- ↑ everything visible on screen goes here -->

    <h1>Welcome to My Site</h1>
    <p>This is my first webpage.</p>

  </body>

</html>
<!-- ↑ always close the html tag at the very end -->`}/>
      <InfoBox type="warn">The <IC>{"<meta viewport>"}</IC> tag is not optional if you want your site to look good on phones. Forget it and your site will look like a zoomed-out desktop page on mobile.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Head vs Body — What Goes Where</CardTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:T.amber, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>{"<HEAD>"} — metadata</div>
          <CodeBlock lang="html" code={`<!-- Not visible to users -->
<title>Page title (tab)</title>
<meta charset="UTF-8">
<meta name="viewport" ...>
<meta name="description" ...>
<link rel="stylesheet" href="...">
<script src="..." defer></script>`}/>
        </div>
        <div>
          <div style={{ fontSize:10, color:T.green, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>{"<BODY>"} — content</div>
          <CodeBlock lang="html" code={`<!-- Everything users see -->
<header>...</header>
<nav>...</nav>
<main>
  <h1>Heading</h1>
  <p>Paragraph</p>
</main>
<footer>...</footer>`}/>
        </div>
      </div>
    </Card>
    <Card>
      <CardTitle color={T.amber}>💬 HTML Comments</CardTitle>
      <CodeBlock lang="html" showLines code={`<!-- This is a comment — browser ignores it -->
<!-- Use comments to explain your code or leave reminders -->

<!-- TODO: add login form here -->
<!-- WARNING: don't delete this div — it holds the menu -->

<!-- You can comment out code to disable it temporarily:
<p>This paragraph won't show up</p>
-->

<!-- Comments are visible in View Source (F12) — don't put
     passwords or secrets in HTML comments! -->`}/>
      <InfoBox type="info">HTML comments are great for explaining your structure, but remember — anyone can read your source code. Never put API keys or passwords in comments.</InfoBox>
    </Card>
  </>);
}

function TabElements() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>📝 Text Elements</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        These are the elements you'll use most. They tell the browser — and search engines — what role each piece of content plays.
      </p>
      <CodeBlock lang="html" showLines code={`<!-- Headings: h1 is biggest and most important -->
<h1>Main Page Title</h1>      <!-- use ONCE per page -->
<h2>Section Heading</h2>      <!-- sub-sections -->
<h3>Sub-section</h3>          <!-- goes down to h6 -->

<!-- Paragraph: the workhorse of text content -->
<p>This is a paragraph. Browsers add margin above and below
   automatically. Line breaks in your code are ignored.</p>

<!-- Inline text formatting -->
<strong>Bold / important text</strong>   <!-- bold + semantic meaning -->
<em>Italic / emphasized text</em>        <!-- italic + semantic meaning -->
<code>inline code like this</code>       <!-- monospace, great for code snippets -->
<mark>highlighted text</mark>            <!-- yellow highlight -->
<small>fine print text</small>           <!-- smaller text -->
<del>deleted text</del>                  <!-- strikethrough -->
<sup>superscript</sup>                   <!-- for footnotes, math -->

<!-- Line break (use sparingly — prefer CSS margins) -->
First line<br>Second line

<!-- Horizontal divider -->
<hr>`}/>
      <InfoBox type="tip">Use <IC>{"<strong>"}</IC> for important text, not just to make something bold. Screen readers announce "strong" differently. If you just want bold styling, use CSS <IC>font-weight: bold</IC> instead.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>🔗 Links & Images</CardTitle>
      <CodeBlock lang="html" showLines code={`<!-- Anchor tag: makes anything a clickable link -->
<a href="https://google.com">Visit Google</a>
<!-- href = "hypertext reference" — the destination URL -->

<a href="about.html">About page</a>       <!-- relative link (same site) -->
<a href="/contact">Contact</a>             <!-- absolute path -->
<a href="mailto:me@email.com">Email me</a> <!-- opens mail app -->
<a href="tel:+1234567890">Call me</a>      <!-- opens phone app on mobile -->

<!-- Open in new tab (always add rel="noopener" for security) -->
<a href="https://github.com" target="_blank" rel="noopener">GitHub</a>

<!-- Image: src = source file, alt = text if image fails to load -->
<img src="photo.jpg" alt="A sunset over the ocean">
<!-- alt is NOT optional — screen readers read it aloud -->
<!-- and it shows when the image fails to load -->

<!-- Image with specific size -->
<img src="logo.png" alt="Company logo" width="200" height="80">

<!-- Image that is also a link -->
<a href="/">
  <img src="logo.png" alt="Go to homepage">
</a>`}/>
      <InfoBox type="warn">Always write meaningful alt text. <IC>alt=""</IC> (empty) is OK for decorative images, but <IC>alt="image.jpg"</IC> is useless. Think: what would you say to describe this to someone who can't see it?</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>📋 Lists</CardTitle>
      <CodeBlock lang="html" showLines code={`<!-- Unordered list: bullet points -->
<ul>
  <li>Python</li>      <!-- li = list item -->
  <li>JavaScript</li>
  <li>HTML & CSS</li>
</ul>

<!-- Ordered list: numbered -->
<ol>
  <li>Install Python</li>   <!-- automatically numbered 1, 2, 3... -->
  <li>Write your script</li>
  <li>Run it</li>
</ol>

<!-- Nested list -->
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Python</li>
      <li>Flask</li>
    </ul>
  </li>
</ul>

<!-- Description list: term + definition -->
<dl>
  <dt>HTML</dt>            <!-- dt = description term -->
  <dd>Structures content</dd>  <!-- dd = description detail -->
  <dt>CSS</dt>
  <dd>Styles the content</dd>
</dl>`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>🏗 Semantic vs Div Soup</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        HTML5 introduced semantic elements — tags that <em>mean</em> something beyond just "box". Use them instead of endless divs.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:T.rose, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>BAD — div soup</div>
          <CodeBlock lang="html" code={`<div id="header">...</div>
<div id="nav">...</div>
<div id="main">
  <div class="article">
    <div class="title">...</div>
  </div>
</div>
<div id="footer">...</div>`}/>
        </div>
        <div>
          <div style={{ fontSize:10, color:T.green, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>GOOD — semantic</div>
          <CodeBlock lang="html" code={`<header>...</header>
<nav>...</nav>
<main>
  <article>
    <h2>Title</h2>
    <p>Content...</p>
  </article>
</main>
<footer>...</footer>`}/>
        </div>
      </div>
      <InfoBox type="info">Semantic HTML helps search engines understand your page, makes accessibility better, and makes your code easier to read. Use <IC>{"<header>"}</IC>, <IC>{"<nav>"}</IC>, <IC>{"<main>"}</IC>, <IC>{"<section>"}</IC>, <IC>{"<article>"}</IC>, <IC>{"<aside>"}</IC>, <IC>{"<footer>"}</IC>.</InfoBox>
    </Card>
  </>);
}

function TabForms() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>📝 Your First Form</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Forms are how users send data to your server — login pages, signup forms, search boxes, contact forms. Every web app uses them. The <IC>action</IC> says where to send the data, <IC>method</IC> says how.
      </p>
      <CodeBlock lang="html" showLines code={`<!-- action = URL to send data to, method = GET or POST -->
<form action="/submit" method="POST">

  <!-- Label: what the input is for (click label to focus input) -->
  <label for="name">Your Name:</label>
  <!-- for="name" must match the input's id="name" — this links them -->
  <input type="text" id="name" name="name" placeholder="Alice">

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>
  <!-- required = browser won't submit without this filled in -->
  <!-- type="email" validates email format automatically -->

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>
  <!-- textarea is for multi-line text — it's not self-closing! -->

  <!-- Submit button sends the form -->
  <button type="submit">Send Message</button>

</form>`}/>
      <InfoBox type="tip">Always connect <IC>{"<label>"}</IC> to its input with <IC>for</IC> and <IC>id</IC>. This makes the label clickable (it focuses the input) and is required for screen readers. Skipping labels is one of the most common accessibility mistakes.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>🔧 All Input Types</CardTitle>
      <CodeBlock lang="html" showLines code={`<!-- Text inputs -->
<input type="text"     placeholder="Short text">
<input type="email"    placeholder="user@example.com">
<input type="password" placeholder="Hidden characters">
<input type="number"   min="0" max="100" step="1">
<input type="tel"      placeholder="Phone number">
<input type="url"      placeholder="https://...">
<input type="search"   placeholder="Search...">

<!-- Date & time -->
<input type="date">           <!-- date picker -->
<input type="time">           <!-- time picker -->
<input type="datetime-local"> <!-- both -->

<!-- Choice inputs -->
<input type="checkbox" id="agree" name="agree">
<label for="agree">I agree to terms</label>

<!-- Radio buttons (group by same name) -->
<input type="radio" name="size" value="S" id="s"> <label for="s">Small</label>
<input type="radio" name="size" value="M" id="m"> <label for="m">Medium</label>
<input type="radio" name="size" value="L" id="l"> <label for="l">Large</label>

<!-- Dropdown select -->
<select name="country">
  <option value="">Choose country...</option>
  <option value="ke">Kenya</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
</select>

<!-- File upload -->
<input type="file" accept=".pdf,.jpg,.png">

<!-- Range slider -->
<input type="range" min="0" max="100" value="50">

<!-- Hidden field (sent with form but not visible) -->
<input type="hidden" name="csrf_token" value="abc123">`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>✅ Form Validation Attributes</CardTitle>
      <CodeBlock lang="html" showLines code={`<!-- required — field must be filled -->
<input type="text" required>

<!-- minlength/maxlength — character count limits -->
<input type="text" minlength="3" maxlength="50">

<!-- min/max — number range limits -->
<input type="number" min="18" max="120">

<!-- pattern — must match a regex -->
<input type="text" pattern="[A-Z]{3}" title="Three uppercase letters">

<!-- autocomplete — browser fills in saved data -->
<input type="email" autocomplete="email">
<input type="password" autocomplete="current-password">

<!-- disabled — can't interact with it -->
<input type="text" disabled value="Cannot edit">

<!-- readonly — visible but can't change -->
<input type="text" readonly value="View only">

<!-- autofocus — cursor goes here when page loads -->
<input type="search" autofocus placeholder="Search...">`}/>
      <InfoBox type="warn">Browser validation is a convenience for users, NOT security. Always validate on the server too. A hacker can send raw HTTP requests and skip your HTML form entirely.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Common Form Mistakes</CardTitle>
      {[
        { bad:"Using <input> without <label> — screen readers can't tell what it is", color:T.rose },
        { bad:"Using type='text' for emails — you lose built-in email validation", color:T.amber },
        { bad:"Not setting name attribute — Flask/server won't receive the data", color:T.rose },
        { bad:"Forgetting method='POST' for login/signup — data goes in the URL", color:T.rose },
        { bad:"Only relying on HTML required — skip it with browser dev tools in 5 seconds", color:T.amber },
      ].map((m, i) => (
        <div key={i} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom:`1px solid ${T.border}`, fontSize:12, color:T.muted2 }}>
          <span style={{ color:m.color, flexShrink:0 }}>✗</span>
          <span>{m.bad}</span>
        </div>
      ))}
    </Card>
  </>);
}

function TabWhatIsCSS() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>🎨 What is CSS?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        CSS stands for <strong style={{ color:T.text }}>Cascading Style Sheets</strong>. If HTML is the frame of the house, CSS is everything visual — the paint, the furniture, the lighting. It controls colors, fonts, spacing, layout, animations, and how the page adapts to different screen sizes.
      </p>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65 }}>
        The "Cascading" part means styles flow down — a style on a parent element affects its children, unless overridden. Multiple style rules can apply to the same element, and the browser figures out which one wins.
      </p>
      <InfoBox type="info">CSS is separate from HTML on purpose. You write one CSS file and it styles an entire site. Change one color in CSS and it updates everywhere. That's the power of separation.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>🏠 Real World Analogy</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        HTML gives you rooms (header, nav, main, footer). CSS decides what those rooms look like. You can tell CSS: "every room with the word 'bedroom' should have blue walls." That's what selectors do — they target specific elements.
      </p>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65 }}>
        The "cascading" part is like interior design rules: a house-wide rule says beige walls, but the living room overrides that with white, and one specific corner overrides that with an accent wall. The most specific rule wins.
      </p>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📐 CSS Syntax</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        A CSS rule has three parts: a selector (who to style), a property (what to change), and a value (what to change it to). That's it.
      </p>
      <CodeBlock lang="css" showLines code={`/* selector { property: value; } */

/* This targets ALL <p> elements on the page */
p {
  color: #333333;      /* text color — dark gray */
  font-size: 16px;     /* text size */
  line-height: 1.6;    /* space between lines — 1.6x font-size */
  margin-bottom: 16px; /* space below each paragraph */
}

/* Target the element with id="hero" */
#hero {
  background-color: #0f172a;  /* dark navy background */
  padding: 60px 24px;         /* 60px top/bottom, 24px left/right */
  text-align: center;          /* center the text */
}

/* Target all elements with class="btn" */
.btn {
  background-color: #7c6dfa;  /* purple button */
  color: white;                /* white text */
  border: none;                /* remove default border */
  border-radius: 8px;          /* rounded corners */
  padding: 12px 24px;          /* comfortable click area */
  cursor: pointer;             /* show hand cursor on hover */
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>How to Include CSS</CardTitle>
      <CodeBlock lang="html" showLines code={`<!-- Method 1: External stylesheet (BEST — reusable across pages) -->
<head>
  <link rel="stylesheet" href="style.css">
  <!-- href points to your CSS file — put this in <head> -->
</head>

<!-- Method 2: Internal style block (OK for small single pages) -->
<head>
  <style>
    body { background: #111; color: white; }
    h1   { color: #7c6dfa; }
  </style>
</head>

<!-- Method 3: Inline styles (AVOID — hard to maintain, wins over everything) -->
<p style="color: red; font-size: 18px;">This works but don't overuse it</p>
<!--    ↑ only affects this one element, can't be reused -->`}/>
      <InfoBox type="tip">Use external CSS files for everything real. Inline styles are fine for quick tests or dynamic styles from JavaScript, but they make your HTML messy and your CSS impossible to manage.</InfoBox>
    </Card>
  </>);
}

function TabCSSBasics() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>🎨 Colors</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        CSS has four ways to write colors — and you'll see all of them in the wild. Hex is most common for designers, rgb/hsl are great when you need to tweak programmatically.
      </p>
      <CodeBlock lang="css" showLines code={`/* Named colors — 140+ built in */
color: red;
color: tomato;
color: dodgerblue;
color: forestgreen;

/* Hex — 6 digit code: #RRGGBB */
color: #ff0000;     /* red */
color: #0000ff;     /* blue */
color: #1a1a2e;     /* very dark navy — good for dark themes */
color: #e2e8f0;     /* light gray — good for body text on dark bg */

/* RGB — red, green, blue (0-255) */
color: rgb(255, 99, 71);      /* tomato red */
color: rgb(124, 109, 250);    /* purple accent */

/* RGBA — same + alpha (transparency: 0=invisible, 1=solid) */
background: rgba(0, 0, 0, 0.5);   /* 50% transparent black overlay */
background: rgba(124, 109, 250, 0.1); /* subtle purple tint */

/* HSL — hue (0-360), saturation (%), lightness (%) */
color: hsl(250, 89%, 70%);   /* purple */
color: hsl(160, 70%, 50%);   /* green */

/* Modern: oklch — best for consistent perceptual color */
color: oklch(65% 0.2 250);   /* works in modern browsers */`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>✍️ Typography</CardTitle>
      <CodeBlock lang="css" showLines code={`/* Font family — list fallbacks in order */
body {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  /* browser uses first font it has — sans-serif is last resort */
}

/* Font size */
h1   { font-size: 2.5rem; }   /* rem = relative to root (html) font size */
h2   { font-size: 1.8rem; }   /* 1rem = 16px by default */
p    { font-size: 1rem; }     /* 16px — comfortable reading size */
small{ font-size: 0.875rem; } /* 14px */

/* Weight, style, decoration */
.bold      { font-weight: 700; }        /* 400=normal, 700=bold */
.light     { font-weight: 300; }
.italic    { font-style: italic; }
.underline { text-decoration: underline; }
.no-decor  { text-decoration: none; }   /* removes link underlines */

/* Spacing */
p {
  line-height: 1.7;          /* 1.7x the font-size — easy to read */
  letter-spacing: 0.02em;    /* tiny bit of breathing room between letters */
  word-spacing: 0.1em;
}

/* Alignment */
.center { text-align: center; }
.right  { text-align: right; }
.left   { text-align: left; }   /* default */

/* Transform */
.upper { text-transform: uppercase; }  /* CSS uppercase, not HTML */
.lower { text-transform: lowercase; }`}/>
      <InfoBox type="tip">Use <IC>rem</IC> for font sizes, not <IC>px</IC>. Users can change their browser's default font size (accessibility need), and <IC>rem</IC> respects that. <IC>px</IC> ignores it.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>🖼 Backgrounds</CardTitle>
      <CodeBlock lang="css" showLines code={`.hero {
  /* Solid color */
  background-color: #0f172a;

  /* Gradient — smooth transition between colors */
  background: linear-gradient(135deg, #667eea, #764ba2);
  /* 135deg = direction, then color stops */

  /* Radial gradient — circular */
  background: radial-gradient(circle at center, #7c6dfa, #111);

  /* Image background */
  background-image: url("hero.jpg");
  background-size: cover;      /* fill the whole area (may crop) */
  background-position: center; /* center the image */
  background-repeat: no-repeat; /* don't tile */

  /* Image + color overlay trick */
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
              url("hero.jpg") center/cover;
  /* ↑ dark overlay on top of image so text stays readable */
}`}/>
    </Card>
  </>);
}

function TabSelectors() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>🎯 Basic Selectors</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Selectors are how CSS targets elements. Get this right and you'll rarely need to fight with specificity. The rule: prefer classes over IDs for styling.
      </p>
      <CodeBlock lang="css" showLines code={`/* Element selector — targets ALL of that tag */
p    { color: gray; }          /* every <p> */
h1   { font-size: 2rem; }      /* every <h1> */
a    { color: blue; }          /* every <a> */

/* Class selector — the dot (.) */
.card     { background: #1a1a2e; border-radius: 12px; }
.btn      { padding: 10px 20px; cursor: pointer; }
.text-red { color: #f43f5e; }  /* utility class */

/* ID selector — the hash (#) — should be unique per page */
#hero    { min-height: 100vh; }
#sidebar { width: 280px; }
/* Use IDs for JS (getElementById) and links (#section), not for styling */

/* Universal selector — everything */
* {
  box-sizing: border-box; /* one of the most common CSS resets */
  margin: 0;              /* remove default browser margins */
  padding: 0;
}

/* Group selector — same styles for multiple things */
h1, h2, h3, h4 {
  font-family: "Bricolage Grotesque", sans-serif;
  font-weight: 800;
  line-height: 1.2;
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>🔗 Combinators & Pseudo-selectors</CardTitle>
      <CodeBlock lang="css" showLines code={`/* Descendant — any level deep */
.card p    { color: #aaa; }    /* <p> anywhere inside .card */
nav a      { color: white; }   /* <a> anywhere inside <nav> */

/* Child — DIRECT children only */
.menu > li { display: flex; }  /* direct <li> children of .menu */

/* Adjacent sibling — immediately after */
h2 + p { margin-top: 0; }     /* <p> right after <h2> */

/* :hover — when mouse is over the element */
.btn:hover {
  background: #6558e0;   /* darken on hover */
  transform: translateY(-2px); /* subtle lift effect */
}

/* :focus — when keyboard or click focuses an input */
input:focus {
  outline: 2px solid #7c6dfa; /* show focus ring — important for accessibility */
  border-color: #7c6dfa;
}

/* :active — while clicking */
.btn:active { transform: translateY(0); } /* "press down" feel */

/* :first-child, :last-child, :nth-child */
li:first-child { border-top: none; }     /* first list item */
li:last-child  { border-bottom: none; }  /* last list item */
li:nth-child(even) { background: rgba(255,255,255,.05); } /* zebra stripe */

/* :not() — everything EXCEPT */
.card:not(.featured) { opacity: 0.8; }

/* :placeholder — style placeholder text */
input::placeholder { color: #555; font-style: italic; }`}/>
      <InfoBox type="info">The <IC>::before</IC> and <IC>::after</IC> pseudo-elements let you add decorative content with CSS only — no extra HTML tags needed. They're used constantly for custom bullet points, decorative lines, and overlay effects.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>⚖️ Specificity — Who Wins?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        When two rules target the same element, the more specific one wins. This trips up beginners a lot. The order from weakest to strongest:
      </p>
      <CodeBlock lang="css" code={`/* Weakest → Strongest */
p         { color: gray; }     /* element: 0,0,1 */
.text     { color: blue; }     /* class:   0,1,0 */
#header   { color: green; }    /* id:      1,0,0 */
p         { color: red !important; } /* !important: nuclear option */

/* More specific = higher score */
.card .title   { }  /* 0,2,0 — two classes */
#nav .item     { }  /* 1,1,0 — id + class */
.btn:hover     { }  /* 0,2,0 — class + pseudo-class */`}/>
      <InfoBox type="warn">Avoid <IC>!important</IC> — it makes debugging a nightmare. If you're fighting specificity, step back and rethink your selectors. A flat class-based system like BEM avoids these battles entirely.</InfoBox>
    </Card>
  </>);
}

function TabBoxModel() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>📦 The Box Model</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        This is the single most important concept in CSS layout. Every HTML element is a rectangular box with four layers. Understanding this will explain why elements are the size they are and why spacing works the way it does.
      </p>
      <CodeBlock lang="css" showLines code={`.box {
  /* Content — the actual text or image inside */
  width: 300px;     /* content width */
  height: 150px;    /* content height */

  /* Padding — space between content and border (INSIDE the border) */
  padding: 20px;            /* all four sides */
  padding: 10px 20px;       /* top/bottom, left/right */
  padding: 10px 20px 15px 20px; /* top, right, bottom, left */
  padding-top: 10px;        /* individual sides */

  /* Border — the actual visible edge */
  border: 2px solid #7c6dfa;  /* width, style, color */
  border-radius: 12px;         /* round the corners */
  border-top: 3px solid red;   /* one side only */

  /* Margin — space OUTSIDE the border (pushes other elements away) */
  margin: 20px;               /* all sides */
  margin: 0 auto;             /* 0 top/bottom, auto left/right = center! */
  margin-top: 24px;           /* one side */

  /* THE MOST IMPORTANT CSS RESET: */
  box-sizing: border-box;
  /* padding and border are INCLUDED in width/height
     without this: width=300 + 40padding + 4border = 344px total
     with this:    width=300px total, content shrinks to fit */
}`}/>
      <InfoBox type="warn">Always add <IC>* {"{"} box-sizing: border-box; {"}"}</IC> at the top of your CSS. Without it, adding padding to a 300px wide element makes it wider than 300px. This causes unexpected layouts and drives everyone crazy.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📐 Display: block vs inline</CardTitle>
      <CodeBlock lang="css" showLines code={`/* Block elements: take full width, stack vertically */
/* Default: div, p, h1-h6, ul, li, section, header, footer */
div { display: block; }
/* You can set width/height on block elements */

/* Inline elements: only as wide as their content, flow in text */
/* Default: span, a, strong, em, img, code */
span { display: inline; }
/* Width/height have NO effect on inline elements */

/* Inline-block: inline flow BUT you can set width/height */
.badge { display: inline-block; padding: 4px 8px; border-radius: 4px; }
/* Sits inline with text, but accepts box model properties */

/* None: completely hidden, takes no space */
.hidden { display: none; }
/* vs visibility: hidden — hidden but still takes up space */

/* Changing display */
a     { display: block; }         /* make links full-width */
li    { display: inline-block; }  /* horizontal nav items */
.img  { display: block; }         /* removes bottom gap on images */`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📌 Position</CardTitle>
      <CodeBlock lang="css" showLines code={`/* static — default, flows in the document */
.normal { position: static; }

/* relative — offset from its normal position */
.shifted { position: relative; top: 10px; left: 20px; }
/* still takes up space in the normal flow */

/* absolute — positioned relative to nearest non-static parent */
.parent { position: relative; }   /* establish a reference point */
.tooltip {
  position: absolute;
  top: -40px;           /* 40px above the parent's top edge */
  left: 50%;            /* horizontally centered */
  transform: translateX(-50%);
}

/* fixed — relative to the viewport (stays on screen while scrolling) */
.navbar {
  position: fixed;
  top: 0; left: 0;
  width: 100%;    /* stretch full width */
  z-index: 100;   /* appear above other content */
}

/* sticky — relative until you scroll to it, then fixed */
.section-header {
  position: sticky;
  top: 0;         /* stick to top when reached while scrolling */
}`}/>
    </Card>
  </>);
}

function TabFlexbox() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>🔀 Flexbox Basics</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Flexbox solves one of the oldest frustrations in CSS: laying things out in a row or column, centering them, and distributing space. Before Flexbox, this required float hacks. Now it's two lines of CSS.
      </p>
      <CodeBlock lang="css" showLines code={`/* Apply to the CONTAINER (parent) */
.container {
  display: flex;         /* turns on flexbox — children become flex items */

  /* Direction: which way items flow */
  flex-direction: row;         /* → left to right (default) */
  flex-direction: column;      /* ↓ top to bottom */
  flex-direction: row-reverse; /* ← right to left */

  /* Wrapping: what happens when items overflow */
  flex-wrap: nowrap;   /* all on one line (default, may overflow) */
  flex-wrap: wrap;     /* wrap to next line when needed */

  /* Shorthand */
  flex-flow: row wrap; /* flex-direction + flex-wrap */
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>↔️ Alignment</CardTitle>
      <CodeBlock lang="css" showLines code={`/* justify-content: align along the MAIN axis */
/* (horizontal if flex-direction: row) */
.container {
  justify-content: flex-start;     /* pack to left (default) */
  justify-content: flex-end;       /* pack to right */
  justify-content: center;         /* center horizontally */
  justify-content: space-between;  /* first|  gap  |last — no outside gap */
  justify-content: space-around;   /* gap around each item */
  justify-content: space-evenly;   /* equal gaps everywhere */
}

/* align-items: align along the CROSS axis */
/* (vertical if flex-direction: row) */
.container {
  align-items: stretch;     /* fill the container height (default) */
  align-items: flex-start;  /* align to top */
  align-items: flex-end;    /* align to bottom */
  align-items: center;      /* vertically center — this one gets used constantly */
  align-items: baseline;    /* align by text baseline */
}

/* THE classic centering trick */
.center-everything {
  display: flex;
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  /* ↑ two lines to center anything. You're welcome. */
}

/* gap: space between flex items */
.container { gap: 16px; }           /* all sides */
.container { gap: 8px 16px; }       /* row-gap, column-gap */`}/>
      <InfoBox type="tip">The single most useful thing Flexbox does: <IC>display: flex; align-items: center;</IC> vertically centers children. This used to require dark arts before Flexbox existed.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📊 Flex Item Properties</CardTitle>
      <CodeBlock lang="css" showLines code={`/* Apply to individual ITEMS (children) */

/* flex-grow: how much of extra space does this item take? */
.item       { flex-grow: 0; }   /* don't grow (default) */
.fill-space { flex-grow: 1; }   /* take all available space */
/* If two items both have flex-grow:1, they split space equally */

/* flex-shrink: can this item shrink if space is tight? */
.item          { flex-shrink: 1; }  /* can shrink (default) */
.no-shrink     { flex-shrink: 0; }  /* never shrink — good for icons/avatars */

/* flex-basis: initial size before growing/shrinking */
.item { flex-basis: 200px; }    /* start at 200px, then flex */
.item { flex-basis: auto; }     /* use width/height (default) */

/* Shorthand: flex: grow shrink basis */
.item    { flex: 0 1 auto; }  /* default */
.fill    { flex: 1; }         /* grow to fill, shorthand for flex: 1 1 0 */
.fixed   { flex: 0 0 200px; } /* always 200px, don't grow or shrink */

/* align-self: override parent's align-items for this item */
.special { align-self: flex-end; }  /* this one item aligns differently */

/* order: change visual order without changing HTML */
.move-first { order: -1; }  /* move to start visually */
.move-last  { order: 999; } /* move to end visually */`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>💡 Practical Flexbox Patterns</CardTitle>
      <CodeBlock lang="css" showLines code={`/* 1. Navbar with logo left, links right */
.navbar {
  display: flex;
  justify-content: space-between; /* logo |---gap---| links */
  align-items: center;
  padding: 16px 24px;
}

/* 2. Card grid (equal width cards) */
.card-row {
  display: flex;
  flex-wrap: wrap;     /* wrap to next row */
  gap: 16px;
}
.card-row > .card {
  flex: 1 1 280px;     /* grow/shrink, min-width 280px */
  /* cards fill the row and wrap when they can't fit */
}

/* 3. Sidebar + main content */
.layout {
  display: flex;
  min-height: 100vh;
}
.sidebar { flex: 0 0 280px; }  /* fixed 280px sidebar */
.main    { flex: 1; }           /* main takes all remaining space */

/* 4. Centering in a full-height section */
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`}/>
    </Card>
  </>);
}

function TabGrid() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>🔲 CSS Grid Basics</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        CSS Grid is for two-dimensional layouts — rows AND columns at the same time. Think of it like a spreadsheet you design for your webpage. Flexbox is for one direction; Grid is for the whole page layout.
      </p>
      <CodeBlock lang="css" showLines code={`/* Apply to the CONTAINER */
.grid {
  display: grid;

  /* Define columns: how many and how wide */
  grid-template-columns: 200px 1fr 1fr;
  /* ↑ first col = 200px fixed, next two split remaining space */

  grid-template-columns: repeat(3, 1fr);
  /* ↑ 3 equal columns — shorthand for 1fr 1fr 1fr */

  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  /* ↑ magic responsive grid — as many columns as fit, min 280px each */

  /* Define rows */
  grid-template-rows: 80px 1fr auto;
  /* ↑ header=80px, content=flexible, footer=auto height */

  /* Gap between cells */
  gap: 24px;           /* all gaps */
  gap: 16px 24px;      /* row-gap, column-gap */
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📐 Placing Items</CardTitle>
      <CodeBlock lang="css" showLines code={`/* By default, items fill cells left-to-right, top-to-bottom */
/* But you can explicitly place items: */

.item {
  /* grid-column: start-line / end-line */
  grid-column: 1 / 3;     /* spans columns 1 and 2 */
  grid-column: 1 / -1;    /* spans full width (-1 = last line) */
  grid-column: span 2;    /* span 2 columns from wherever it lands */

  /* grid-row: same idea for rows */
  grid-row: 1 / 3;        /* spans rows 1 and 2 */
  grid-row: span 2;       /* span 2 rows */
}

/* Named template areas — super readable! */
.page {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 70px 1fr 60px;
  grid-template-areas:
    "header  header"   /* header spans both columns */
    "sidebar main  "   /* sidebar left, main right */
    "footer  footer";  /* footer spans both columns */
  min-height: 100vh;
}

header  { grid-area: header;  background: #111; }
.sidebar{ grid-area: sidebar; background: #1a1a2e; }
main    { grid-area: main;    padding: 24px; }
footer  { grid-area: footer;  background: #111; }`}/>
      <InfoBox type="info">Grid template areas are one of the most readable things in CSS. You literally draw your layout in ASCII art inside the CSS. Try it once and you'll love it.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📸 Practical Grid Patterns</CardTitle>
      <CodeBlock lang="css" showLines code={`/* 1. Responsive photo gallery — auto-fills columns */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

/* 2. Card grid with equal heights */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 768px) {
  .cards { grid-template-columns: 1fr; } /* single column on mobile */
}

/* 3. Magazine/blog layout */
.featured {
  display: grid;
  grid-template-columns: 2fr 1fr;  /* main article is wider */
  gap: 24px;
}

/* 4. Centering with grid (alternative to flexbox) */
.center {
  display: grid;
  place-items: center;  /* shorthand for align-items + justify-items */
  min-height: 100vh;
}`}/>
    </Card>
  </>);
}

function TabResponsive() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>📱 Media Queries</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Media queries let your CSS change based on screen size. The standard approach: write your mobile styles first, then add media queries for larger screens. This is called <strong style={{ color:T.text }}>mobile-first design</strong>.
      </p>
      <CodeBlock lang="css" showLines code={`/* Mobile first: write base styles for mobile */
.container {
  padding: 16px;         /* tight padding on mobile */
  font-size: 15px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;  /* single column on mobile */
  gap: 16px;
}

/* Tablet: min-width means "at this width OR WIDER" */
@media (min-width: 640px) {
  .container { padding: 24px; }
  .grid { grid-template-columns: repeat(2, 1fr); } /* 2 columns */
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 40px; font-size: 16px; }
  .grid { grid-template-columns: repeat(3, 1fr); } /* 3 columns */
}

/* Large desktop */
@media (min-width: 1280px) {
  .container { max-width: 1200px; margin: 0 auto; }
  /* cap width so lines don't get too long to read */
}

/* Dark mode preference (from OS) */
@media (prefers-color-scheme: dark) {
  body { background: #0f172a; color: #e2e8f0; }
}

/* Reduced motion (accessibility) */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition: none !important; }
}`}/>
      <InfoBox type="warn">Don't forget the viewport meta tag in your HTML: <IC>{'<meta name="viewport" content="width=device-width, initial-scale=1">'}</IC>. Without it, your media queries are completely ignored on mobile devices.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📐 Fluid Typography & Spacing</CardTitle>
      <CodeBlock lang="css" showLines code={`/* Clamp: fluid value between min and max */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* min = 1.5rem, preferred = 4% of viewport width, max = 3rem */
  /* ↑ text grows with screen size, but stays in a sane range */
}

/* vw/vh: viewport relative units */
.hero {
  min-height: 100vh;   /* 100% of viewport height */
  width: 100vw;        /* 100% of viewport width */
}

/* Responsive images */
img {
  max-width: 100%;   /* never wider than its container */
  height: auto;      /* keep aspect ratio */
  display: block;    /* removes bottom gap */
}

/* Fluid container with comfortable reading width */
.content {
  width: min(100% - 48px, 720px);
  /* either 100% minus padding, or 720px max — whichever is smaller */
  margin-inline: auto; /* center horizontally */
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>🔲 Responsive Flexbox & Grid</CardTitle>
      <CodeBlock lang="css" showLines code={`/* Grid: auto-responsive without media queries! */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  /* ↑ creates as many 280px+ columns as fit
     on mobile: 1 column
     on tablet: 2 columns
     on desktop: 3+ columns
     NO media queries needed */
}

/* Flexbox: wrap-based responsiveness */
.flex-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.flex-cards > * {
  flex: 1 1 280px;
  /* grow and shrink, never narrower than 280px */
}

/* Navigation: horizontal on desktop, vertical on mobile */
.nav-links {
  display: flex;
  gap: 8px;
}
@media (max-width: 640px) {
  .nav-links {
    flex-direction: column; /* stack vertically on mobile */
  }
}`}/>
      <InfoBox type="tip">The <IC>minmax(280px, 1fr)</IC> auto-responsive grid pattern is arguably the most useful single line of CSS. It makes responsive layouts without a single media query.</InfoBox>
    </Card>
  </>);
}

function TabProject() {
  return (<>
    <Card>
      <CardTitle color={T.green}>🎯 Mini Project: Profile Card</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        We're building a profile card step by step. First the HTML structure, then CSS added piece by piece. By the end you'll have a card with an avatar, name, bio, social links, and hover effects — real-world quality.
      </p>
    </Card>
    <Card>
      <CardTitle color={T.green}>Step 1 — HTML Structure (no CSS yet)</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Get the structure right first. We write semantic HTML that makes sense on its own — labels, links, sections. Don't think about looks yet.
      </p>
      <CodeBlock lang="html" showLines code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Profile Card</title>
  <link rel="stylesheet" href="style.css">  <!-- our CSS file -->
</head>
<body>

  <!-- The card wrapper — we'll target this with CSS -->
  <div class="card">

    <!-- Avatar circle — using CSS to make it round -->
    <div class="avatar">
      <img src="https://i.pravatar.cc/120" alt="Profile photo of Alice">
    </div>

    <!-- Name and title -->
    <div class="info">
      <h2 class="name">Alice Wanjiru</h2>
      <p class="role">Full-Stack Developer</p>
      <p class="bio">
        Building web apps with Python and JavaScript.
        Open source contributor. Coffee enthusiast.
      </p>
    </div>

    <!-- Social links section -->
    <div class="social">
      <a href="#" class="social-link">GitHub</a>
      <a href="#" class="social-link">Twitter</a>
      <a href="#" class="social-link">LinkedIn</a>
    </div>

  </div>

</body>
</html>`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Step 2 — CSS Reset & Base</CardTitle>
      <CodeBlock lang="css" title="style.css" showLines code={`/* Reset: remove browser defaults that cause inconsistencies */
*, *::before, *::after {
  box-sizing: border-box;  /* padding included in width */
  margin: 0;               /* no default margins */
  padding: 0;
}

/* Page background — centers the card */
body {
  min-height: 100vh;        /* full screen height */
  display: flex;            /* flexbox for centering */
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  background: #0f172a;      /* dark navy background */
  font-family: "Inter", "Segoe UI", system-ui, sans-serif;
  /* system-ui falls back to the OS's default font — safe and fast */
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Step 3 — Card Container</CardTitle>
      <CodeBlock lang="css" title="style.css (continued)" showLines code={`/* The card: white-ish box, centered content */
.card {
  background: #1e293b;     /* dark card — lighter than body */
  border: 1px solid rgba(255,255,255,0.1);  /* subtle border */
  border-radius: 20px;     /* nicely rounded corners */
  padding: 40px 32px;      /* generous padding */
  width: 340px;            /* fixed card width */
  text-align: center;      /* center all text inside */
  color: #e2e8f0;          /* light gray text */

  /* Subtle shadow so card lifts off the background */
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);

  /* Transition for hover effect later */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Card lifts on hover — nice interactive feel */
.card:hover {
  transform: translateY(-6px);    /* move up 6px */
  box-shadow: 0 35px 60px rgba(0, 0, 0, 0.5);  /* deeper shadow */
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Step 4 — Avatar Circle</CardTitle>
      <CodeBlock lang="css" title="style.css (continued)" showLines code={`/* Avatar wrapper: creates the circular frame */
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;         /* makes it a circle */
  margin: 0 auto 20px;        /* 0 top, auto left/right (center), 20px bottom */

  /* Gradient ring around the avatar */
  background: linear-gradient(135deg, #7c6dfa, #f43f5e);
  padding: 3px;               /* the gradient shows as a 3px ring */

  overflow: hidden;           /* clip the image to the circle */
}

/* The actual image inside the circle */
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;         /* make the image itself circular too */
  object-fit: cover;          /* fill the circle, crop if needed */
  display: block;             /* removes bottom gap under image */
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Step 5 — Name, Role & Bio</CardTitle>
      <CodeBlock lang="css" title="style.css (continued)" showLines code={`/* Name: big and bold */
.name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #f1f5f9;         /* near-white */
  margin-bottom: 6px;
}

/* Role/job title: accent color, smaller */
.role {
  font-size: 0.875rem;
  color: #7c6dfa;         /* purple accent */
  font-weight: 600;
  letter-spacing: 0.05em; /* slightly spaced out looks clean */
  text-transform: uppercase;
  margin-bottom: 16px;
}

/* Bio: muted, comfortable line height */
.bio {
  font-size: 0.9rem;
  color: #94a3b8;         /* muted gray */
  line-height: 1.65;      /* easy to read — don't go below 1.5 */
  margin-bottom: 24px;
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Step 6 — Social Links with Hover</CardTitle>
      <CodeBlock lang="css" title="style.css (continued)" showLines code={`/* Social links container: horizontal row */
.social {
  display: flex;
  justify-content: center;  /* center the links */
  gap: 10px;                /* space between links */
}

/* Individual social link: pill-shaped button */
.social-link {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 999px;           /* fully rounded = pill shape */
  background: rgba(124, 109, 250, 0.15); /* subtle purple tint */
  border: 1px solid rgba(124, 109, 250, 0.3);
  color: #a78bfa;                  /* purple text */
  text-decoration: none;           /* remove underline from link */
  font-size: 0.8rem;
  font-weight: 600;

  /* Smooth transition for hover effects */
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

/* Hover state: solid purple fill */
.social-link:hover {
  background: #7c6dfa;     /* solid purple on hover */
  color: white;
  transform: translateY(-2px); /* subtle lift */
}

/* Active state: pressed-down feel */
.social-link:active {
  transform: translateY(0);
}`}/>
      <InfoBox type="tip">The hover + transition combo is what makes UI feel polished. The rule: add <IC>transition</IC> to the normal state, not the <IC>:hover</IC> state — that way it transitions both in AND out.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>Step 7 — Final Complete Files</CardTitle>
      <CodeBlock lang="html" title="index.html — complete" showLines code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Profile Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <div class="avatar">
      <img src="https://i.pravatar.cc/120" alt="Alice's profile photo">
    </div>
    <div class="info">
      <h2 class="name">Alice Wanjiru</h2>
      <p class="role">Full-Stack Developer</p>
      <p class="bio">
        Building web apps with Python and JavaScript.
        Open source contributor. Coffee enthusiast.
      </p>
    </div>
    <div class="social">
      <a href="#" class="social-link">GitHub</a>
      <a href="#" class="social-link">Twitter</a>
      <a href="#" class="social-link">LinkedIn</a>
    </div>
  </div>
</body>
</html>`}/>
      <InfoBox type="info">Save these two files in the same folder and open index.html in your browser. You should see a dark profile card that lifts on hover, with a circular avatar, gradient ring, and pill-shaped social links that change color on hover. This is a real component — the kind of thing you'd see on a portfolio site.</InfoBox>
    </Card>
  </>);
}

export default function HTMLCSs() {
  const [tab, setTab] = useState(() => {
    return storage.getTab("html-css") ?? "whatishtml";
  });
  const content: Record<string, React.ReactNode> = {
    whatishtml:<TabWhatIsHTML/>, basics:<TabBasics/>, elements:<TabElements/>,
    forms:<TabForms/>, whatiscss:<TabWhatIsCSS/>, cssbasics:<TabCSSBasics/>,
    selectors:<TabSelectors/>, boxmodel:<TabBoxModel/>,
    flexbox:<TabFlexbox/>, grid:<TabGrid/>, responsive:<TabResponsive/>,
    project:<TabProject/>,
  };
  return (
    <div>
      <PageHeader eyebrow="Web · Beginner" title="HTML & CSS" sub="Build the structure and style of any webpage — from blank file to polished profile card" color={T.amber}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Every web app you'll ever build lives inside an HTML page and gets its look from CSS. Flask renders HTML. Your JavaScript manipulates HTML. Even mobile apps often use HTML-based UIs. This is the foundation everything else sits on.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab} pageId="html-css"/>
        {tab === "quiz"
          ? <Card><CardTitle color={T.amber}>🎯 HTML & CSS Quiz</CardTitle><Quiz questions={QUIZ} trackId="html-css"/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
