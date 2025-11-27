package com.porotype.simplegesture;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SimpleGestureTest {

    @Test
    void addGestureUsesDefaultMaxDistanceAndStoresData() {
        var gesture = new SimpleGesture();
        gesture.setDefaultMaxDistance(15);
        gesture.addGesture("0123", "demo");

        assertTrue(gesture.getAllGestures().contains("0123"));
        assertEquals(15, gesture.getMaxDistanceForGesture("0123").orElse(-1));
    }

    @Test
    void gestureEventExposesMatchedData() {
        var gesture = new SimpleGesture();
        gesture.addGesture("7001", "Clockwise");

        var event = new SimpleGesture.GestureEvent(gesture, true, "7001", "7001", 0, false);

        assertEquals("Clockwise", event.getData());
        assertEquals("7001", event.getMatched());
        assertFalse(event.isRecordMode());
    }

    @Test
    void clearRemovesGestures() {
        var gesture = new SimpleGesture();
        gesture.addGesture("1111", "North");
        gesture.addGesture("2222", "West");

        gesture.clear();

        assertTrue(gesture.getAllGestures().isEmpty());
    }
}
