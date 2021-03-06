import React from 'react';
import styles from './HomepageFeatures.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div class="text--center">
          <img class="logo" src="./img/full_logo.svg"></img>
        <hr></hr>
          <div class="button-group">
          <a class="button button--secondary button--lg" href="/web_app_LOCA_DimiTiger/docs/intro">๐ ํ๋ก์ ํธ ๋ฌธ์</a>
          <a class="button button--primary button--lg" href="/web_app_LOCA_DimiTiger/docs/demo">โถ Demo ์์</a>
          </div>
        </div>
        <div class="row">
          <div class="col col--6">
            <div className={styles.featuresCardA}><a href="/web_app_LOCA_DimiTiger/docs/features/feature1" className={styles.overlay}>๐์์ธํ ๋ณด๊ธฐ</a>
            </div>
            <div class="text--center padding-horiz--md">
              <h3>๐งญ ์ฝ๊ณ  ๊ฐํธํ ์์น ๋ณด๊ณ </h3>
              <p>NFC ํ๊ทธ์ ์ค๋งํธํฐ์ ํ๊ทธํ๊ฑฐ๋ ๋น์ฝ์ ํ์ฉํ์ฌ ๊ฐํธํ๊ฒ ์์น๋ฅผ ๋ณด๊ณ ํฉ๋๋ค.</p>
            </div>
          </div>
          <div class="col col--6">
            <div className={styles.featuresCardB}><a href="/web_app_LOCA_DimiTiger/docs/features/feature2" className={styles.overlay}>๐์์ธํ ๋ณด๊ธฐ</a></div>
            <div class="text--center padding-horiz--md">
              <h3>๐ ํ ๋์ ๋ณด๋ ์ ๋๋ณ๋ ฅ ํํฉ</h3>
              <p>์ค์๊ฐ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ ์ก๋ ์ ๋ณด๋ฅผ ๋ฐํ์ผ๋ก ๋ณ๋ ฅ๋ค์ ์์น๋ฅผ ์น ๋์๋ณด๋์ ํ์ํฉ๋๋ค.</p>
            </div>
          </div>
          <div class="col col--6">
            <div className={styles.featuresCardC}><a href="/web_app_LOCA_DimiTiger/docs/features/feature3" className={styles.overlay}>๐์์ธํ ๋ณด๊ธฐ</a></div>
            <div class="text--center padding-horiz--md">
              <h3>โ  ์์น ๊ธฐ๋ฐ ๊ธด๊ธ๋ณด๊ณ  ์ฒด๊ณ</h3>
              <p>์ฌ๊ณ ๊ฐ ๋ฐ์ํ์ฌ ๊ธด๊ธ ๋ณด๊ณ  ์ ์ฌ์ฉ์์ ์์น๋ฅผ ๋ฐํ์ผ๋ก ์ ์ํ ์กฐ์น๊ฐ ๊ฐ๋ฅํฉ๋๋ค.</p>
            </div>
          </div>
          <div class="col col--6">
            <div className={styles.featuresCardD}><a href="/web_app_LOCA_DimiTiger/docs/features/feature4" className={styles.overlay}>๐์์ธํ ๋ณด๊ธฐ</a></div>
            <div class="text--center padding-horiz--md">
              <h3>๐ช ๋ณ์ฌ ์ด๋ ๋์  ๋ฐ ์์น ์ถ์ ๊ธฐ๋ก</h3>
              <p>์ฌ์ฉ์๊ฐ ๋ณด๊ณ ํ ์์น๋ฅผ ๋ฐํ์ผ๋ก ๊ฐ์ธ์ ์ด๋ ๋์ ๊ณผ ์์น์ ์ถ์ ๊ธฐ๋ก์ ํ์ธํ  ์ ์์ต๋๋ค.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
