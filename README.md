# PKR Game

Static informational website for PKR Game with platform overview and usage guides for players in Pakistan.

## Technology

HTML5, CSS3, and Vanilla JavaScript

## Domain

https://pkr-game.com.pk/

## Final Page URLs

- Homepage: https://pkr-game.com.pk/
- Download: https://pkr-game.com.pk/pkr-game-download/
- Login: https://pkr-game.com.pk/pkr-game-login/
- Deposit and Withdrawal: https://pkr-game.com.pk/Deposit-and-withdrawal/

Keep the capitalization of `/Deposit-and-withdrawal/` unchanged. Static hosting URLs may be case-sensitive.

## Project Structure

```text
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── manifest.json
├── 404.html
├── README.md
├── pkr-game-download/index.html
├── pkr-game-login/index.html
├── Deposit-and-withdrawal/index.html
└── assets/images/
```

## Replace Logo and Banner Images

Replace files in `assets/images/` while keeping the same filenames:

- `pkr-game-logo.webp`
- `favicon.webp`
- `home-banner.webp`
- `download-banner.webp`
- `login-banner.webp`
- `deposit-withdrawal-banner.webp`

## Update External CTA URL

Search the project for:

`https://www.okpkr1.com/?id=616425469`

Replace it with your new destination URL. Keep `target="_blank"` and `rel="nofollow sponsored noopener noreferrer"` on external CTA links.

## Local Preview

```bash
python3 -m http.server 8000
```

Then open:

- http://localhost:8000/
- http://localhost:8000/pkr-game-download/
- http://localhost:8000/pkr-game-login/
- http://localhost:8000/Deposit-and-withdrawal/
