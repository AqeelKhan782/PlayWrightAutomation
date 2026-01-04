Feature: Ecommerce Validations

  @Validation
  Scenario Outline: Placing the order
    Given login to the Ecommerce2 application with "<username>" and "<password>"
    Then verify error message is displayed
    Examples:
      | username             | password |
      | aqeel@gmail.com      | Test!123 |
      | helloaqeel@gmail.com | Test@123 |
