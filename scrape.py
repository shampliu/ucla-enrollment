from bs4 import BeautifulSoup

import requests
import json

# url = raw_input("Enter a website to extract the URL's from: ")

r  = requests.get("http://www.aim.ucla.edu/tables/enrollment_history.aspx")

data = r.text

soup = BeautifulSoup(data)

# rows = soup.findAll("tr")

# cols = rows.findAll('td')

# print (cols); 

arr = []

for row in soup.findAll('tr'):
	cols = row.findAll('td')
	cols = [ele.text.strip() for ele in cols]
	arr.append(cols) # Get rid of empty values
	# print cells
	# for col in row:
	# 	print col.string

print arr



# for link in soup.find_all('a'):
#     print(link.get('href'))

# soup = BeautifulSoup(urllib2.urlopen('http://www.aim.ucla.edu/tables/enrollment_history.aspx').read())

# print(soup.prettify())

# table_data = [[cell.text for cell in row("td")]
#                          for row in soup("tr")]

# print table_data




print json.dumps(dict(arr))