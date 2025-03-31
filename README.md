# Handyvol

Handyvol is a web application that connects independent volunteers with event organizers. It helps individuals who want to participate in charity initiatives find suitable events, register for them, and track their experiences. Organizers receive a convenient tool for finding and managing volunteers.

## Features

### Authentication and Security
- Secure authentication based on JWT tokens
- User registration and login/logout functionality
- Password recovery system
- HTTP Interceptor for automatic token processing

### Event Management
- Organizers can create and edit events
- Set event location, date, category, and number of participants
- Display a list of all events with filtering options

### Volunteer Registration
- Volunteers can browse events and submit applications
- "Take Part" button for easy registration
- Automatic updates on the number of available spots
- Option to cancel participation if needed

### Organizer Control Panel
- Manage volunteer applications
- View and edit event details
- Attendance and engagement analytics

### Comprehensive API and CRUD Operations
- Create, read, update, and delete events
- Link reviews and photos to authenticated users
- Token-based authentication for secure API access

### API Testing and Documentation
- Full API testing in Postman
- Detailed documentation outlining all endpoints
- Implementation of all required HTTP methods (GET, POST, PUT, DELETE)

## Technology Stack

### Front-End
- Angular framework
- Interfaces and classes for API communication
- Services for retrieving data from the API
- At least 4 `(click)` events interacting with the API
- At least 4 `[(ngModel)]` bindings
- CSS for styling
- Configured Routing module
- Use of Angular directives: `*ngFor`, `*ngIf`
- JWT-based authentication
- HTTP interceptor for handling authentication tokens
- Login and logout functionality
