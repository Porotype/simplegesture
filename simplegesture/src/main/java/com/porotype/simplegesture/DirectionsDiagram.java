package com.porotype.simplegesture;

import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.Svg;

/**
 * An SVG diagram showing the 8 gesture directions (0-7) used by SimpleGesture.
 * <p>
 * Direction 0 is East (right), and directions increase counter-clockwise:
 * <ul>
 *   <li>0 = East (→)</li>
 *   <li>1 = Northeast (↗)</li>
 *   <li>2 = North (↑)</li>
 *   <li>3 = Northwest (↖)</li>
 *   <li>4 = West (←)</li>
 *   <li>5 = Southwest (↙)</li>
 *   <li>6 = South (↓)</li>
 *   <li>7 = Southeast (↘)</li>
 * </ul>
 */
public class DirectionsDiagram extends Svg {

    private static final String SVG = """
        <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Background circle -->
          <circle cx="100" cy="100" r="90" fill="none" stroke="#ccc" stroke-width="1"/>

          <!-- Direction lines -->
          <line x1="100" y1="100" x2="180" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <line x1="100" y1="100" x2="157" y2="43" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <line x1="100" y1="100" x2="100" y2="20" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <line x1="100" y1="100" x2="43" y2="43" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <line x1="100" y1="100" x2="20" y2="100" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <line x1="100" y1="100" x2="43" y2="157" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <line x1="100" y1="100" x2="100" y2="180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <line x1="100" y1="100" x2="157" y2="157" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>

          <!-- Arrowhead marker -->
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
            </marker>
          </defs>

          <!-- Direction numbers -->
          <text x="185" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">0</text>
          <text x="162" y="38" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">1</text>
          <text x="95" y="12" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">2</text>
          <text x="28" y="38" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">3</text>
          <text x="5" y="105" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">4</text>
          <text x="28" y="172" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">5</text>
          <text x="95" y="198" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">6</text>
          <text x="162" y="172" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1676f3">7</text>

          <!-- Center dot -->
          <circle cx="100" cy="100" r="4" fill="#333"/>
        </svg>
        """;

    public DirectionsDiagram() {
        super(SVG);
    }
}
