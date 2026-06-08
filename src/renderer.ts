import type DesmosLivePlugin from './main';

export function registerDesmosRenderer(plugin: DesmosLivePlugin): void {
  plugin.registerMarkdownCodeBlockProcessor('desmos-live', (source, el) => {
    renderBlock(source.trim(), el, plugin);
  });
}

function renderBlock(source: string, el: HTMLElement, plugin: DesmosLivePlugin): void {
  let state: unknown;
  try {
    state = JSON.parse(source);
  } catch (e) {
    showError(el, `Invalid JSON — ${(e as Error).message}`);
    return;
  }

  const resourceUrl = plugin.app.vault.adapter.getResourcePath(plugin.settings.desmosJsPath);
  const height = plugin.settings.defaultHeight;

  el.createEl('iframe', {
    attr: {
      srcdoc: buildSrcdoc(resourceUrl, JSON.stringify(state)),
      style: `width:100%;height:${height}px;border:none;display:block;`,
    },
  });
}

function buildSrcdoc(desmosJsUrl: string, stateJson: string): string {
  // Replace </ to prevent the JSON from prematurely closing the <script> tag.
  const safeState = stateJson.replace(/<\//g, '<\\/');

  return `<!DOCTYPE html>
<html>
<head>
<style>html,body{margin:0;padding:0;width:100%;height:100%;overflow:hidden;}</style>
</head>
<body>
<div id="calculator" style="width:100%;height:100%"></div>
<script src="${desmosJsUrl}"></script>
<script>
(function () {
  var elt = document.getElementById('calculator');
  var Calc = Desmos.GraphingCalculator(elt, { border: false });
  Calc.setState(${safeState});
})();
</script>
</body>
</html>`;
}

function showError(el: HTMLElement, msg: string): void {
  el.createEl('div', {
    text: `Desmos Live: ${msg}`,
    cls: 'desmos-live-error',
  });
}
