import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div class="text--center">
          <img class="logo" src="./img/full_logo.svg"></img>
        <hr></hr>
          <div class="button-group">
          <a class="button button--secondary button--lg" href="/web_app_LOCA_DimiTiger/docs/intro">📖 프로젝트 문서</a>
          <a class="button button--primary button--lg" href="/web_app_LOCA_DimiTiger/docs/intro">▶ Demo 시작</a>
          </div>
        </div>
        <div class="row">
          <div class="col col--6">
            <div className={styles.featuresCard}><div className={styles.overlay}>🔗자세히 보기</div></div>
            <div class="text--center padding-horiz--md">
              <h3>🧭 쉽고 간편한 위치 보고</h3>
              <p>NFC 태그에 스마트폰을 태그하거나 비콘을 활용하여 간편하게 위치를 보고합니다.</p>
            </div>
          </div>
          <div class="col col--6">
            <div className={styles.featuresCard}><div className={styles.overlay}>🔗자세히 보기</div></div>
            <div class="text--center padding-horiz--md">
              <h3>👀 한 눈에 보는 유동병력 현황</h3>
              <p>실시간 데이터베이스에 전송된 정보를 바탕으로 병력들의 위치를 웹 대시보드에 표시합니다.</p>
            </div>
          </div>
          <div class="col col--6">
            <div className={styles.featuresCard}><div className={styles.overlay}>🔗자세히 보기</div></div>
            <div class="text--center padding-horiz--md">
              <h3>⚠ 위치 기반 긴급보고 체계</h3>
              <p>사고가 발생하여 긴급 보고 시 사용자의 위치를 바탕으로 신속한 조치가 가능합니다.</p>
            </div>
          </div>
          <div class="col col--6">
            <div className={styles.featuresCard}><div className={styles.overlay}>🔗자세히 보기</div></div>
            <div class="text--center padding-horiz--md">
              <h3>🚪 병사 이동 동선 및 위치 출입 기록</h3>
              <p>사용자가 보고한 위치를 바탕으로 개인의 이동 동선과 위치의 출입 기록을 확인할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
