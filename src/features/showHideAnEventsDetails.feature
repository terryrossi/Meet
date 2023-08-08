Feature: Show/Hide Event Details.
  Scenario: An event element is collapsed by default.
    Given a list of events
    When user doesn’t click
    Then all the events should show in collapsed mode

  Scenario: User can expand an event to see details.
    Given a list of events in collapsed mode
    When user clicks on show details button
    Then expand the event to see the details
    
  Scenario: User can collapse an event to hide details.
    Given a detailed view of an event
    When the user clicks on the hide details button
    Then the detailed view is collapsed