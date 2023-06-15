describe('Pizza challenge', function() {
    beforeEach(()=> {
        cy.visit('http://localhost:3001/pizza');
    })
    it("pizza form testleri", function() {
      cy.get('[data-cy=input-isim]').type('emre');
      cy.get('[data-cy=input-email]').clear();
      cy.get('[data-cy=input-phone]').type('emre@example.com');
      cy.get('[data-cy=input-address]').type('example address');
      cy.get('[data-cy=input-hamur]').select(1).invoke('val').should("eq","New York Style (İnce)")
      cy.get('[data-cy=input-submit]').click({force: true})
    });
  });

//   .should('be.checked')