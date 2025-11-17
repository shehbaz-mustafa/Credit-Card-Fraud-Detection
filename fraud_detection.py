import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
from sklearn.neighbors import LocalOutlierFactor
from sklearn.metrics import classification_report, confusion_matrix

# -----------------------------------------
# Load dataset
# -----------------------------------------
df = pd.read_csv("creditcard.csv")

print("Dataset Shape:", df.shape)
df.head()

# -----------------------------------------
# Standardize Amount and Time
# -----------------------------------------
scaler = StandardScaler()
df['scaled_amount'] = scaler.fit_transform(df['Amount'].values.reshape(-1,1))
df['scaled_time']   = scaler.fit_transform(df['Time'].values.reshape(-1,1))

df.drop(['Amount','Time'], axis=1, inplace=True)

# -----------------------------------------
# Features and Labels
# -----------------------------------------
X = df.drop('Class', axis=1)
y = df['Class']

# Count fraud and normal cases
fraud = df[df.Class == 1]
valid = df[df.Class == 0]
print("Fraud Cases:", len(fraud))
print("Valid Cases:", len(valid))

# -----------------------------------------
# 1. Isolation Forest
# -----------------------------------------
iso_forest = IsolationForest(contamination=max(0.01, len(fraud)/len(df)), random_state=42)
iso_pred = iso_forest.fit_predict(X)

# Convert -1 = fraud, 1 = normal → 1 = fraud, 0 = normal
iso_pred = [1 if x == -1 else 0 for x in iso_pred]

print("\n---------------- Isolation Forest Results ----------------")
print(confusion_matrix(y, iso_pred))
print(classification_report(y, iso_pred))

# -----------------------------------------
# 2. Local Outlier Factor
# -----------------------------------------
lof = LocalOutlierFactor(n_neighbors=20, contamination=max(0.01, len(fraud)/len(df)))
lof_pred = lof.fit_predict(X)

lof_pred = [1 if x == -1 else 0 for x in lof_pred]

print("\n---------------- Local Outlier Factor Results ----------------")
print(confusion_matrix(y, lof_pred))
print(classification_report(y, lof_pred))