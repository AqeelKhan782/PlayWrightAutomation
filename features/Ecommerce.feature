Feature: Ecommerce Validations

  Scenario: Placing the order
    Given login to the Ecommerce application with "aqeelmiyankhan@gmail.com" and "Test!123"
    When add "ZARA COAT 3" to the cart
    Then verify "ZARA COAT 3" is displayed in the cart
    When enter valid details and place the order
    Then verify the order is present in the order history page
    
