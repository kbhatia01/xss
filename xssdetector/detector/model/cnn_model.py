''' File responsible for loading and using the model '''

"""# Imports"""

from copy import Error
import numpy as np 
import pandas as pd
import itertools
import re  
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Activation, Conv2D, MaxPooling2D,Flatten,Dropout,MaxPool2D, BatchNormalization
from keras.layers.convolutional import Conv1D
from keras.layers.convolutional import MaxPooling1D
# from keras.utils import to_categorical
from tensorflow.keras.utils import Sequence
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
# from keras.utils.np_utils import to_categorical 
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPool2D
# from keras.optimizers import RMSprop,Adam
from keras.preprocessing import sequence
from keras.callbacks import ReduceLROnPlateau
from urllib.parse import unquote
import math
import os
import pandas as pd
import glob
import time
import cv2


def convert_to_ascii(sentence):
    sentence_ascii=[]

    for i in sentence:
        
        
        """Some characters have very large values,
        thus removing letters having values greater than 8222 and for characters whose values lie between 
        128 and 8222 assigning them values so they can be normalized more easily."""
       
        if(ord(i)<8222):      # ” has ASCII of 8221
            
            if(ord(i)==8217): # ’  :  8217
                sentence_ascii.append(134)
            
            
            if(ord(i)==8221): # ”  :  8221
                sentence_ascii.append(129)
                
            if(ord(i)==8220): # “  :  8220
                sentence_ascii.append(130)

            if(ord(i)==8216): # ‘  :  8216
                sentence_ascii.append(131)
                
            if(ord(i)==8217): # ’  :  8217
                sentence_ascii.append(132)
            
            if(ord(i)==8211): # –  :  8211
                sentence_ascii.append(133)
                
            #If values less than 128 store them else discard them
          
            if (ord(i)<=128):
                sentence_ascii.append(ord(i))
    
            else:
                pass
    """       
    All data (except 1 string - the extra characters in this are truncated eventually)
    are less than 10000 characters, thus the zer array is initialised to the 10000 zeroes. 
    
    The minimum of length of zer and sentence_ascii is taken to fill the values of zer. 
    """
    zer=np.zeros((10000))
    
    for i in range(min(len(sentence_ascii), len(zer))):
        zer[i]=sentence_ascii[i]

    return zer.reshape(100, 100)

# Sending each sentence to be converted to ASCII and the output is an image :
def make_image(sentences):
  arr=np.zeros((len(sentences),100,100))
  for i in range(len(sentences)):
      image=convert_to_ascii(sentences[i])
      x=np.asarray(image,dtype='float')
      image =  cv2.resize(x, dsize=(100,100), interpolation=cv2.INTER_CUBIC)
      image/=128
      arr[i]=image
  #Reshaping data for input to the CNN
  return arr.reshape((arr.shape[0], 100, 100, 1))


"""Using a data generator: Generating our dataset on multiple 
cores in real time and then feeding it to our deep learning
model to deal with the memory-consuming data in a better way. 
"""

class DatasetObject(Sequence):

  def __init__(self, x, y, batch_size=64):
    self.x, self.y = x, y
    self.batch_size = batch_size

  #Returns the number of batches in the Sequence
  def __len__(self):
    return math.ceil(len(self.x) / self.batch_size)

  #Returning the image corresponding to the idx and the labels from the training set
  #Gets a complete batch at position idx
  def __getitem__(self, idx):                 
    batch_x = self.x[idx * self.batch_size:(idx + 1) * self.batch_size]
    batch_y = self.y[idx * self.batch_size:(idx + 1) * self.batch_size]
    return make_image(batch_x), batch_y


"""# Model"""

"""
This model is already trained and stored at dsci_cnn_trained 
directory in the root folder.
"""
# Total number of layers = 11
# Number of Convolutional layer: 3

# model=tf.keras.models.Sequential([
    
#     tf.keras.layers.Conv2D(64,(3,3), activation=tf.nn.relu, input_shape=(100,100,1)),
#     tf.keras.layers.MaxPooling2D(2,2),
    
#     tf.keras.layers.Conv2D(128,(3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
    
#     tf.keras.layers.Conv2D(256,(3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
    
#     tf.keras.layers.Flatten(),
#     tf.keras.layers.Dense(256, activation='relu'),
#     tf.keras.layers.Dense(128, activation='relu'),
#     tf.keras.layers.Dense(64, activation='relu'),
#     tf.keras.layers.Dense(1, activation='sigmoid')
# ])

# model=tf.keras.models.Sequential([
    
#     tf.keras.layers.Conv2D(64,(3,3), activation=tf.nn.relu, input_shape=(100,100,1)),
#     tf.keras.layers.MaxPooling2D(2,2),
    
#     tf.keras.layers.Conv2D(128,(3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
    
#     tf.keras.layers.Conv2D(256,(3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
    
#     tf.keras.layers.Flatten(),
#     tf.keras.layers.Dense(256, activation='relu'),
#     tf.keras.layers.Dense(128, activation='relu'),
#     tf.keras.layers.Dense(64, activation='relu'),
#     tf.keras.layers.Dense(1, activation='sigmoid')
# ])


"""
Helper function to decode html encoded elements
"""
def decode(url):
    url = unquote(url)
    return url


"""
The actual predictor function. Calls all helper
functions for preprocessing and returns the 
predictions after loading and running throught the model
"""
def predictor(filename):
    li = []
    frame = pd.read_csv(filename, index_col=None, header=0, skipinitialspace=True)
    li.append(frame)
    df = pd.concat(li, axis=0, ignore_index=True)
    sentences = df['code'].values
    y = np.zeros(len(sentences))
    test_ds = DatasetObject(sentences, y)

    print("loading")

    model = tf.keras.models.load_model('./dsci_cnn_trained')

    preds = model.predict(test_ds)
    preds = tf.concat(preds, axis=0).numpy()
    for i in range(len(preds)):
        if preds[i]>0.5:
            preds[i]=1
        elif preds[i]<=0.5:
            preds[i]=0

    return preds.tolist()
    
    
    
    
