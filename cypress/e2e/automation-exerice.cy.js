describe('Automation Exercise Website', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com')


    cy.get('body').then(($body) => {
      if ($body.find('.modal-content').length > 0) {
        cy.get('.modal-content').invoke('remove')
      }
    })
  })

  // -----------------------------
  // Test Case 1
  // -----------------------------
  it('Verify Homepage Loads', () => {

    cy.url().should('include', 'automationexercise')

    cy.get('.logo').should('be.visible')

    cy.get('.navbar-nav').should('be.visible')

    cy.contains('Signup / Login').should('be.visible')

    cy.screenshot()
  })

  // -----------------------------
  // Test Case 2
  // -----------------------------
  it('Register a New User', () => {

    const email = `student${Date.now()}@test.com`

    cy.contains('Signup / Login').click()

    cy.get('[data-qa="signup-name"]').type('Student')

    cy.get('[data-qa="signup-email"]').type(email)

    cy.get('[data-qa="signup-button"]').click()

    cy.get('#id_gender1').check()

    cy.get('[data-qa="password"]').type('Password123')

    cy.get('[data-qa="days"]').select('10')
    cy.get('[data-qa="months"]').select('May')
    cy.get('[data-qa="years"]').select('2000')

    cy.get('[data-qa="first_name"]').type('John')
    cy.get('[data-qa="last_name"]').type('Doe')
    cy.get('[data-qa="company"]').type('Test Company')
    cy.get('[data-qa="address"]').type('123 Main Street')

    cy.get('[data-qa="country"]').select('Canada')

    cy.get('[data-qa="state"]').type('Ontario')
    cy.get('[data-qa="city"]').type('Toronto')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('123456789')

    cy.get('[data-qa="create-account"]').click()

    cy.contains('Account Created!').should('be.visible')

    cy.get('[data-qa="continue-button"]').click()

    cy.contains('Logged in as').should('be.visible')

    cy.contains('Delete Account').click()

    cy.contains('Account Deleted!').should('be.visible')
    cy.screenshot()
  })

  // -----------------------------
  // Test Case 3
  // -----------------------------
  it('Login With Valid Credentials', () => {

    const email = `student${Date.now()}johndoe@gmail.com`
    const password = 'Password123'


    cy.contains('Signup / Login').click()

    cy.get('[data-qa="signup-name"]').type('Student')
    cy.get('[data-qa="signup-email"]').type(email)
    cy.get('[data-qa="signup-button"]').click()

    cy.get('#id_gender1').check()
    cy.get('[data-qa="password"]').type(password)

    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('January')
    cy.get('[data-qa="years"]').select('2000')

    cy.get('[data-qa="first_name"]').type('John')
    cy.get('[data-qa="last_name"]').type('Doe')
    cy.get('[data-qa="address"]').type('Address')

    cy.get('[data-qa="country"]').select('India')

    cy.get('[data-qa="state"]').type('State')
    cy.get('[data-qa="city"]').type('City')
    cy.get('[data-qa="zipcode"]').type('12345')
    cy.get('[data-qa="mobile_number"]').type('123456789')

    cy.get('[data-qa="create-account"]').click()

    cy.get('[data-qa="continue-button"]').click()

    cy.contains('Logout').click()

    cy.contains('Signup / Login').click()

    cy.get('[data-qa="login-email"]')
  .type(email)

    cy.get('[data-qa="login-password"]')
  .type(password)

    cy.get('[data-qa="login-button"]')
  .click()

    cy.contains('Logged in as').should('be.visible')

    cy.contains('Logout').click()

    cy.url().should('include', '/login')

    cy.screenshot()
  })

  // -----------------------------
  // Test Case 4
  // -----------------------------
  it('Login With Invalid Credentials', () => {

    cy.contains('Signup / Login').click()

    cy.get('[data-qa="login-email"]')
      .type('wrong@test.com')

    cy.get('[data-qa="login-password"]')
      .type('wrongpassword')

    cy.get('[data-qa="login-button"]').click()

    cy.contains('Your email or password is incorrect!')
      .should('be.visible')

    cy.screenshot()
  })

  // -----------------------------
  // Test Case 5
  // -----------------------------
  it('Search for a Product', () => {

    cy.contains('Products').click()

    cy.url().should('include', '/products')

    cy.get('#search_product').type('dress')

    cy.get('#submit_search').click()

    cy.contains('Searched Products').should('be.visible')

    cy.get('.productinfo')
      .should('contain.text', 'Dress')

    cy.screenshot()
  })

  // -----------------------------
  // Test Case 6
  // -----------------------------
  it('View Product Details', () => {

    cy.contains('Products').click()

    cy.contains('View Product').first().click()

    cy.get('.product-information')
      .should('be.visible')

    cy.contains('Category')
    cy.contains('Availability')
    cy.contains('Condition')
    cy.contains('Brand')
    cy.screenshot()
  })

  // -----------------------------
  // Test Case 7
  // -----------------------------
  it('Add Product To Cart', () => {

    cy.contains('Products').click()

    cy.get('.product-overlay')
      .first()
      .invoke('show')

    cy.contains('Add to cart')
      .first()
      .click({ force: true })

    cy.contains('View Cart').click()

    cy.url().should('include', '/view_cart')

    cy.get('#cart_info_table')
      .should('be.visible')

    cy.get('.cart_price')
      .should('exist')

    cy.get('.cart_quantity')
      .should('exist')
    cy.screenshot()
  })

  // -----------------------------
  // Test Case 8
  // -----------------------------
  it('Remove Product From Cart', () => {

    cy.contains('Products').click()

    cy.get('.product-overlay')
      .first()
      .invoke('show')

    cy.contains('Add to cart')
      .first()
      .click({ force: true })

    cy.contains('View Cart').click()

    cy.get('.cart_quantity_delete')
      .first()
      .click()

    cy.contains('Cart is empty!')
      .should('be.visible')
    cy.screenshot()
  })

  // -----------------------------
  // Test Case 9
  // -----------------------------
  it('Submit Contact Us Form', () => {

    cy.contains('Contact us').click()

    cy.get('[data-qa="name"]')
      .type('John Doe')

    cy.get('[data-qa="email"]')
      .type('john@test.com')

    cy.get('[data-qa="subject"]')
      .type('Testing')

    cy.get('[data-qa="message"]')
      .type('This is a Cypress test.')

    cy.on('window:confirm', () => true)

    cy.get('[data-qa="submit-button"]').click()

    cy.contains('Success!')
      .should('be.visible')
    cy.screenshot()
  })

})
describe('E-commerce Automation Challenges', () => {
  beforeEach(() => {
   
    cy.visit('https://automationexercise.com'); 
  });
  

  //CHALLEANGE ONE

  it('Challenge 1: Add Multiple Products', () => {
    
    cy.contains('a', /Products|Shop/i).click();

   
    cy.contains('button', /Add to Cart/i).first().click();
    cy.contains('button', /Add to Cart/i).eq(1).click();

    
    cy.contains('a', /Cart|Basket/i).click();

    
    cy.get('body').should('contain', '2'); 
  });

  //CHALLENANGE TWO
  it('Challenge 2: Verify Product Quantity', () => {
    // Navigates to products page
    cy.contains('a', /Products|Shop/i).click();
    
    // Clicks on the first product card or product image link to open details
    cy.get('a').contains(/View|Detail|Product/i).first().click();

    // Finds the number box, clears the default '1', and types '3'
    cy.get('input[type="number"]').first().clear().type('3');

    // Adds the 3 items to the cart
    cy.contains('button', /Add to Cart/i).click();

    // Opens the cart
    cy.contains('a', /Cart|Basket/i).click();

    // Verifies that the quantity box inside the cart displays '3'
    cy.get('input[type="number"]').first().should('have.value', '3');
  });
});
