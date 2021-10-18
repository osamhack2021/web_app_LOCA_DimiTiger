const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'LOCA',
  tagline: '유동병력관리체계',
  url: 'https://osamhack2021.github.io/',
  baseUrl: '/web_app_LOCA_DimiTiger/',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'osamhack2021', // Usually your GitHub org/user name.
  projectName: 'web_app_LOCA_DimiTiger', // Usually your repo name.
  i18n: {
    defaultLocale: 'kr',
    locales: ['kr'],
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/osamhack2021/web_app_LOCA_DimiTiger/edit/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: 'LOCA Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '문서',
          },
          {
            href: 'https://loca.kimjisub.me',
            label: 'Demo',
            position: 'left'
          },
          {
            href: 'https://github.com/osamhack2021/web_app_LOCA_DimiTiger',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '문서',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Demo',
                href: 'https://loca.kimjisub.me',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/osamhack2021/web_app_LOCA_DimiTiger',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DimiTiger. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
