import * as Handlebars from '../../../node_modules/handlebars/dist/handlebars.js';

export const html = Handlebars.compile(`
<div>
{{author}}: {{messageText}}
</div>
`);
