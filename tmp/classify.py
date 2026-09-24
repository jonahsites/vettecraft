import urllib.request
import json
import os
import base64
import time

api_key = os.environ.get('GEMINI_API_KEY')

urls = [
    (8, 'https://lh3.googleusercontent.com/d/1ZC94zOMadIp6Y675DpDMY2eEtvo2WJwH'),
    (9, 'https://lh3.googleusercontent.com/d/1hg6WRtOkylAImSwly9ggMnzCkSsIPi1V'),
    (10, 'https://lh3.googleusercontent.com/d/1kVODs2yhZWg7UCPj-SgKC89vRoHtqdm6'),
    (11, 'https://lh3.googleusercontent.com/d/1oUdQ2peQOwDVZWhPkjDN9cvmlU-Ket6C'),
    (12, 'https://lh3.googleusercontent.com/d/1qTCrq27JzkFU0VdOezxJPhwpZTO_5Grv'),
    (13, 'https://lh3.googleusercontent.com/d/1rzhXPrkpP6scNsqb-hCoy1tBXnQ2rBWp'),
    (14, 'https://lh3.googleusercontent.com/d/1t0sI7BzltFmiQDli0p50QkE6EOUpgMNf'),
    (15, 'https://lh3.googleusercontent.com/d/1taGiWgTXtQF7IG2p-rV4mJcx-yzu3VfE'),
    (16, 'https://lh3.googleusercontent.com/d/1wqlLnXcEjrSlUPfYZoP7wsUSpTpQ5qzj'),
    (17, 'https://lh3.googleusercontent.com/d/1y3fMHCDPbsAyViDYtaEfUctxzdgC3OP0'),
    (18, 'https://lh3.googleusercontent.com/d/1Bifz4DcLgAxtRmwhN1wB9nY3DGZdcp6V'),
    (19, 'https://lh3.googleusercontent.com/d/1ROTDMICn30S1I93iIXDAUM_DVxwlU2zw'),
    (20, 'https://lh3.googleusercontent.com/d/1eQx1uFz9GtdUQwWFmNazwUsKf2rrr4qL'),
    (21, 'https://lh3.googleusercontent.com/d/1yxYwmXsPxBGKqSh1I4A_19Iw0CEj8_Dm'),
    (22, 'https://lh3.googleusercontent.com/d/1e5r0ZIUnQX_EzUgWZH8vOPkeoTqoSPw_'),
    (23, 'https://lh3.googleusercontent.com/d/1wWTYg3ZU6QZ13IoE5telYCZb6Ie8tycV'),
]

results = {}

for img_id, url in urls:
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            img_data = urllib.request.urlopen(req, timeout=15).read()
            b64 = base64.b64encode(img_data).decode('utf-8')
            
            payload = {
                'contents': [{
                    'parts': [
                        {'inline_data': {'mime_type': 'image/jpeg', 'data': b64}},
                        {'text': 'Identify this product made by VetteCraft by Ivette. What is the product? What text or quote is written on it? Which category does it belong to among: 1. Personalized Mugs (for all personalized mini mugs, colors, sipware), 2. Kitchen Decor (decorative kitchen boards, coffee-themed pieces, cutting boards, kitchen creations), 3. Handcrafted Frames & Home Decor (framed pieces, family and grandparents designs, angels, inspirational and religious pieces, shadow boxes, and other home decor), 4. Seasonal Decor (wreaths and seasonal pieces such as Christmas, Fall, Easter, and other holiday collections). Output ONLY a valid JSON object: {"category": "...", "title": "...", "description": "..."}'}
                    ]
                }]
            }
            
            req_api = urllib.request.Request(
                f'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}',
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            res = urllib.request.urlopen(req_api, timeout=15)
            data = json.loads(res.read())
            raw_text = data['candidates'][0]['content']['parts'][0]['text'].strip()
            if '```' in raw_text:
                parts = raw_text.split('```')
                raw_text = parts[1]
                if raw_text.startswith('json'):
                    raw_text = raw_text[4:]
            parsed = json.loads(raw_text.strip())
            results[img_id] = parsed
            print(f"Done {img_id}: {parsed['category']} | {parsed['title']}", flush=True)
            time.sleep(2)
            break
        except Exception as e:
            print(f"Retry {img_id} (attempt {attempt+1}): {e}", flush=True)
            time.sleep(4)

with open('/tmp/img_classifications.json', 'w') as f:
    json.dump(results, f, indent=2)
print("ALL COMPLETED SUCCESSFULLY", flush=True)
