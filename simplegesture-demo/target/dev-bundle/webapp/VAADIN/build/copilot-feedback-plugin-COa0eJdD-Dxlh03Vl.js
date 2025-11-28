import { l as le, b as b$1, _ as _$1, s as se, w as wt, t as te, k as he, J as Ju, a as jl } from "./indexhtml-Dcb3eWVD.js";
import { b as b$2 } from "./state-CV9KAofd-DPCy3cx9.js";
import { f } from "./query-BykXNUlT-DDC0EGul.js";
import { l } from "./base-panel-Cr-JNsTK-DVS9JKZG.js";
import { o as o$1 } from "./icons-CDpVUE5Q-BnmowOHz.js";
const A = "copilot-feedback-panel{display:flex;flex-direction:column;font:var(--font-xsmall);gap:var(--space-200);padding:var(--space-150)}copilot-feedback-panel>p{margin:0}copilot-feedback-panel .dialog-footer{display:flex;gap:var(--space-100)}copilot-feedback-panel :is(vaadin-select,vaadin-text-area,vaadin-email-field){padding:0}copilot-feedback-panel :is(vaadin-select,vaadin-text-area,vaadin-email-field)::part(input-field),copilot-feedback-panel vaadin-select-value-button{padding:0}copilot-feedback-panel vaadin-select::part(toggle-button){align-items:center;display:flex;height:var(--copilot-size-md);justify-content:center;width:var(--copilot-size-md)}copilot-feedback-panel vaadin-text-area textarea{line-height:var(--line-height-1);padding:calc((var(--copilot-size-md) - var(--line-height-1)) / 2) var(--space-100)}copilot-feedback-panel vaadin-text-area:hover::part(input-field){background:none}copilot-feedback-panel vaadin-email-field input{padding:0 var(--space-100)}copilot-feedback-panel>*::part(label){font-weight:var(--font-weight-medium);line-height:var(--line-height-1);margin:0;padding:0 var(--space-150) var(--space-50) 0}copilot-feedback-panel>*::part(helper-text){line-height:var(--line-height-1);margin:0}";
var P = Object.defineProperty, F = Object.getOwnPropertyDescriptor, o = (e, t, n, l2) => {
  for (var a = l2 > 1 ? void 0 : l2 ? F(t, n) : t, p = e.length - 1, r; p >= 0; p--)
    (r = e[p]) && (a = (l2 ? r(t, n, a) : r(a)) || a);
  return l2 && a && P(t, n, a), a;
};
const T = "https://github.com/vaadin", b = "https://github.com/vaadin/copilot/issues/new", D = "?template=feature_request.md&title=%5BFEATURE%5D", E = "A short, concise description of the bug and why you consider it a bug. Any details like exceptions and logs can be helpful as well.", C = "Please provide as many details as possible, this will help us deliver a fix as soon as possible.%0AThank you!%0A%0A%23%23%23 Description of the Bug%0A%0A{description}%0A%0A%23%23%23 Expected Behavior%0A%0AA description of what you would expect to happen. (Sometimes it is clear what the expected outcome is if something does not work, other times, it is not super clear.)%0A%0A%23%23%23 Minimal Reproducible Example%0A%0AWe would appreciate the minimum code with which we can reproduce the issue.%0A%0A%23%23%23 Versions%0A{versionsInfo}";
let i = class extends l {
  constructor() {
    super(), this.description = "", this.types = [
      {
        label: "Generic feedback",
        value: "feedback",
        ghTitle: ""
      },
      {
        label: "Report a bug",
        value: "bug",
        ghTitle: "[BUG]"
      },
      {
        label: "Ask a question",
        value: "question",
        ghTitle: "[QUESTION]"
      },
      {
        label: "Share an idea",
        value: "idea",
        ghTitle: "[FEATURE]"
      }
    ], this.type = this.types[0].value, this.topics = [
      {
        label: "Generic",
        value: "platform"
      },
      {
        label: "Flow",
        value: "flow"
      },
      {
        label: "Hilla",
        value: "hilla"
      },
      {
        label: "Copilot",
        value: "copilot"
      }
    ], this.topic = this.topics[0].value;
  }
  render() {
    return le`<style>
        ${A}</style
      >${this.renderContent()}${this.renderFooter()}`;
  }
  renderContent() {
    return this.message === void 0 ? le`
          <p>
            Your insights are incredibly valuable to us. Whether you’ve encountered a hiccup, have questions, or ideas
            to make our platform better, we're all ears! If you wish, leave your email, and we’ll get back to you. You
            can even share your code snippet with us for a clearer picture.
          </p>
          <vaadin-select
            .items="${this.types}"
            .value="${this.type}"
            overlay-class="alwaysVisible"
            @value-changed=${(e) => {
      this.type = e.detail.value;
    }}>
          </vaadin-select>
          <vaadin-select
            label="Feedback Topic"
            overlay-class="alwaysVisible"
            .items=${this.topics}
            .value="${this.topic}"
            .hidden=${this.type !== "feedback"}
            @value-changed=${(e) => {
      this.topic = e.detail.value;
    }}>
          </vaadin-select>
          <vaadin-text-area
            .value="${this.description}"
            @keydown=${this.keyDown}
            @focus=${() => {
      this.descriptionField.invalid = false, this.descriptionField.placeholder = "";
    }}
            @value-changed=${(e) => {
      this.description = e.detail.value;
    }}
            label="Tell Us More"
            helper-text="Describe what you're experiencing, wondering about, or envisioning. The more you share, the better we can understand and act on your feedback"></vaadin-text-area>
          <vaadin-text-field
            @keydown=${this.keyDown}
            @value-changed=${(e) => {
      this.email = e.detail.value;
    }}
            .required=${this.type === "question"}
            id="email"
            value="${b$1.userInfo?.email}"
            label="Your Email${this.type === "question" ? "" : " (Optional)"}"
            helper-text="Leave your email if you’d like us to follow up, we’d love to keep the conversation going."></vaadin-text-field>
        ` : le`<p>${this.message}</p>`;
  }
  renderFooter() {
    return this.message === void 0 ? le`
          <div class="dialog-footer">
            <button
              style="margin-inline-end: auto"
              @click="${() => {
      b$1.active ? _$1.emit("system-info-with-callback", {
        callback: (e) => this.openGithub(e, this),
        notify: false
      }) : this.openGithub(null, this);
    }}">
              <span class="prefix">${o$1.github}</span>
              Create GitHub Issue
            </button>
            <button @click="${this.close}">Cancel</button>
            <button class="primary" @click="${this.submit}" .disabled=${this.type === "question" && !this.email}>
              Submit
            </button>
          </div>
        ` : le` <div class="footer">
          <vaadin-button @click="${this.close}">Close</vaadin-button>
        </div>`;
  }
  close() {
    se.updatePanel("copilot-feedback-panel", {
      floating: false
    });
  }
  submit() {
    if (wt("feedback", { github: false, type: this.type, topic: this.topic }), this.description.trim() === "") {
      this.descriptionField.invalid = true, this.descriptionField.placeholder = "Please tell us more before sending", this.descriptionField.value = "";
      return;
    }
    const e = {
      description: this.description,
      email: this.email,
      type: this.type,
      topic: this.topic
    };
    b$1.active ? _$1.emit("system-info-with-callback", {
      callback: (t) => te(`${he}feedback`, { ...e, versions: t }),
      notify: false
    }) : te(`${he}feedback`, { ...e, versions: {} }), this.parentNode?.style.setProperty("--section-height", "150px"), this.message = "Thank you for sharing feedback.";
  }
  keyDown(e) {
    (e.key === "Backspace" || e.key === "Delete") && e.stopPropagation();
  }
  openGithub(e, t) {
    if (wt("feedback", { github: true, type: this.type, topic: this.topic }), this.type === "idea") {
      window.open(`${b}${D}`);
      return;
    }
    if (this.type === "feedback") {
      window.open(`${T}/${this.topic}/issues/new`);
      return;
    }
    const n = e ? e.replace(/\n/g, "%0A") : "Activate Copilot to include version info.", l2 = `${t.types.find((r) => r.value === this.type)?.ghTitle}`, a = t.description !== "" ? t.description : E, p = C.replace("{description}", a).replace("{versionsInfo}", n);
    window.open(`${b}?title=${l2}&body=${p}`, "_blank")?.focus();
  }
};
o([
  b$2()
], i.prototype, "description", 2);
o([
  b$2()
], i.prototype, "type", 2);
o([
  b$2()
], i.prototype, "topic", 2);
o([
  b$2()
], i.prototype, "email", 2);
o([
  b$2()
], i.prototype, "message", 2);
o([
  b$2()
], i.prototype, "types", 2);
o([
  b$2()
], i.prototype, "topics", 2);
o([
  f("vaadin-text-area")
], i.prototype, "descriptionField", 2);
i = o([
  jl("copilot-feedback-panel")
], i);
const y = Ju({
  header: "Help Us Improve!",
  tag: "copilot-feedback-panel",
  width: 500,
  height: 550,
  floatingPosition: {
    top: 100,
    left: 100
  },
  individual: true
}), U = {
  init(e) {
    e.addPanel(y);
  }
};
window.Vaadin.copilot.plugins.push(U);
se.addPanel(y);
export {
  i as CopilotFeedbackPanel
};
