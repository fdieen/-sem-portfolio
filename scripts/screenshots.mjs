import puppeteer from 'puppeteer';
import { writeFileSync } from 'fs';

const targets = [
  {
    url: 'https://hoekmontagebedrijf.nl',
    out: 'public/hoek-drone-still.jpg',
    onPage: async (page) => {
      await page.evaluate(async () => {
        const vid = document.querySelector('video.hero-video');
        if (!vid) return;
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.autoplay = true;
        await new Promise((resolve) => {
          if (vid.readyState >= 2) return resolve();
          vid.addEventListener('loadeddata', resolve, { once: true });
        });
        vid.currentTime = 50;
        await new Promise((resolve) => {
          vid.addEventListener('seeked', resolve, { once: true });
        });
        vid.pause();
      });
    },
  },
];

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'],
});

for (const target of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 900, deviceScaleFactor: 1 });
  await page.goto(target.url, { waitUntil: 'networkidle2', timeout: 60000 });
  if (target.onPage) await target.onPage(page);
  await new Promise((r) => setTimeout(r, 1000));
  const buf = await page.screenshot({ type: 'jpeg', quality: 90 });
  writeFileSync(target.out, buf);
  await page.close();
  console.log(`Saved ${target.out}`);
}

await browser.close();
