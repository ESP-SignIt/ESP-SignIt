describe('Composant Traduction', () => {
  beforeEach(() => {
    cy.mount(<Traduction />);
  });

  it('affiche la webcam, le bouton, et la checkbox', () => {
    cy.get('video').should('exist');
    cy.get('button').contains(/start/i);
    cy.get('input[type="checkbox"]').should('exist');
    cy.contains('Afficher la matrice').should('exist');
  });

  it('alterne le bouton Start/Stop', () => {
    cy.get('button').contains(/start/i).click();
    cy.get('button').contains(/stop/i).should('exist');
    cy.get('button').click();
    cy.get('button').contains(/start/i).should('exist');
  });

  it('peut cocher/décocher la matrice', () => {
    cy.get('input[type="checkbox"]').check({ force: true }).should('be.checked');
    cy.get('input[type="checkbox"]').uncheck({ force: true }).should('not.be.checked');
  });

  it('vérifie que gestureOutput s’affiche', () => {
    cy.get('.gesture_output').should('exist');
  });

  it('n’affiche pas ProgressBar si aucun geste détecté', () => {
    cy.get('.signlang_data').within(() => {
      cy.get('.progress-bar').should('not.exist');
    });
  });
});
