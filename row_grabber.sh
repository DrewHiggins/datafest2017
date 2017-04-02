#!/bin/bash

head -n 1 data.txt > data_sample.txt
cat data.txt | gshuf |  head -n 750000 >> data_sample.txt 
