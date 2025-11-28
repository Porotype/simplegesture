package com.porotype.simplegesture;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.DomEvent;
import com.vaadin.flow.component.EventData;
import com.vaadin.flow.component.HasStyle;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.dom.Style;
import com.vaadin.flow.shared.Registration;
import java.io.Serializable;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.OptionalInt;
import java.util.Set;

/**
 * SimpleGesture component rewritten for Vaadin 25.
 * <p>
 * It listens to pointer (mouse + touch) movement on the page and tries to match the
 * captured movement against configured gestures described as sequences of direction
 * numbers (0-7). Matching uses Levenshtein distance on the sequences.
 */
@Tag("simple-gesture")
@JsModule("./simple-gesture.ts")
public class SimpleGesture extends Component implements HasStyle {

    private final Map<String, GestureDefinition> gestures = new LinkedHashMap<>();

    private int defaultMaxDistance = 20;
    private boolean recordMode = false;
    private boolean normalizing = false;

    public SimpleGesture() {
        this(null);
    }

    public SimpleGesture(Component target) {
        // target kept for backwards compatibility, not needed with global pointer listeners
        var style = getElement().getStyle();
        style.setDisplay(Style.Display.BLOCK);
        style.setPosition(Style.Position.ABSOLUTE);
        style.setWidth("0");
        style.setHeight("0");
        style.set("pointer-events", "none");
        syncStateToClient();
    }

    public boolean isRecordMode() {
        return recordMode;
    }

    public void setRecordMode(boolean recordMode) {
        if (this.recordMode == recordMode) {
            return;
        }
        this.recordMode = recordMode;
        getElement().setProperty("recordMode", recordMode);
    }

    public boolean isNormalizing() {
        return normalizing;
    }

    public void setNormalizing(boolean normalizing) {
        if (this.normalizing == normalizing) {
            return;
        }
        this.normalizing = normalizing;
        getElement().setProperty("normalizing", normalizing);
    }

    public void addGesture(String gesture) {
        addGesture(gesture, null, defaultMaxDistance);
    }

    public void addGesture(String gesture, Object data) {
        addGesture(gesture, data, defaultMaxDistance);
    }

    public void addGesture(String gesture, Object data, int maxDistance) {
        if (gesture == null || gesture.isBlank()) {
            return;
        }
        gestures.put(gesture, new GestureDefinition(gesture, data, maxDistance));
        syncGestures();
    }

    public void removeGesture(String gesture) {
        gestures.remove(gesture);
        syncGestures();
    }

    public Set<String> getAllGestures() {
        return Collections.unmodifiableSet(gestures.keySet());
    }

    public void clear() {
        gestures.clear();
        syncGestures();
    }

    public void setDefaultMaxDistance(int maxDistance) {
        if (maxDistance < 0) {
            return;
        }
        this.defaultMaxDistance = maxDistance;
        getElement().setProperty("maxDistance", maxDistance);
        syncGestures();
    }

    public int getDefaultMaxDistance() {
        return defaultMaxDistance;
    }

    public OptionalInt getMaxDistanceForGesture(String gesture) {
        GestureDefinition def = gestures.get(gesture);
        return def == null ? OptionalInt.empty() : OptionalInt.of(def.maxDistance());
    }

    public Registration addGestureEventListener(ComponentEventListener<GestureEvent> listener) {
        return addListener(GestureEvent.class, listener);
    }

    public Registration addGestureListener(GestureListener listener) {
        Objects.requireNonNull(listener, "GestureListener must not be null");
        return addListener(GestureEvent.class, listener::gesture);
    }

    GestureDefinition definitionFor(String pattern) {
        return gestures.get(pattern);
    }

    private void syncStateToClient() {
        getElement().setProperty("maxDistance", defaultMaxDistance);
        getElement().setProperty("recordMode", recordMode);
        getElement().setProperty("normalizing", normalizing);
        syncGestures();
    }

    private void syncGestures() {
        StringBuilder serialized = new StringBuilder("[");
        int index = 0;
        for (GestureDefinition definition : gestures.values()) {
            if (index++ > 0) {
                serialized.append(',');
            }
            serialized.append("{\"pattern\":\"")
                    .append(definition.pattern())
                    .append("\",\"maxDistance\":")
                    .append(definition.maxDistance())
                    .append('}');
        }
        serialized.append(']');
        getElement().setProperty("gestures", serialized.toString());
    }

    Object getGestureData(String pattern) {
        GestureDefinition def = gestures.get(pattern);
        return def != null ? def.data() : null;
    }

    @DomEvent("simple-gesture-detected")
    public static class GestureEvent extends ComponentEvent<SimpleGesture> {
        private final String matched;
        private final String moved;
        private final int distance;
        private final boolean recordMode;

        public GestureEvent(SimpleGesture source, boolean fromClient,
                @EventData("event.detail.matched") String matched,
                @EventData("event.detail.moved") String moved,
                @EventData("event.detail.distance") double distance,
                @EventData("event.detail.recordMode") boolean recordMode) {
            super(source, fromClient);
            this.matched = matched;
            this.moved = moved;
            this.distance = (int) Math.min(Math.round(distance), Integer.MAX_VALUE);
            this.recordMode = recordMode;
        }

        public String getMatched() {
            return matched;
        }

        public String getMoved() {
            return moved;
        }

        public int getDistance() {
            return distance;
        }

        public boolean isRecordMode() {
            return recordMode;
        }

        public Object getData() {
            return matched == null ? null : getSource().getGestureData(matched);
        }
    }

    public interface GestureListener extends Serializable {
        void gesture(GestureEvent event);
    }

    private record GestureDefinition(String pattern, Object data, int maxDistance) implements Serializable {
    }
}
