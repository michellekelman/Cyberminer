import pymongo
from pymongo import MongoClient, InsertOne
import json

client = pymongo.MongoClient("mongodb+srv://mrk190001:Cyberminer@cluster0.ttmuueu.mongodb.net/")
db = client.Cluster0
collection = db.documents
requesting = []

with open("./json/documents.json", "r", encoding="utf8") as f:
    arr = json.load(f)
    print(len(arr))
    i=1
    for jsonObj in arr:
        if i%100==0:
            print(i)
        i+=1
        requesting.append(InsertOne(jsonObj))

result = collection.bulk_write(requesting)
client.close()