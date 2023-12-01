/// <reference types="cypress" />
beforeEach(() => {
    cy.visit('localhost:8080/esieaFront/')
    cy.viewport(1280, 720)
})

describe('Tests de l\'application de gestion d\'entrepôt de voitures', () => {
    it('Test d\'Affichage de la Liste des Voitures', () => {
        cy.get('#listeVoitureTable').should('be.visible');
    });

    it('Test de Navigation vers la Page d\'Ajout de Voiture', () => {
        cy.wait(200)
        cy.get('li a[onclick="afficherFormulaireCreation()"]').click()
            cy.get('#nouvelle').should('be.visible');
    });

    it('Test d\'Ajout de Voiture', () => {
        cy.wait(1000)
        cy.get('li a[onclick="afficherFormulaireCreation()"]').click()
        cy.wait(2000)
        cy.get('#marque').type('Opel');
        cy.get('#modele').type('Ford Mustang Mach-E');
        cy.get('#finition').type('Essai');
        cy.get('#carburant').select(3);
        cy.get('#km').type('240');
        cy.get('#annee').type('2020');
        cy.get('#prix').type('48990');
        cy.get('#nouvelleVoiture').click();
        cy.get('#listeVoitureTable tbody tr td:first-child')
            .should('contain', 'Opel');
    });

    it('Test de Suppression de Voiture', () => {
        cy.wait(1000)
        cy.get('#listeVoitureTable tbody tr:first-child').as('voiture');
        cy.get('@voiture').within(()=> {
            cy.get('td').contains('Détails').click()
        });
        cy.wait(500)
        cy.get('#fiche').should('be.visible');
        cy.get(".infovoiture").should('not.be.empty')
        cy.get("#divSupprimer button").click()
        cy.get('#snackbar_suppression').should('be.visible');
    });

    it('Test de Recherche de Voiture', () => {
        cy.get('#saisieRecherche').type('Opel');
        cy.get(".rechercher").click()
        cy.get('#listeVoitureTable tbody tr').should('have.length.gte', 1);
    });

    it('Test d\'affichage des Détails d\'une Voiture', () => {
        cy.get('#listeVoitureTable tbody tr:first-child').as('voiture');
        cy.get('@voiture').find('td:last-child a').click();
        cy.get('#infos').should('be.visible');
    });

    it('Test d\'Affichage de la Snackbar après l\'Ajout', () => {
        cy.wait(1000)
        cy.get('li a[onclick="afficherFormulaireCreation()"]').click()
        cy.get('#marque').type('Citroen');
        cy.get('#modele').type('DS3');
        cy.get('#finition').type('Full MAT');
        cy.get('#carburant').select(2);
        cy.get('#km').type('2000');
        cy.get('#annee').type('2015');
        cy.get('#prix').type('8990');
        cy.get('#nouvelleVoiture').click();
        cy.get('#snackbar_ajout').should('be.visible');
    });
});
