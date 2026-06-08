import { App, PluginSettingTab, Setting } from 'obsidian';
import type DesmosLivePlugin from './main';

export interface DesmosLiveSettings {
  desmosJsPath: string;
  desmosCssPath: string;
  defaultHeight: number;
}

export const DEFAULT_SETTINGS: DesmosLiveSettings = {
  desmosJsPath: 'attachments/euler _ Desmos_files/shared_calculator_desktop-a1b6c891a1bfb28f9a3068c97d1877e05a83c51d.js.download',
  desmosCssPath: 'attachments/euler _ Desmos_files/shared_calculator_desktop-f80f675e1d3831459b85ce50a70fe73c3e91366a.css',
  defaultHeight: 400,
};

export class DesmosLiveSettingTab extends PluginSettingTab {
  constructor(app: App, private plugin: DesmosLivePlugin) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
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

    new Setting(containerEl)
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
