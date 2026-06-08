'use strict';

var obsidian = require('obsidian');

// ── Settings ─────────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS = {
  desmosJsPath:
    'attachments/euler _ Desmos_files/shared_calculator_desktop-a1b6c891a1bfb28f9a3068c97d1877e05a83c51d.js.download',
  desmosCssPath:
    'attachments/euler _ Desmos_files/shared_calculator_desktop-f80f675e1d3831459b85ce50a70fe73c3e91366a.css',
  defaultHeight: 400,
};

class DesmosLiveSettingTab extends obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    new obsidian.Setting(containerEl)
      .setName('Desmos JS path')
      .setDesc('Path to the Desmos JS bundle, relative to vault root.')
      .addText(text =>
        text
          .setPlaceholder('attachments/desmos/desmos.js.download')
          .setValue(this.plugin.settings.desmosJsPath)
          .onChange(async value => {
            this.plugin.settings.desmosJsPath = value;
            await this.plugin.saveSettings();
          }),
      );

    new obsidian.Setting(containerEl)
      .setName('Desmos CSS path')
      .setDesc('Path to the Desmos CSS file, relative to vault root.')
      .addText(text =>
        text
          .setPlaceholder('attachments/desmos/desmos.css')
          .setValue(this.plugin.settings.desmosCssPath)
          .onChange(async value => {
            this.plugin.settings.desmosCssPath = value;
            this.plugin._desmosCssCache = null; // invalidate cache on path change
            await this.plugin.saveSettings();
          }),
      );

    new obsidian.Setting(containerEl)
      .setName('Default height (px)')
      .setDesc('Height of each graph embed in pixels.')
      .addText(text =>
        text
          .setPlaceholder('400')
          .setValue(String(this.plugin.settings.defaultHeight))
          .onChange(async value => {
            const n = parseInt(value, 10);
            if (Number.isFinite(n) && n > 0) {
              this.plugin.settings.defaultHeight = n;
              await this.plugin.saveSettings();
            }
          }),
      );
  }
}

// ── Renderer ──────────────────────────────────────────────────────────────────

function buildSrcdoc(desmosJsUrl, desmosCss, stateJson) {
  // Replace </ to prevent the JSON from prematurely closing the <script> tag.
  const safeState = stateJson.replace(/<\//g, '<\\/');
  // Escape </style> inside the inlined CSS so it can't break out of the style tag.
  const safeCss = desmosCss.replace(/<\/style>/gi, '<\\/style>');

  return `<!DOCTYPE html>
<html>
<head>
<style>${safeCss}</style>
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

function showError(el, msg) {
  el.createEl('div', {
    text: `Desmos Live: ${msg}`,
    cls: 'desmos-live-error',
  });
}

async function renderBlock(source, el, plugin) {
  let state;
  try {
    state = JSON.parse(source);
  } catch (e) {
    showError(el, `Invalid JSON — ${e.message}`);
    return;
  }

  const adapter = plugin.app.vault.adapter;
  const jsUrl = adapter.getResourcePath(plugin.settings.desmosJsPath);

  // CSS must be inlined — app:// URLs are blocked by srcdoc CSP for <link>.
  // Cache the CSS content on the plugin instance to avoid re-reading on every render.
  if (!plugin._desmosCssCache) {
    try {
      plugin._desmosCssCache = await adapter.read(plugin.settings.desmosCssPath);
    } catch (e) {
      showError(el, `Could not read CSS file: ${e.message}`);
      return;
    }
  }

  const height = plugin.settings.defaultHeight;

  el.createEl('iframe', {
    attr: {
      srcdoc: buildSrcdoc(jsUrl, plugin._desmosCssCache, JSON.stringify(state)),
      style: `width:100%;height:${height}px;border:none;display:block;`,
    },
  });
}

function registerDesmosRenderer(plugin) {
  plugin.registerMarkdownCodeBlockProcessor('desmos-live', (source, el) => {
    return renderBlock(source.trim(), el, plugin);
  });
}

// ── Plugin ────────────────────────────────────────────────────────────────────

class DesmosLivePlugin extends obsidian.Plugin {
  async onload() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      (await this.loadData()) ?? {},
    );
    this.addSettingTab(new DesmosLiveSettingTab(this.app, this));
    registerDesmosRenderer(this);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}

module.exports = DesmosLivePlugin;
