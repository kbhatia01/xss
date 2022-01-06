from django.conf.urls import url
from .models import UrlMetaData
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, response
from . import scraping
from detector.model.cnn_model import predictor
import json
import uuid
import os
import csv
from rest_framework.views import APIView
from rest_framework.response import Response
import re

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the detect index.")

def sitecheck(request):
    # try:
    url = request.GET.get('url', None)
    scraping_results = scraping.scraper(url)
    string_list = []
    for vector in scraping_results:
        dic = {
            'code': vector
        }   
        string_list.append(dic)

    filename = str(uuid.uuid1())+'.csv'
    try:
        with open(filename, 'w') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=['code'])
            writer.writeheader()
            for data in string_list:
                try:
                    writer.writerow(data)
                except Exception:
                    pass
    except IOError:
        return JsonResponse({'error': True, 'status':True})
    

    print("running")
    preds = predictor(filename) # calling predictor function and getting predictions
    print("completed")
    res = {
        'status': True,
        'error': False
    }
    
    urlParams = re.findall('<script>.+?</script>', url)

    count_mal = 0
    for i in range(len(preds)):
        if preds[i][0] == 1:
            res['status'] = False
            res[count_mal] = string_list[i]['code']
            count_mal = count_mal + 1
    
    if urlParams.count != 0:
        for s in urlParams:
            if len(s) != 0:
                res['status'] = False
                res[count_mal] = s
                count_mal += 1

    res['lines'] = count_mal
                
    
    # rjson = json.dumps(res)
    os.remove(filename)
# except Exception as e:
    # print(e)
    # res = {
    #     'status': True,
    #     'error': True
    # }
    return JsonResponse(res)



class MetaData(APIView):

    def post(self, request, *args, **kwargs):
        data = request.data
        list_data = []
        print(data)
        if data and data['data'] and type(data['data']) == list:
            for item in data['data']:
                list_data.append(UrlMetaData(url=item['url'],other_details = item['details']))

            UrlMetaData.objects.bulk_create(list_data)
            return Response({'status': 'success'})
        return Response({'status': 'bad request'}, status=500)

