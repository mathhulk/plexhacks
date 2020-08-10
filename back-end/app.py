from fastapi import FastAPI
from pydantic import BaseModel
import requests
import json

app = FastAPI()

headers = {'X-API-Key': 'xigJcsUsL9J2c7x9daKRMW7qXyJR6gZ1Ee25TZQY'}

class PoliticianID(BaseModel):
    ID: str

@app.post("/senate/")
async def get_senate_list():
    senate = requests.get('https://api.propublica.org/congress/v1/116/senate/members.json?in_office=true', headers=headers)
    return senate.json()

@app.post("/house/")
async def get_senate_list():
    house = requests.get('https://api.propublica.org/congress/v1/116/house/members.json?in_office=true', headers=headers)
    return house.json()

@app.post("/bill/")
async def get_bill():
    bill = requests.get('https://api.propublica.org/congress/v1/bills/search.json')
    return bill.json()

@app.post("/memberRequest/")
async def get_memember(item: PoliticianID):
    member = requests.get('https://api.propublica.org/congress/v1/member/%s.json', item, headers=headers)    
    return member.json()

@app.post("/votesRequest/")
async def votesRequest(item: PoliticianID):
    votes = requests.get('https://api.propublica.org/congress/v1/members/%s/votes.json', item, headers=headers)
    return votes.json

if __name__ == "__main__":
    uvicorn.run(app, host = "127.0.0.1", port = 8000)


