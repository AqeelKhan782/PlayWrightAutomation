Feature: Ecommerce Validations

  @Regression
  Scenario: Placing the order
    Given login to the Ecommerce application with "aqeelmiyankhan@gmail.com" and "Test!123"
    When add "ZARA COAT 3" to the cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place the order
    Then verify the order is present in the order history page

  @Validation
  Scenario Outline: Login error validation scenarios
    Given login to the Ecommerce2 application with "<username>" and "<password>"
    Then verify error message is displayed
    Examples:
      | username             | password |
      | aqeel@gmail.com      | Test!123 |
      | helloaqeel@gmail.com | Test@123 |

