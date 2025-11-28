import { c as cc, _ as _$1, l as le, b, y as yn, s as se, H as Ho, O, u as uu, d as sd, o as od, $ as $o, j as je, a as jl } from "./indexhtml-Dcb3eWVD.js";
import { l } from "./base-panel-Cr-JNsTK-DVS9JKZG.js";
import { o } from "./icons-CDpVUE5Q-BnmowOHz.js";
import { T as T$1 } from "./index-D2xVFBEy-eB1rvp04.js";
const A = 'copilot-info-panel{--dev-tools-red-color: red;--dev-tools-grey-color: gray;--dev-tools-green-color: green;position:relative}copilot-info-panel dl{margin:0;width:100%}copilot-info-panel dl>div{align-items:center;display:flex;gap:var(--space-50);height:var(--copilot-size-md);padding:0 var(--space-150);position:relative}copilot-info-panel dl>div:after{border-bottom:1px solid var(--divider-secondary-color);content:"";inset:auto var(--space-150) 0;position:absolute}copilot-info-panel dl dt{color:var(--vaadin-text-color-secondary)}copilot-info-panel dl dd{align-items:center;display:flex;font-weight:var(--font-weight-medium);gap:var(--space-50);margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}copilot-info-panel dl dd span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}copilot-info-panel dl dd span.icon{display:inline-flex;vertical-align:bottom}copilot-info-panel dd.live-reload-status>span{overflow:hidden;text-overflow:ellipsis;display:block;color:var(--status-color)}copilot-info-panel dd span.hidden{display:none}copilot-info-panel code{white-space:nowrap;-webkit-user-select:all;user-select:all}copilot-info-panel .checks{display:inline-grid;grid-template-columns:auto 1fr;gap:var(--space-50)}copilot-info-panel span.hint{font-size:var(--font-size-0);background:var(--gray-50);padding:var(--space-75);border-radius:var(--vaadin-radius-m)}';
var h = (e, t, i, o2) => {
  for (var a = t, n = e.length - 1, l2; n >= 0; n--)
    (l2 = e[n]) && (a = l2(a) || a);
  return a;
};
let m = class extends l {
  connectedCallback() {
    super.connectedCallback(), this.onEventBus("system-info-with-callback", (e) => {
      e.detail.callback(this.getInfoForClipboard(e.detail.notify));
    }), this.reaction(
      () => b.idePluginState,
      () => {
        this.requestUpdate("serverInfo");
      }
    );
  }
  getIndex(e) {
    return yn.serverVersions.findIndex((t) => t.name === e);
  }
  render() {
    const e = b.newVaadinVersionState?.versions !== void 0 && b.newVaadinVersionState.versions.length > 0, t = [];
    b.userInfo?.vaadiner && t.push({
      name: "Vaadin Employee",
      version: "true"
    });
    const i = [
      ...yn.serverVersions,
      ...t,
      ...yn.clientVersions
    ].map((a) => {
      const n = { ...a };
      return n.name === "Vaadin" && (n.more = le` <button
          aria-label="Edit Vaadin Version"
          class="icon relative"
          id="new-vaadin-version-btn"
          title="Edit Vaadin Version"
          @click="${(l2) => {
        l2.stopPropagation(), se.updatePanel("copilot-vaadin-versions", { floating: true });
      }}">
          ${o.editAlt}
          ${e ? le`<span aria-hidden="true" class="absolute bg-error end-0 h-75 rounded-full top-0 w-75"></span>` : ""}
        </button>`), n;
    });
    let o$1 = this.getIndex("Spring") + 1;
    return o$1 === 0 && (o$1 = i.length), yn.springSecurityEnabled && (i.splice(o$1, 0, { name: "Spring Security", version: "true" }), o$1++), yn.springJpaDataEnabled && (i.splice(o$1, 0, { name: "Spring Data JPA", version: "true" }), o$1++), le` <style>
        ${A}
      </style>
      <div class="flex flex-col gap-150 items-start">
        <dl>
          ${i.map(
      (a) => le`
              <div>
                <dt>${a.name}</dt>
                <dd title="${a.version}">
                  <span> ${this.renderValue(a.version)} </span>
                  ${a.more}
                </dd>
              </div>
            `
    )}
          ${this.renderDevWorkflowSection()} ${this.renderDevelopmentWorkflowButton()}
        </dl>
      </div>`;
  }
  renderDevWorkflowSection() {
    const e = Ho(), t = this.getIdePluginLabelText(b.idePluginState), i = this.getHotswapAgentLabelText(e);
    return le`
      <div>
        <dt>Java Hotswap</dt>
        <dd>
          ${f(e === "success", e === "success" ? "Enabled" : "Disabled")} ${i}
        </dd>
      </div>
      ${uu() !== "unsupported" ? le` <div>
            <dt>IDE Plugin</dt>
            <dd>
              ${f(
      uu() === "success",
      uu() === "success" ? "Installed" : "Not Installed"
    )}
              ${t}
            </dd>
          </div>` : O}
    `;
  }
  renderDevelopmentWorkflowButton() {
    const e = sd();
    let t = "", i = null, o$1 = "";
    return e.status === "success" ? (t = "success", i = o.check, o$1 = "IDE Plugin and Java Hotswap are in use.") : e.status === "warning" ? (t = "warning", i = o.lightning, o$1 = "Improve Development Workflow") : e.status === "error" && (t = "error", i = o.alertCircle, o$1 = "Fix Development Workflow"), le`
      <div>
        <dt>Development Workflow</dt>
        <dd>
          <span class="${t}-text icon" id="development-status-value">${i}</span>
          <vaadin-tooltip for="development-status-value" text="${o$1}"></vaadin-tooltip>
          <button
            id="development-workflow-status-detail"
            class="link-button"
            @click=${() => {
      od();
    }}>
            Show details
          </button>
        </dd>
      </div>
    `;
  }
  getHotswapAgentLabelText(e) {
    return e === "success" ? "Java Hotswap is enabled" : e === "error" ? "Hotswap is partially enabled" : "Hotswap is disabled";
  }
  getIdePluginLabelText(e) {
    if (uu() !== "success")
      return "Not installed";
    if (e?.version) {
      let t = null;
      return e?.ide && (e?.ide === "intellij" ? t = "IntelliJ" : e?.ide === "vscode" ? t = "VS Code" : e?.ide === "eclipse" && (t = "Eclipse")), t ? `${e?.version} ${t}` : e?.version;
    }
    return "Not installed";
  }
  renderValue(e) {
    return e === "false" ? f(false, "False") : e === "true" ? f(true, "True") : e;
  }
  getInfoForClipboard(e) {
    const t = this.renderRoot.querySelectorAll(".items-start dt"), a = Array.from(t).map((n) => ({
      key: n.textContent.trim(),
      value: n.nextElementSibling.textContent.trim()
    })).filter((n) => n.key !== "Live reload").filter((n) => !n.key.startsWith("Vaadin Emplo")).filter((n) => n.key !== "Development Workflow").map((n) => {
      const { key: l2 } = n;
      let { value: r } = n;
      if (l2 === "IDE Plugin")
        r = this.getIdePluginLabelText(b.idePluginState) ?? "false";
      else if (l2 === "Java Hotswap") {
        const x = yn.jdkInfo?.jrebel, v = Ho();
        x && v === "success" ? r = "JRebel is in use" : r = this.getHotswapAgentLabelText(v);
      } else l2 === "Vaadin" && r.indexOf(`
`) !== -1 && (r = r.substring(0, r.indexOf(`
`)));
      return `${l2}: ${r}`;
    }).join(`
`);
    return e && $o({
      type: je.INFORMATION,
      message: "Environment information copied to clipboard",
      dismissId: "versionInfoCopied"
    }), a.trim();
  }
};
m = h([
  jl("copilot-info-panel")
], m);
let w = class extends cc {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback(), this.style.display = "flex";
  }
  render() {
    return le` <button
      @click=${() => {
      _$1.emit("system-info-with-callback", {
        callback: T$1,
        notify: true
      });
    }}
      aria-label="Copy to Clipboard"
      class="icon"
      title="Copy to Clipboard">
      <span>${o.copy}</span>
    </button>`;
  }
};
w = h([
  jl("copilot-info-actions")
], w);
const T = {
  header: "Info",
  expanded: false,
  panelOrder: 15,
  panel: "right",
  floating: false,
  tag: "copilot-info-panel",
  actionsTag: "copilot-info-actions",
  eager: true
  // Render even when collapsed as error handling depends on this
}, W = {
  init(e) {
    e.addPanel(T);
  }
};
window.Vaadin.copilot.plugins.push(W);
function f(e, t) {
  return e ? le`<span aria-label=${t} class="icon success-text" title=${t}>${o.check}</span>` : le`<span aria-label=${t} class="icon error-text" title=${t}>${o.x}</span>`;
}
export {
  w as Actions,
  m as CopilotInfoPanel
};
