import dedent from 'dedent';

export const signature = {
  html: () => dedent`
    Best regards,<br />
    Chris and Julian<br />
    DnD Assistant - https://dndassistant.io
  `,
  plain: () => dedent`
    Best regards,
    Chris and Julian
    DnD Assistant - https://dndassistant.io
  `,
};
