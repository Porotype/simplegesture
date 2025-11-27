# Simplegesture README

A Vaadin 25 playground that includes a modern rewrite of the classic SimpleGesture component.
Use it to capture mouse or touch gestures as sequences of directions (0-7) and match them with
Levenshtein distance.

## Project Structure

The sources of your Simplegesture have the following structure:

```
src
├── main/java
│   └── [application package]
│       ├── base
│       │   └── ui
│       │       ├── component
│       │       │   └── ViewToolbar.java
│       │       └── MainLayout.java
│       ├── examplefeature
│       │   ├── ui
│       │   │   └── TaskListView.java
│       │   ├── Task.java
│       │   ├── TaskRepository.java
│       │   └── TaskService.java                
│       └── Application.java     
├── main/resources
│   ├── META-INF
│   │   └── resources
│   │       └── styles.css
│   └── application.properties 
└── test/java
    └── [application package]
        └── examplefeature
           └── TaskServiceTest.java                 
```

The main entry point into the application is `Application.java`. This class contains the `main()` method that start up 
the Spring Boot application.

The skeleton follows a *feature-based package structure*, organizing code by *functional units* rather than traditional 
architectural layers. It includes two feature packages: `base` and `examplefeature`.

* The `base` package contains classes meant for reuse across different features, either through composition or 
  inheritance. You can use them as-is, tweak them to your needs, or remove them.
* The `examplefeature` package is an example feature package that demonstrates the structure. It represents a 
  *self-contained unit of functionality*, including UI components, business logic, data access, and an integration test.
  Once you create your own features, *you'll remove this package*.
* The `simplegesture` package contains the rewritten component (`SimpleGesture`) and a demo view available at
  `/gestures`.


## Starting in Development Mode

To start the application in development mode, import it into your IDE and run the `Application` class. 
You can also start the application from the command line by running: 

```bash
./mvnw
```

## Building for Production

To build the application in production mode, run:

```bash
./mvnw package
```

To build a Docker image, run:

```bash
docker build -t my-application:latest .
```

If you use commercial components, pass the license key as a build secret:

```bash
docker build --secret id=proKey,src=$HOME/.vaadin/proKey .
```

## Trying the gesture demo

Run `./mvnw` and open http://localhost:8080/gestures. Move the mouse (or touch on a phone/tablet) anywhere on the page
to trigger gestures. Use the "Record gesture" button to capture a new sequence and save it with a name. The default
gestures include clockwise/counter-clockwise turns and a circle.

## Using the SimpleGesture component

```java
var gestures = new SimpleGesture();
gestures.addGesture("7001", "Clockwise");
gestures.setNormalizing(true);          // optional: collapse repeated directions
gestures.setDefaultMaxDistance(20);     // Levenshtein distance threshold

gestures.addGestureEventListener(event -> {
    if (event.getMatched() != null) {
        Notification.show("Gesture: " + event.getData());
    }
});

add(gestures); // component is invisible but listens globally to pointer events
```

## Getting Started

The [Getting Started](https://vaadin.com/docs/latest/getting-started) guide will quickly familiarize you with your new
Simplegesture implementation. You'll learn how to set up your development environment, understand the project 
structure, and find resources to help you add muscles to your skeleton — transforming it into a fully-featured 
application.
