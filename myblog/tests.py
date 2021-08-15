import json
from api.models import *
from accounts.models import User


with open('x.json') as f:
    file = json.load(f)

def execute():
    
    for travel in file:
        mycontent = ''
        
        content = travel['details']
        for key in content:
            mycontent += '{0} \n \n {1}'.format(key, content[key])

        travelpost = TravelPost.objects.create(heading = travel['name'], content = mycontent)
    print(travelpost)
