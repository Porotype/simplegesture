package com.porotype.simplegesture.ui;

import com.porotype.base.ui.component.ViewToolbar;
import com.porotype.simplegesture.SimpleGesture;
import com.porotype.simplegesture.SimpleGesture.GestureEvent;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Menu;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.util.ArrayList;
import java.util.List;

@Route("")
@PageTitle("Simple Gesture")
public class SimpleGestureView extends VerticalLayout {

    private final Button recordButton = new Button("Record gesture");
    private final SimpleGesture simpleGesture = new SimpleGesture();
    private final Grid<GestureRow> gestureGrid = new Grid<>(GestureRow.class, false);
    private final List<GestureRow> gestureRows = new ArrayList<>();
    private final Paragraph status = new Paragraph("Perform a gesture with your mouse or finger anywhere on the page.");

    public SimpleGestureView() {
        setSizeFull();
        setPadding(false);
        setSpacing(false);

        recordButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        recordButton.addClickListener(event -> toggleRecordMode());

        var normalize = new Checkbox("Normalize (skip duplicate directions)", simpleGesture.isNormalizing());
        normalize.addValueChangeListener(event -> simpleGesture.setNormalizing(Boolean.TRUE.equals(event.getValue())));

        var maxDistance = new IntegerField("Default max distance");
        maxDistance.setStepButtonsVisible(true);
        maxDistance.setMin(0);
        maxDistance.setValue(simpleGesture.getDefaultMaxDistance());
        maxDistance.addValueChangeListener(event -> {
            Integer value = event.getValue();
            int applied = value != null ? value : simpleGesture.getDefaultMaxDistance();
            simpleGesture.setDefaultMaxDistance(applied);
        });
ViewToolbar viewtoolbar = new ViewToolbar("Simple Gesture", ViewToolbar.group(recordButton, normalize, maxDistance));
add(viewtoolbar);


        configureGestureGrid();
        seedGestures();

        simpleGesture.addGestureEventListener(this::handleGesture);
        simpleGesture.getStyle().set("z-index", "1");

        add(status, gestureGrid, simpleGesture);
        setFlexGrow(1, gestureGrid);
        setHorizontalComponentAlignment(FlexComponent.Alignment.STRETCH, status, gestureGrid);
    }

    private void configureGestureGrid() {
        gestureGrid.addColumn(GestureRow::name).setHeader("Name").setAutoWidth(true);
        gestureGrid.addColumn(GestureRow::pattern).setHeader("Pattern").setAutoWidth(true);
        gestureGrid.addColumn(row -> row.maxDistance()).setHeader("Max distance").setAutoWidth(true);
        gestureGrid.setItems(gestureRows);
        gestureGrid.setHeight("100%");
        gestureGrid.setAllRowsVisible(true);
    }

    private void seedGestures() {
        addGesture("5443", "Counter clockwise", simpleGesture.getDefaultMaxDistance());
        addGesture("7001", "Clockwise", simpleGesture.getDefaultMaxDistance());
        addGesture("321076543", "Circle", simpleGesture.getDefaultMaxDistance());
        addGesture("43210134", "Squiggle", simpleGesture.getDefaultMaxDistance());
    }

    private void addGesture(String pattern, String name, int maxDistance) {
        simpleGesture.addGesture(pattern, name, maxDistance);
        gestureRows.add(new GestureRow(name, pattern, maxDistance));
        gestureGrid.getDataProvider().refreshAll();
    }

    private void handleGesture(GestureEvent event) {
        if (simpleGesture.isRecordMode()) {
            simpleGesture.setRecordMode(false);
            recordButton.setText("Record gesture");
            openRecordDialog(event.getMoved());
            return;
        }

        if (event.getMatched() != null) {
            status.setText("Matched: " + event.getData() + " (distance " + event.getDistance() + ")");
        } else {
            status.setText("No match. Last gesture: " + event.getMoved());
            Notification.show("No gesture matched", 2000, Notification.Position.BOTTOM_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_CONTRAST);
        }
    }

    private void openRecordDialog(String recordedGesture) {
        var dialog = new Dialog();
        dialog.setHeaderTitle("Save recorded gesture");

        var nameField = new TextField("Name");
        nameField.setRequired(true);
        nameField.setAutofocus(true);

        var distanceField = new IntegerField("Max distance");
        distanceField.setStepButtonsVisible(true);
        distanceField.setMin(0);
        distanceField.setValue(simpleGesture.getDefaultMaxDistance());

        var saveButton = new Button("Save", event -> {
            String name = nameField.getValue();
            if (name == null || name.isBlank()) {
                Notification.show("Please enter a name", 2000, Notification.Position.MIDDLE)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }
            Integer maxDistanceValue = distanceField.getValue();
            int maxDistance = maxDistanceValue != null ? maxDistanceValue : simpleGesture.getDefaultMaxDistance();
            addGesture(recordedGesture, name, maxDistance);
            dialog.close();
        });
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        var cancelButton = new Button("Cancel", event -> dialog.close());

        dialog.getFooter().add(cancelButton, saveButton);
        dialog.add(new Paragraph("Recorded pattern: " + recordedGesture), nameField, distanceField);
        dialog.open();
    }

    private void toggleRecordMode() {
        if (simpleGesture.isRecordMode()) {
            simpleGesture.setRecordMode(false);
            recordButton.setText("Record gesture");
            status.setText("Recording cancelled.");
        } else {
            simpleGesture.setRecordMode(true);
            recordButton.setText("Cancel recording");
            status.setText("Recording next gesture... move pointer or finger anywhere.");
        }
    }

    private record GestureRow(String name, String pattern, int maxDistance) {
    }
}
