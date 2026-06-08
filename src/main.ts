import { Plugin } from 'obsidian';
import { DesmosLiveSettings, DEFAULT_SETTINGS, DesmosLiveSettingTab } from './settings';
import { registerDesmosRenderer } from './renderer';

export default class DesmosLivePlugin extends Plugin {
  settings!: DesmosLiveSettings;

  async onload() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      (await this.loadData()) as Partial<DesmosLiveSettings>,
    );
    this.addSettingTab(new DesmosLiveSettingTab(this.app, this));
    registerDesmosRenderer(this);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
