## 1. Introduction

A Brain–computer interface (BCI) is a means of communication between a human and a computer, based on brain activity. It can be invasive or non-invasive and is specific in that it is independent of the activation of the human's peripheral nerves and muscles. NeuroSky MindWave is one such device that uses electroencephalography (EEG) to measure brain activity. It is a sensor with a single non-invasive dry electrode that is placed at the position
<a href="https://info.tmsi.com/blog/the-10-20-system-for-eeg">FP1</a> (above the left eyebrow). With this sensor, we can retrieve data filtered using high and low-pass filters (1 to 50 Hz), where frequencies are amplified by an amplifier and separated by <a href="https://docs.google.com/presentation/d/1kflVsVrZ5qekad7Y3t1a4fnQam75JHvJ/edit?usp=share_link&ouid=115435477683811347134&rtpof=true&sd=true">fast Fourier transform </a> <a href="https://drive.google.com/file/d/1lmavMPYYjmbSUIv7yupD-VjXudvi-P0R/view?usp=share_link" >(FFT)</a>. NeuroSky MindWave samples at 512Hz (the number of samples per second must be at least 2.5 times the highest frequency). In addition to reading brainwave strength, NeuroSky has developed the eSenseTM algorithm, which measures attention and meditation levels, displayed as values from 0 to 100.

This device can be used for various applications, including predicting the desired direction of movement of an object. Such an application can be useful in various fields, such as video games, device control, and medicine.

In this project, we will attempt to create a BCI to control the direction of movement of an object (up, down, left, and right).

## 2. Project Description

As part of this project, an application has been developed to collect data, create simple machine learning models, and ultimately control the direction of movement of a ball. The application itself is built in React, a JavaScript-based framework. To enable communication between NeuroSky Mindwave and the frontend, a backend was created using the Node.js Express framework, and communication is done using Sockets. Socket was used because data from MindWave is sent every second and this data needs to be retrieved in real-time for display, prediction, etc. Another backend was created in Python <a href="https://flask.palletsprojects.com/en/2.2.x/">Flask</a> (a mini web framework). The Python backend is used for machine learning models (training, prediction).

First, data collection comes into play. To begin with, it is necessary to determine what data we are collecting, whether it is endogenous or exogenous interface. In this case, we have an endogenous interface because we do not react to stimuli; rather, we want to determine the direction of movement from some internal processes (thoughts). Here, we must also be careful about the specificity of the EEG signal, i.e., each person's brain works differently and emits different brain signals, so if predictions are good for one person, it does not necessarily mean they will be good for another person. To build a more general system, it is necessary to collect signals from a much larger number of people. In this specific case, the data was collected only from one person. We already know that with the NeuroSky MindWave, we can retrieve values for different brain waves, so we will put each value in a separate column. NeuroSky Mindwave does most of the data processing, but we still need to refine the data a bit. Of course, not all the values we can retrieve will be needed for training the model, so we will select columns, and it will be necessary to scale the data because the data can take on large values (in tens of thousands), which can significantly affect the accuracy of the model.

After collecting the data, we can move on to training the models. The chosen algorithms are k-nearest neighbors, support vector machine, and convolutional neural network. These three algorithms are chosen because they are very popular in classification in brain-computer interfaces. The k-nearest neighbors algorithm is one of the simplest supervised learning algorithms that can give good results even on small data sets and has few parameters to adjust for good performance. As it can give good results in binary classification, it can also give good results in multiclass classification. Next comes the support vector machine, which is also a supervised learning algorithm. This is an algorithm that often gives the best results in classification in brain-computer interfaces. Although it is intended for binary classification, it can be used for multiclass classification. The results that SVM gives depend a lot on the parameters that are used, so attention should be paid to that. Also, SVM performs well on smaller data sets, so there is an advantage to using it in this case. Lastly, we have the convolutional neural network. CNN is an artificial neural network that has various applications, most commonly used in image classification. In addition, it is very popular in time series classification. Often, time series data are from different sensors (accelerometer, gyroscope, EKG, EEG). The advantage of CNN over others is that it can automatically extract features. The disadvantage of CNN is that it requires a lot of data for good accuracy, requires adjustment of many parameters that can significantly affect accuracy, and there can be applied different architectures (different number of layers, types of layers) which can also significantly affect accuracy. For these reasons, we will try to make a simple CNN, but it does not necessarily mean it will give good results.

Finally, we will look at the accuracy obtained from different models and compare them. After we train the model, we can move on to the fun part, which is prediction, i.e., the game.

## Application

### Home page

![home_page](https://github.com/jradak01/EEG_directions_game/blob/main/images/homepage.png)

### Data collection

![data_collection](https://github.com/jradak01/EEG_directions_game/blob/main/images/datacollection.png)

### Model

![model](https://github.com/jradak01/EEG_directions_game/blob/main/images/create_a_model.png)

### Game lobby

![game_lobby_1](https://github.com/jradak01/EEG_directions_game/blob/main/images/lobby.png)

![game_lobby_2](https://github.com/jradak01/EEG_directions_game/blob/main/images/lobby2.png)

### Game

![game1](https://github.com/jradak01/EEG_directions_game/blob/main/images/game.png)

![game2](https://github.com/jradak01/EEG_directions_game/blob/main/images/game2.PNG)
