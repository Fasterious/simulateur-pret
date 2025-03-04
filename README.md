# Simulateur de Prêt Immobilier

Un calculateur de prêt immobilier interactif

Simulateur de prêt immobilier interactif permettant de calculer les mensualités et le coût total d'un crédit immobilier. Cet outil offre une interface intuitive avec des sliders dynamiques, un tableau d'amortissement détaillé et une visualisation claire de la répartition des paiements (capital, intérêts, assurance).

![Aperçu du simulateur](https://api.microlink.io/?url=https://fasterious.github.io/simulateur-pret/&screenshot=true&meta=false&embed=screenshot.url)

## Fonctionnalités

- Calcul des mensualités de prêt en fonction du montant emprunté, du taux d'intérêt, de la durée et du taux d'assurance
- Interface interactive avec sliders pour faciliter l'ajustement des paramètres
- Tableau d'amortissement détaillé par année
- Calcul du coût total du crédit, incluant les intérêts et l'assurance
- Mise à jour en temps réel des résultats lors de la modification des paramètres
- Interface responsive adaptée à tous les appareils

## Comment utiliser

1. Ouvrez le fichier `index.html` dans votre navigateur web
2. Ajustez les paramètres du prêt en utilisant les champs de saisie ou les sliders
3. Les résultats se mettent à jour automatiquement
4. Cliquez sur "Afficher le tableau" pour voir le tableau d'amortissement par année

## Formule de calcul

La mensualité de prêt est calculée selon la formule standard d'amortissement :

```
M = P × [r × (1 + r)^n] / [(1 + r)^n - 1]
```

Où :
- M = Mensualité
- P = Principal (montant emprunté)
- r = Taux d'intérêt mensuel (taux annuel / 12)
- n = Nombre total de mensualités (années × 12)

L'assurance est calculée séparément comme un pourcentage du capital emprunté et ajoutée à la mensualité.

## Technologie

Ce simulateur est construit uniquement avec HTML, CSS et JavaScript vanilla. Aucune dépendance externe n'est requise.

## Démo en ligne

Une démo en ligne est disponible [ici](https://fasterious.github.io/simulateur-pret/).

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails. 