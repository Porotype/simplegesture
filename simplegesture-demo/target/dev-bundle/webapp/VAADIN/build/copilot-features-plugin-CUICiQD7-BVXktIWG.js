import { c as cc, b, O as O$1, e as ur, W as Wc, f as wc, l as le, w as wt, $ as $o, g as bc, j as je, i as jo, a as jl } from "./indexhtml-Dcb3eWVD.js";
import { b as b$1 } from "./state-CV9KAofd-DPCy3cx9.js";
import { l as l$1 } from "./base-panel-Cr-JNsTK-DVS9JKZG.js";
import { o as o$1 } from "./icons-CDpVUE5Q-BnmowOHz.js";
const O = "copilot-features-panel{padding:var(--space-100);font:var(--font-xsmall);display:grid;grid-template-columns:auto 1fr;gap:var(--space-50);height:auto}copilot-features-panel a{display:flex;align-items:center;justify-self:end;gap:var(--space-50);white-space:nowrap}copilot-features-panel a svg{height:12px;width:12px;min-height:12px;min-width:12px}";
var S = Object.defineProperty, C = Object.getOwnPropertyDescriptor, o = (t, e, a, s) => {
  for (var r = s > 1 ? void 0 : s ? C(e, a) : e, i = t.length - 1, n; i >= 0; i--)
    (n = t[i]) && (r = (s ? n(e, a, r) : n(r)) || r);
  return s && r && S(e, a, r), r;
};
const l = window.Vaadin.devTools;
let d = class extends l$1 {
  constructor() {
    super(...arguments), this.toggledFeaturesThatAreRequiresServerRestart = [];
  }
  render() {
    return le` <style>
        ${O}
      </style>
      ${b.featureFlags.map(
      (t) => le`
          <copilot-toggle-button
            .title="${t.title}"
            ?checked=${t.enabled}
            @on-change=${(e) => this.toggleFeatureFlag(e, t)}>
          </copilot-toggle-button>
          <a class="ahreflike" href="${t.moreInfoLink}" title="Learn more" target="_blank"
            >learn more ${o$1.share}</a
          >
        `
    )}`;
  }
  toggleFeatureFlag(t, e) {
    const a = t.target.checked;
    wt("use-feature", { source: "toggle", enabled: a, id: e.id }), l.frontendConnection ? (l.frontendConnection.send("setFeature", { featureId: e.id, enabled: a }), e.requiresServerRestart && b.toggleServerRequiringFeatureFlag(e), $o({
      type: je.INFORMATION,
      message: `“${e.title}” ${a ? "enabled" : "disabled"}`,
      details: e.requiresServerRestart ? bc() : void 0,
      dismissId: `feature${e.id}${a ? "Enabled" : "Disabled"}`
    }), jo()) : l.log("error", `Unable to toggle feature ${e.title}: No server connection available`);
  }
};
o([
  b$1()
], d.prototype, "toggledFeaturesThatAreRequiresServerRestart", 2);
d = o([
  jl("copilot-features-panel")
], d);
let c = class extends cc {
  constructor() {
    super(...arguments), this.serverRestarting = false;
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (b.serverRestartRequiringToggledFeatureFlags.length === 0)
      return O$1;
    if (!ur())
      return O$1;
    const t = this.serverRestarting ? "Restarting..." : "Click to restart server";
    return le`
      <style>
        .fade-in-out {
          animation: fadeInOut 2s ease-in-out infinite;
          animation-play-state: running;
        }
        .fade-in-out:hover {
          animation-play-state: paused;
          opacity: 1 !important;
        }
        ${Wc}
      </style>
      <button
        ?disabled="${this.serverRestarting}"
        id="restart-server-btn"
        class="icon ${this.serverRestarting ? "" : "fade-in-out"}"
        @click=${() => {
      this.serverRestarting = true, wc();
    }}>
        <span>${o$1.refresh}</span>
      </button>
      <vaadin-tooltip for="restart-server-btn" text=${t}></vaadin-tooltip>
    `;
  }
};
o([
  b$1()
], c.prototype, "serverRestarting", 2);
c = o([
  jl("copilot-features-actions")
], c);
const I = {
  header: "Features",
  expanded: false,
  panelOrder: 35,
  panel: "right",
  floating: false,
  tag: "copilot-features-panel",
  helpUrl: "https://vaadin.com/docs/latest/flow/configuration/feature-flags",
  actionsTag: "copilot-features-actions"
}, P = {
  init(t) {
    t.addPanel(I);
  }
};
window.Vaadin.copilot.plugins.push(P);
export {
  c as CopilotFeaturesActions,
  d as CopilotFeaturesPanel
};
