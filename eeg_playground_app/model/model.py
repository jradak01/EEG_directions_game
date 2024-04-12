import pandas as pd
import numpy as np
#model saving
from joblib import dump, load
# ml
from sklearn.preprocessing import MinMaxScaler, RobustScaler
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn import svm
#ml metrics
from sklearn.metrics import accuracy_score, confusion_matrix
from tslearn.metrics import dtw
def preprocess(csv, scaler):
    df = pd.read_csv(csv, usecols=['Attention', 'Meditation', 'Delta', 'Theta', 'LowAlpha', 'HighAlpha',
       'LowBeta', 'HighBeta', 'LowGamma', 'HighGamma', 'Direction'])
    df.loc[df.Direction == 'Up', 'Direction'] = 0
    df.loc[df.Direction == 'Down', 'Direction'] = 1
    df.loc[df.Direction == 'Right', 'Direction'] = 2
    df.loc[df.Direction == 'Left', 'Direction'] = 3
    df.Direction = df.Direction.astype('int')
    df.drop_duplicates(inplace=True)
    for col in df.columns:
        df.loc[df[col].isna(), col] = df[col].mean()
    X_train, X_test, y_train, y_test = train_test_split(df[['Theta', 'LowAlpha', 'HighAlpha',
       'LowBeta', 'HighBeta', 'LowGamma', 'HighGamma']], df['Direction'], test_size=0.2, random_state=42)
    X_train_scaled=X_train
    X_test_scaled=X_test
    if scaler=='Robust':
        scaler_r = RobustScaler()
        X_train_scaled = scaler_r.fit_transform(X_train)
        X_test_scaled = scaler_r.transform(X_test)
    elif scaler=='MinMax':
        scaler_mm = MinMaxScaler()
        X_train_scaled = scaler_mm.fit_transform(X_train)
        X_test_scaled = scaler_mm.transform(X_test)
    return X_train_scaled, X_test_scaled, y_train, y_test

def find_best_k(X_train, X_test, y_train, y_test):
    error1 = []
    error2 = []
    ranged = np.arange(1, 21, 1)
    for k in range(1,20):
        knn = KNeighborsClassifier(n_neighbors=k)
        knn.fit(X_train, y_train)
        y_pred1= knn.predict(X_train)
        error1.append(np.mean(y_train != y_pred1))
        y_pred2= knn.predict(X_test)
        error2.append(np.mean(y_test != y_pred2))    
    return error1, error2, ranged

def knn_model(k, X_train, X_test, y_train, y_test, metric):
    if metric == 'dtw':
        knn = KNeighborsClassifier(n_neighbors=k, metric=dtw)
    else:
        knn = KNeighborsClassifier(n_neighbors=k, metric=metric)
    knn.fit(X_train, y_train)
    y_pred = knn.predict(X_test)
    acc_score = accuracy_score(y_pred, y_test)
    confusionMTRX = confusion_matrix(y_test, y_pred)
    # dump(knn, name+'.joblib')
    return acc_score, confusionMTRX, knn

def svm_model(X_train, X_test, y_train, y_test, kernel, C, degree=0, gamma=0):
    if (kernel == 'poly'):
        svml = svm.SVC(decision_function_shape='ovo', kernel=kernel, C=C, degree=degree, gamma=gamma)
    elif kernel == 'rbf':
         svml = svm.SVC(decision_function_shape='ovo', kernel=kernel, C=C, gamma=gamma)
    else:
        svml = svm.SVC(decision_function_shape='ovo', kernel=kernel, C=C)
    svml.fit(X_train, y_train)
    y_pred = svml.predict(X_test)
    acc_score = accuracy_score(y_pred, y_test)
    confusionMTRX = confusion_matrix(y_test, y_pred)
    # dump(svml, name+'.joblib')
    return acc_score, confusionMTRX, svml

def predict(model, x):
    return model.predict(x)

def get_model(name):
    return load("models/"+name)

def save_model_by_name(name, model):
    full_name="models/"+name+".joblib"
    dump(model, full_name)