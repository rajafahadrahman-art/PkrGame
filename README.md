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
- About Us: https://pkr-game.com.pk/about-us/
- Contact Us: https://pkr-game.com.pk/contact-us/
- Privacy Policy: https://pkr-game.com.pk/privacy-policy/
- Disclaimer: https://pkr-game.com.pk/disclaimer/
- Terms and Conditions: https://pkr-game.com.pk/terms-and-conditions/
- Responsible Gaming: https://pkr-game.com.pk/responsible-gaming/

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
├── about-us/index.html
├── contact-us/index.html
├── privacy-policy/index.html
├── disclaimer/index.html
├── terms-and-conditions/index.html
├── responsible-gaming/index.html
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

## Contact Email and Form

The contact page uses the placeholder email `contact@pkr-game.com.pk` and a mailto form. Replace the email address in `contact-us/index.html` if needed. To enable hosted message delivery, connect a form service before expecting server-side submissions.

## Local Preview

```bash
python3 -m http.server 8000
```

Then open:

- http://localhost:8000/
- http://localhost:8000/pkr-game-download/
- http://localhost:8000/pkr-game-login/
- http://localhost:8000/Deposit-and-withdrawal/
- http://localhost:8000/about-us/
- http://localhost:8000/contact-us/
- http://localhost:8000/privacy-policy/
- http://localhost:8000/disclaimer/
- http://localhost:8000/terms-and-conditions/
- http://localhost:8000/responsible-gaming/
