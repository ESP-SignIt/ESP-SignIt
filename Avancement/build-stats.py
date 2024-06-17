import pandas as pd
import matplotlib.pyplot as plt

# Charger les données depuis le fichier CSV
data = pd.read_csv('task-tracking.csv')

# Convertir la colonne "Date de résolution" en type datetime
data['Date de résolution'] = pd.to_datetime(data['Date de résolution'])

# Trier les données par date de résolution
data = data.sort_values(by='Date de résolution')

# Calculer les cumuls des temps estimés et réels
data['Cumul estimé'] = data['Temps estimé (en journée)'].cumsum()
data['Cumul réel'] = data['Temps réel (en journée)'].cumsum()

# Ajouter le point initial (0, 0) pour les cumuls avec la date du 1er janvier 2024
initial_data = pd.DataFrame({
    'Date de résolution': [pd.Timestamp('2024-01-01')],
    'Cumul estimé': [0],
    'Cumul réel': [0]
})

data = pd.concat([initial_data, data], ignore_index=True)

# Calculer la courbe de 10% de retard par rapport au temps estimé
data['Limite 10% retard'] = data['Cumul estimé'] + (data['Cumul estimé'] * 0.1)

# Tracer la courbe d'avancement avec la zone supérieure coloriée en rouge
plt.figure(figsize=(10, 6))
plt.plot(data['Date de résolution'], data['Cumul estimé'], label='Temps estimé', marker='o')
plt.plot(data['Date de résolution'], data['Cumul réel'], label='Temps réel', marker='o')

# Tracer la courbe de 10% de retard
plt.plot(data['Date de résolution'], data['Limite 10% retard'], 'r--', label='Limite de 10% de retard')

# Remplir la zone supérieure à la courbe rouge avec une couleur rouge transparente
plt.fill_between(data['Date de résolution'], data['Limite 10% retard'], data['Cumul réel'], where=(data['Cumul réel'] > data['Limite 10% retard']), color='red', alpha=0.3)

plt.xlabel('Date de résolution')
plt.ylabel('Journées cumulées')
plt.title('Courbe d\'avancement avec limite de 10% de retard')
plt.legend()
plt.grid(True)
plt.show()
