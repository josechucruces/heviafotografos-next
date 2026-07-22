#!/usr/bin/env python3
"""Migrate blog posts from heviafotografos.com RSS feed to MDX files."""
import re, json, os, subprocess, sys, html
import xml.etree.ElementTree as ET
from urllib.request import urlopen, Request
from datetime import datetime

BASE = "https://www.heviafotografos.com"
BLOG_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "blog")
IMG_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "content", "img", "blog")
MAX_GALLERY_IMAGES = 4

os.makedirs(BLOG_DIR, exist_ok=True)
os.makedirs(IMG_DIR, exist_ok=True)

def fetch(url):
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", errors="replace")

def fetch_binary(url):
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=30) as r:
        return r.read()

def extract_meta(page_html, name):
    for attr in ["name", "property"]:
        m = re.search(f'<meta {attr}="{name}"[^>]*content="([^"]*)"', page_html)
        if m:
            return m.group(1)
    return ""

def strip_html(text):
    text = re.sub(r'<[^>]+>', '', text)
    text = html.unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def download_image(url, filepath):
    try:
        data = fetch_binary(url)
        with open(filepath, "wb") as f:
            f.write(data)
        return True
    except Exception as e:
        print(f"    Failed download: {e}")
        return False

def convert_to_webp(src_path, dst_path):
    if os.path.exists(dst_path):
        return True
    try:
        subprocess.run(["cwebp", "-quiet", src_path, "-o", dst_path], check=True, timeout=30)
        if os.path.exists(dst_path):
            os.remove(src_path)
            return True
        return False
    except:
        return False

print("=== Fetching RSS feed ===")
resp = fetch(f"{BASE}/rss")
root = ET.fromstring(resp)
channel = root.find("channel")
items = channel.findall("item")

print(f"Found {len(items)} posts in RSS feed")

