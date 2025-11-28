import { J as Ju, a as jl, _ as _$1, O, l as le, s as se, m as hc, n as cd } from "./indexhtml-Dcb3eWVD.js";
import { l } from "./base-panel-Cr-JNsTK-DVS9JKZG.js";
import { o } from "./icons-CDpVUE5Q-BnmowOHz.js";
const y = 'copilot-shortcuts-panel{display:flex;flex-direction:column;padding:var(--space-150)}copilot-shortcuts-panel h3{font:var(--font-xsmall-semibold);margin-bottom:var(--space-100);margin-top:0}copilot-shortcuts-panel h3:not(:first-of-type){margin-top:var(--space-200)}copilot-shortcuts-panel ul{display:flex;flex-direction:column;list-style:none;margin:0;padding:0}copilot-shortcuts-panel ul li{display:flex;align-items:center;gap:var(--space-50);position:relative}copilot-shortcuts-panel ul li:not(:last-of-type):before{border-bottom:1px dashed var(--border-color);content:"";inset:auto 0 0 calc(var(--copilot-size-md) + var(--space-50));position:absolute}copilot-shortcuts-panel ul li span:has(svg){align-items:center;display:flex;height:var(--copilot-size-md);justify-content:center;width:var(--copilot-size-md)}copilot-shortcuts-panel .kbds{margin-inline-start:auto}copilot-shortcuts-panel kbd{align-items:center;border:1px solid var(--border-color);border-radius:var(--vaadin-radius-m);box-sizing:border-box;display:inline-flex;font-family:var(--copilot-font-family);font-size:var(--font-size-1);line-height:var(--line-height-1);padding:0 var(--space-50)}', u = window.Vaadin.copilot.tree;
if (!u)
  throw new Error("Tried to access copilot tree before it was initialized.");
var x = (o2, l2, h, p) => {
  for (var s = l2, n = o2.length - 1, r; n >= 0; n--)
    (r = o2[n]) && (s = r(s) || s);
  return s;
};
let d = class extends l {
  constructor() {
    super(), this.onTreeUpdated = () => {
      this.requestUpdate();
    };
  }
  connectedCallback() {
    super.connectedCallback(), _$1.on("copilot-tree-created", this.onTreeUpdated);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), _$1.off("copilot-tree-created", this.onTreeUpdated);
  }
  render() {
    const o$1 = u.hasFlowComponents();
    return le`<style>
        ${y}
      </style>
      <h3>Global</h3>
      <ul>
        <li>
          <span>${o.vaadinLogo}</span>
          <span>Copilot</span>
          ${a(cd.toggleCopilot)}
        </li>
        <li>
          <span>${o.flipBack}</span>
          <span>Undo</span>
          ${a(cd.undo)}
        </li>
        <li>
          <span>${o.flipForward}</span>
          <span>Redo</span>
          ${a(cd.redo)}
        </li>
      </ul>
      <h3>Selected component</h3>
      <ul>
        <li>
          <span>${o.terminal}</span>
          <span>Open AI popover</span>
          ${a(cd.openAiPopover)}
        </li>
        <li>
          <span>${o.fileCodeAlt}</span>
          <span>Go to source</span>
          ${a(cd.goToSource)}
        </li>
        ${o$1 ? le`<li>
              <span>${o.code}</span>
              <span>Go to attach source</span>
              ${a(cd.goToAttachSource)}
            </li>` : O}
        <li>
          <span>${o.copy}</span>
          <span>Copy</span>
          ${a(cd.copy)}
        </li>
        <li>
          <span>${o.clipboard}</span>
          <span>Paste</span>
          ${a(cd.paste)}
        </li>
        <li>
          <span>${o.copyAlt}</span>
          <span>Duplicate</span>
          ${a(cd.duplicate)}
        </li>
        <li>
          <span>${o.userUp}</span>
          <span>Select parent</span>
          ${a(cd.selectParent)}
        </li>
        <li>
          <span>${o.userLeft}</span>
          <span>Select previous sibling</span>
          ${a(cd.selectPreviousSibling)}
        </li>
        <li>
          <span>${o.userRight}</span>
          <span>Select first child / next sibling</span>
          ${a(cd.selectNextSibling)}
        </li>
        <li>
          <span>${o.trash}</span>
          <span>Delete</span>
          ${a(cd.delete)}
        </li>
        <li>
          <span>${o.zap}</span>
          <span>Quick add from palette</span>
          ${a("<kbd>A ... Z</kbd>")}
        </li>
      </ul>`;
  }
  /**
   * Closes the panel. Used from shortcuts
   */
  close() {
    se.updatePanel("copilot-shortcuts-panel", {
      floating: false
    });
  }
};
d = x([
  jl("copilot-shortcuts-panel")
], d);
function a(o2) {
  return le`<span class="kbds">${hc(o2)}</span>`;
}
const C = Ju({
  header: "Keyboard Shortcuts",
  tag: "copilot-shortcuts-panel",
  width: 400,
  height: 550,
  floatingPosition: {
    top: 50,
    left: 50
  }
}), P = {
  init(o2) {
    o2.addPanel(C);
  }
};
window.Vaadin.copilot.plugins.push(P);
