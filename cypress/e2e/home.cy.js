/// <reference types="cypress" />
beforeEach(() => {
    cy.visit('localhost:8080/esieaFront/')
    cy.viewport(1280, 720)
})

describe("Home page test", ()=>{
    it('success search cars', () => {
        cy.get("#saisieRecherche").type("Peugeot")
        cy.wait(1000)
        cy.get(".rechercher").click()

        cy.get('#listeVoitureTable')
            .find('tbody tr:last')
            .find('td')
            .first()
            .should('have.text', 'Peugeot')
        cy.wait(2000)
    })

    it('fail search cars', () => {
        cy.visit('/esieaFront/')
        cy.get('#saisieRecherche').should('be.visible').type("ddd{enter}");
        cy.wait(2000)
        cy.get("#listeVoitureTable tbody tr").should('not.exist');
    })

    it('add new car', () => {
        cy.wait(2000)
        cy.get('li a[onclick="afficherFormulaireCreation()"]').click()
        cy.get('#marque', {timeout: 2000}).type('Opel')
        cy.get('#modele', {timeout: 2000}).type('Ford Mustang Mach-E')
        cy.get('#finition', {timeout: 2000}).type('Essai')
        cy.get('#carburant', {timeout: 2000}).select(3)
        cy.get('#km', {timeout: 2000}).type('240')
        cy.get('#annee', {timeout: 2000}).type('2020')
        cy.get('#prix', {timeout: 2000}).type('48990')
        cy.wait(2000)
        cy.get('#nouvelleVoiture[onclick="ajouterVoiture()"]').click();
        cy.wait(500)
        cy.get('#snackbar_ajout').should('be.visible');
    })

    it('delete car', () => {
        cy.get('#saisieRecherche').should('be.visible').type("opel{enter}");
        cy.wait(2000)
        cy.get("#listeVoitureTable").within(()=> {
            cy.get('td').contains('Détails').click()
        });
        cy.wait(2000)
        cy.get('#fiche').should('be.visible');
        cy.get(".infovoiture").should('not.be.empty')
        cy.wait(2000)
        cy.get("#divSupprimer button").click()
        cy.wait(200)
        cy.get("#snackbar_suppression").should("be.visible")
    })
})