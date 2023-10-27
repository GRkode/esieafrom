/// <reference types="cypress" />
beforeEach(() => {
    cy.visit('localhost:8080/esieaFront/')
    cy.viewport(1280, 720)
})

describe("Home page test", ()=>{
    it('form search cars', () => {
        cy.get("#saisieRecherche").type("Peugeot")
        cy.wait(1000)
        cy.get(".rechercher").click()

        cy.get('#listeVoitureTable')
            .find('tbody tr:last')
            .find('td')
            .first()
            .should('have.text', 'Peugeot')
    })

    it('add new car', () => {
        cy.get('a:contains(Ajouter une voiture)').should('be.visible').click()
        cy.get('#marque').type('Opel')
        cy.get('#modele').type('Ford Mustang Mach-E')
        cy.get('#finition').type('Essai')
        cy.get('#carburant').select(3)
        cy.get('#km').type('240')
        cy.get('#annee').type('2020')
        cy.get('#prix').type('48990')
        cy.get('#nouvelleVoiture').click();
        cy.get('#snackbar_ajout', {timeout: 1000}).should('be.visible');
    })

    it('delete car', () => {
        cy.get('#saisieRecherche').should('be.visible').type("opel{enter}");
        cy.wait(2000)
        cy.get("#listeVoitureTable").within(()=> {
            cy.get('td').contains('Détails').click()
        });
        cy.get('#fiche').should('be.visible');
        cy.get(".infovoiture").should('not.be.empty')
        cy.get("#divSupprimer button").click()
        cy.get("#snackbar_suppression", {timeout: 1000}).should("be.visible")
    })
})