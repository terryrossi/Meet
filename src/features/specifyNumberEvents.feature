Feature: Specify the number of Events
  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given a default of 32 in the input field for the number of events
    When user does not modify this number
    Then the list of events is filtered to 32 maximum events

  Scenario: User can change the number of events displayed.
    Given a default of 32 in the input field for the number of events
    When the user modifies this number
    Then the list of events is filtered to a new number of events based on the entered number
    