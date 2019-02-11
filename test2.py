import sys
import datetime
from time import sleep

target_time = datetime.datetime(datetime.datetime.now().year, datetime.datetime.now().month, datetime.datetime.now().day, 3, 30 - 1, 59, 900000)
while (target_time - datetime.datetime.now()).total_seconds() > 0 :
    print('remaining : ' + str(target_time - datetime.datetime.now()), end='\r')
    sleep(0.1)