for item in items:
    title = item.findtext("title", "")
    link = item.findtext("link", "")
    pubdate_str = item.findtext("pubDate", "")
    desc_html = item.findtext("description", "")
    
    slug = link.strip("/").split("/")[-1]
    
    print(f"\n=== Processing: {slug} ===")
    
    out_file = os.path.join(BLOG_DIR, f"{slug}.mdx")
    
    if os.path.exists(out_file):
        print(f"  Already exists, skipping")
        continue
    
    # Fetch individual post page for full content, OG image, and category
    try:
        page_html = fetch(link)
    except Exception as e:
        print(f"  Failed to fetch post: {e}")
        page_html = ""
    
    # Extract category from page
    category = "general"
    if page_html:
        cat_match = re.search(r'/lang/es/blog/category/([^"\'\\]+)', page_html)
        if cat_match:
            category = cat_match.group(1)
    
    # Parse date
    date_str = ""
    if pubdate_str:
        try:
            dt = datetime.strptime(pubdate_str, "%a, %d %b %Y %H:%M:%S %z")
            date_str = dt.strftime("%Y-%m-%d")
        except:
            date_str = pubdate_str[:10]
    
    # Extract gallery images from data-href
    image_urls = []
    if page_html:
        for m in re.finditer(r'data-href="([^"]*\.sized\.jpg)"', page_html):
            url = m.group(1)
            if url not in image_urls:
                image_urls.append(url)
    
    # Download and convert gallery images
    local_images = []
    for idx, img_url in enumerate(image_urls[:MAX_GALLERY_IMAGES]):
        ext = "webp"
        img_filename = f"{slug}-{idx+1}.{ext}"
        webp_path = os.path.join(IMG_DIR, img_filename)
        
        if os.path.exists(webp_path):
            local_images.append(f"/content/img/blog/{img_filename}")
            continue
        
        jpg_path = os.path.join(IMG_DIR, f"{slug}-{idx+1}.jpg")
        print(f"  Downloading image {idx+1}/{min(len(image_urls), MAX_GALLERY_IMAGES)}")
        if download_image(img_url, jpg_path):
            if convert_to_webp(jpg_path, webp_path):
                local_images.append(f"/content/img/blog/{img_filename}")
            else:
                local_images.append(f"/content/img/blog/{slug}-{idx+1}.jpg")
        else:
            print(f"    Skipping image {idx+1}")
    
    if not local_images and page_html:
        # Fall back to OG image
        og_image = extract_meta(page_html, "og:image")
        if og_image:
            img_filename = f"{slug}.webp"
            webp_path = os.path.join(IMG_DIR, img_filename)
            jpg_path = os.path.join(IMG_DIR, f"{slug}.jpg")
            if download_image(og_image, jpg_path):
                if convert_to_webp(jpg_path, webp_path):
                    local_images.append(f"/content/img/blog/{img_filename}")
    
    # Extract full content from the page
    full_content = ""
    if page_html:
        body_match = re.search(r'class="classic-post-text"[^>]*>(.*?)</div>', page_html, re.DOTALL)
        if body_match:
            body_html = body_match.group(1)
            body_html = re.sub(r'<script[^>]*>.*?</script>', '', body_html, flags=re.DOTALL)
            body_html = re.sub(r'<style[^>]*>.*?</style>', '', body_html, flags=re.DOTALL)
            full_content = strip_html(body_html)
        
        if not full_content:
            article_match = re.search(r'<article[^>]*>(.*?)</article>', page_html, re.DOTALL)
            if article_match:
                article_html = article_match.group(1)
                article_html = re.sub(r'<script[^>]*>.*?</script>', '', article_html, flags=re.DOTALL)
                full_content = strip_html(article_html)
    
    if not full_content:
        full_content = strip_html(desc_html)
    elif len(strip_html(desc_html)) > len(full_content):
        full_content = strip_html(desc_html)
    
    full_content = html.unescape(full_content)
    full_content = re.sub(r'([áéíóúñÁÉÍÓÚ])\u003B', r'\1', full_content)
    title_clean = title
    
    # Split content into paragraphs
    paragraphs = re.split(r'\n\s*\n', full_content)
    paragraphs = [p.strip() for p in paragraphs if p.strip()]
    
    excerpt = paragraphs[0][:200] if paragraphs else title_clean[:200]
    excerpt_clean = excerpt.replace('"', '\\"')
    
    featured = local_images[0] if local_images else ""
    
    print(f"  Title: {title_clean[:60]}...")
    print(f"  Date: {date_str}")
    print(f"  Category: {category}")
    print(f"  Images: {len(local_images)}")
    print(f"  Content: {len(full_content)} chars, {len(paragraphs)} paragraphs")
    
    # Create MDX
    mdx_lines = ["---"]
    mdx_lines.append(f'title: "{title_clean}"')
    mdx_lines.append(f"date: {date_str}")
    mdx_lines.append(f"category: {category}")
    if featured:
        mdx_lines.append(f"image: {featured}")
    mdx_lines.append(f"excerpt: \"{excerpt_clean}\"")
    mdx_lines.append("---")
    mdx_lines.append("")
    
    # Insert images at natural paragraph breaks
    if local_images:
        images_per_post = len(local_images)
        para_count = len(paragraphs)
        
        if para_count <= 1:
            # Single paragraph: put all images first
            for i, img in enumerate(local_images):
                mdx_lines.append(f"![{title_clean} - {i+1}]({img})")
                mdx_lines.append("")
            for p in paragraphs:
                mdx_lines.append(p)
                mdx_lines.append("")
        else:
            # Distribute images across paragraphs
            interval = max(1, para_count // (images_per_post + 1))
            img_idx = 0
            for i, p in enumerate(paragraphs):
                if img_idx < images_per_post and i > 0 and i % interval == 0:
                    mdx_lines.append(f"![{title_clean} - {img_idx+1}]({local_images[img_idx]})")
                    mdx_lines.append("")
                    img_idx += 1
                mdx_lines.append(p)
                mdx_lines.append("")
            # Add remaining images at the end
            while img_idx < images_per_post:
                mdx_lines.append(f"![{title_clean} - {img_idx+1}]({local_images[img_idx]})")
                mdx_lines.append("")
                img_idx += 1
    else:
        for p in paragraphs:
            mdx_lines.append(p)
            mdx_lines.append("")
    
    with open(out_file, "w") as f:
        f.write("\n".join(mdx_lines))
    
    print(f"  Created: {slug}.mdx ({len(local_images)} images)")

print(f"\n=== Done! Check {BLOG_DIR} ===")
