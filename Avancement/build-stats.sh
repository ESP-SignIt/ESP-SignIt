#!/bin/bash

# Installer les bibliothèques nécessaires
pip install pandas matplotlib

# Vérifier si la commande python existe, sinon utiliser python3
if command -v python &> /dev/null
then
    PYTHON_CMD=python
elif command -v python3 &> /dev/null
then
    PYTHON_CMD=python3
else
    echo "Python n'est pas installé. Veuillez installer Python."
    exit 1
fi

# Exécuter le script Python
$PYTHON_CMD build-stats.py
