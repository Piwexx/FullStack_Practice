describe('template spec', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io')
  })
  it('passes', () => {
    cy.get("h1").contains("Kitchen Sink")
  })
})