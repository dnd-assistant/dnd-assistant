import dedent from 'dedent';

export const signature = {
  html: () => dedent`
    Best regards,<br />
    Chris and Julian<br />
    DnD Assistant - <a href="https://dndassistant.io">https://dndassistant.io</a>
  `,
  plain: () => dedent`
    Best regards,
    Chris and Julian
    DnD Assistant - https://dndassistant.io
  `,
};
