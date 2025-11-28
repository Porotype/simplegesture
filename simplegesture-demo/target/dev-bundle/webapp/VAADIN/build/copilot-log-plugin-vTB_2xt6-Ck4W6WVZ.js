import { c as cc, _ as _$1, l as le, b as b$1, V as Vo, U as Ut, L as Lu, j as je, h as hl, w as wt, Z as Ze, P as Pu, s as se, a as jl } from "./indexhtml-Dcb3eWVD.js";
import { b as b$2 } from "./state-CV9KAofd-DPCy3cx9.js";
import { l } from "./base-panel-Cr-JNsTK-DVS9JKZG.js";
import { o } from "./icons-CDpVUE5Q-BnmowOHz.js";
const C = 'copilot-log-panel ul{list-style-type:none;margin:0;padding:0}copilot-log-panel ul li{align-items:start;display:flex;gap:var(--space-50);padding:var(--space-100) var(--space-50);position:relative}copilot-log-panel ul li:before{border-bottom:1px dashed var(--divider-primary-color);content:"";inset:auto 0 0 calc(var(--copilot-size-md) + var(--space-100));position:absolute}copilot-log-panel ul li span.icon{display:flex;flex-shrink:0;justify-content:center;width:var(--copilot-size-md)}copilot-log-panel ul li.information span.icon{color:var(--blue-color)}copilot-log-panel ul li.warning span.icon{color:var(--warning-color)}copilot-log-panel ul li.error span.icon{color:var(--error-color)}copilot-log-panel ul li .message{display:flex;flex-direction:column;flex-grow:1;overflow:hidden}copilot-log-panel ul li:not(.expanded) span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}copilot-log-panel ul li button svg{transition:transform .15s cubic-bezier(.2,0,0,1)}copilot-log-panel ul li button[aria-expanded=true] svg{transform:rotate(90deg)}copilot-log-panel ul li code{margin-top:var(--space-50)}copilot-log-panel ul li.expanded .secondary{margin-top:var(--space-100)}copilot-log-panel .secondary a{display:block;margin-bottom:var(--space-50)}';
var _ = Object.defineProperty, b = Object.getOwnPropertyDescriptor, u = (e, t, a, i) => {
  for (var o2 = i > 1 ? void 0 : i ? b(t, a) : t, d = e.length - 1, s; d >= 0; d--)
    (s = e[d]) && (o2 = (i ? s(t, a, o2) : s(o2)) || o2);
  return i && o2 && _(t, a, o2), o2;
};
class U {
  constructor() {
    this.showTimestamps = false, Ze(this);
  }
  toggleShowTimestamps() {
    this.showTimestamps = !this.showTimestamps;
  }
}
const h = new U();
let r = class extends l {
  constructor() {
    super(...arguments), this.unreadErrors = false, this.messages = [], this.nextMessageId = 1, this.transitionDuration = 0, this.errorHandlersAdded = false;
  }
  connectedCallback() {
    if (super.connectedCallback(), this.onCommand("log", (e) => {
      this.handleLogEventData({ type: e.data.type, message: e.data.message });
    }), this.onEventBus("log", (e) => this.handleLogEvent(e)), this.onEventBus("update-log", (e) => this.updateLog(e.detail)), this.onEventBus("notification-shown", (e) => this.handleNotification(e)), this.onEventBus("clear-log", () => this.clear()), this.reaction(
      () => b$1.sectionPanelResizing,
      () => {
        this.requestUpdate();
      }
    ), this.transitionDuration = parseInt(
      window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),
      10
    ), !this.errorHandlersAdded) {
      const e = (t) => {
        Pu(() => {
          se.attentionRequiredPanelTag = "copilot-log-panel";
        }), this.log(je.ERROR, t.message, !!t.internal, t.details, t.link);
      };
      Vo((t) => {
        e(t);
      }), Ut.forEach((t) => {
        e(t);
      }), Ut.length = 0, this.errorHandlersAdded = true;
    }
  }
  clear() {
    this.messages = [];
  }
  handleNotification(e) {
    this.log(e.detail.type, e.detail.message, true, e.detail.details, e.detail.link);
  }
  handleLogEvent(e) {
    this.handleLogEventData(e.detail);
  }
  handleLogEventData(e) {
    this.log(
      e.type,
      e.message,
      !!e.internal,
      e.details,
      e.link,
      Lu(e.expandedMessage),
      Lu(e.expandedDetails),
      e.id
    );
  }
  activate() {
    this.unreadErrors = false, this.updateComplete.then(() => {
      const e = this.renderRoot.querySelector(".message:last-child");
      e && e.scrollIntoView();
    });
  }
  render() {
    return le`
      <style>
        ${C}
      </style>
      <ul>
        ${this.messages.map((e) => this.renderMessage(e))}
      </ul>
    `;
  }
  renderMessage(e) {
    let t, a;
    return e.type === je.ERROR ? (a = o.alertTriangle, t = "Error") : e.type === je.WARNING ? (a = o.warning, t = "Warning") : (a = o.info, t = "Info"), le`
      <li
        class="${e.type} ${e.expanded ? "expanded" : ""} ${e.details || e.link ? "has-details" : ""}"
        data-id="${e.id}">
        <span aria-label="${t}" class="icon" title="${t}">${a}</span>
        <span class="message" @click=${() => this.toggleExpanded(e)}>
          <span class="timestamp" ?hidden=${!h.showTimestamps}>${W(e.timestamp)}</span>
          <span class="primary">
            ${e.expanded && e.expandedMessage ? e.expandedMessage : e.message}
          </span>
          ${e.expanded ? le` <span class="secondary"> ${e.expandedDetails ?? e.details} </span>` : le` <span class="secondary" ?hidden="${!e.details && !e.link}">
                ${Lu(e.details)}
                ${e.link ? le` <a href="${e.link}" target="_blank">Learn more</a>` : ""}
              </span>`}
        </span>
        <!-- TODO: a11y, button needs aria-controls with unique ids -->
        <button
          aria-controls="content"
          aria-expanded="${e.expanded}"
          aria-label="Expand details"
          class="icon"
          @click=${() => this.toggleExpanded(e)}
          ?hidden=${!this.canBeExpanded(e)}>
          <span>${o.chevronRight}</span>
        </button>
      </li>
    `;
  }
  log(e, t, a, i, o2, d, s, R) {
    const S = this.nextMessageId;
    this.nextMessageId += 1, s || (s = t);
    const m = {
      id: S,
      type: e,
      message: t,
      details: i,
      link: o2,
      dontShowAgain: false,
      deleted: false,
      expanded: false,
      expandedMessage: d,
      expandedDetails: s,
      timestamp: /* @__PURE__ */ new Date(),
      internal: a,
      userId: R
    };
    for (this.messages.push(m); this.messages.length > r.MAX_LOG_ROWS; )
      this.messages.shift();
    return this.requestUpdate(), this.updateComplete.then(() => {
      const f = this.renderRoot.querySelector(".message:last-child");
      f ? (setTimeout(() => f.scrollIntoView({ behavior: "smooth" }), this.transitionDuration), this.unreadErrors = false) : e === je.ERROR && (this.unreadErrors = true);
    }), m;
  }
  updateLog(e) {
    let t = this.messages.find((a) => a.userId === e.id);
    t || (t = this.log(je.INFORMATION, "<Log message to update was not found>", false)), Object.assign(t, e), hl(t.expandedDetails) && (t.expandedDetails = Lu(t.expandedDetails)), this.requestUpdate();
  }
  updated() {
    const e = this.querySelector(".row:last-child");
    e && this.isTooLong(e.querySelector(".firstrowmessage")) && e.querySelector("button.expand")?.removeAttribute("hidden");
  }
  toggleExpanded(e) {
    this.canBeExpanded(e) && (e.expanded = !e.expanded, this.requestUpdate()), wt("use-log", { source: "toggleExpanded" });
  }
  canBeExpanded(e) {
    if (e.expandedMessage || e.expanded)
      return true;
    const t = this.querySelector(`[data\\-id="${e.id}"]`)?.querySelector(
      ".firstrowmessage"
    );
    return this.isTooLong(t);
  }
  isTooLong(e) {
    return e && e.offsetWidth < e.scrollWidth;
  }
};
r.MAX_LOG_ROWS = 1e3;
u([
  b$2()
], r.prototype, "unreadErrors", 2);
u([
  b$2()
], r.prototype, "messages", 2);
r = u([
  jl("copilot-log-panel")
], r);
let y = class extends cc {
  createRenderRoot() {
    return this;
  }
  render() {
    return le`
      <style>
        copilot-log-panel-actions {
          display: contents;
        }
      </style>
      <button
        aria-label="Clear log"
        class="icon"
        title="Clear log"
        @click=${() => {
      _$1.emit("clear-log", {});
    }}>
        <span>${o.trash}</span>
      </button>
      <button
        aria-label="Toggle timestamps"
        class="icon"
        title="Toggle timestamps"
        @click=${() => {
      h.toggleShowTimestamps();
    }}>
        <span class="${h.showTimestamps ? "on" : "off"}"> ${o.clock} </span>
      </button>
    `;
  }
};
y = u([
  jl("copilot-log-panel-actions")
], y);
const T = {
  header: "Log",
  expanded: true,
  panelOrder: 0,
  panel: "bottom",
  floating: false,
  tag: "copilot-log-panel",
  actionsTag: "copilot-log-panel-actions",
  individual: true
}, N = {
  init(e) {
    e.addPanel(T);
  }
};
window.Vaadin.copilot.plugins.push(N);
se.addPanel(T);
const w = { hour: "numeric", minute: "numeric", second: "numeric", fractionalSecondDigits: 3 };
let g;
try {
  g = new Intl.DateTimeFormat(navigator.language, w);
} catch (e) {
  console.error("Failed to create date time formatter for ", navigator.language, e), g = new Intl.DateTimeFormat("en-US", w);
}
function W(e) {
  return g.format(e);
}
export {
  y as Actions,
  r as CopilotLogPanel
};
