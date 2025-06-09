import requests
import json
import sys

print("Request version= "+requests.__version__)
print("Python version= "+ sys.version)
# URL de la API y token de autenticación
url = 'http://sagapi.net.emi.edu.bo/getEspecialidades?idUnidadAcademica=1'
token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjI4MTZiNzY4ZWJkMDA1ZDQ4NGU0YjI2MzM5NjZjMmYxOGM5MWY2ZGRmNGY1OTAwNjE3ZWViYzUxMThiNGM5ZTJhNTcyNjgwYWFhMmE4MzIiLCJpYXQiOjE2ODkyMDMwMTAuNzg5NzQ2LCJuYmYiOjE2ODkyMDMwMTAuNzg5NzQ5LCJleHAiOjE2ODkyMDQ4MTAuNzUxMzMxLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.BMEqOs1zhrEKWlR-25_i_TNEQg2dGmEggkkmI1QDBlj8tWrEJroVh54x4kguuF8E_fW_cjS1Rm9Z1uGfaywmyOWNAyFVYdx0-UA0jDhfj5YQ-yItmtGh1DkU3cgXpD7UYNbZOTQDrczhL6NDHvi2ao5UnyDWnHv_M7v1BK6Ek4BbMz4xwBQBVKgEWv1MKt6Ycai0qtitVBDGgJ0DDUok-hX01_sCL7Dy4Hdzy6TqX8ehQnznPxBdSHQxfouxBOx1N_t5soHjhzmHt55fEAx-pI5YAB-2ZFBpcsTbrLE2WhxbptQ6oijUvxz-QtyjrnPvDFFGnaAG6pbPMnjkx8ftT2OH0RhPud3VPoYOBtVPjnrATB-veFxZI-B1hdg_szbsvdNfkeu8Fg1P10LEQP5MR8BxKQ4z4O0JBobJS1ve79zWGsTpXKloJas7oI8sCIP-aKH0UDXnClKudn-ABfhL9RfUov4PpN25Qph5GQDdU1gQtU09hngdZVBB1DjRQ1ZGtS43p7bod-yodhmkkSp--1hNeH3dF9Hm7Jm3r8yk_xPynSdaQQbckwgOH0T8zeX-uork9tyvJ7Cylb3z5vO_YPedXkqFHGgLiwFo384lx3EXFyxPhgIkQPKnGHtOmz7XfGbcfPzZI8UTfkaWsXUcB3tqSjyKp5meMp7rT-ZriS4'
# Hacer la solicitud GET a la API
headers = {'Authorization': f'Bearer {token}'}
response = requests.get(url, headers=headers)

# Verificar la respuesta
if response.status_code == 200:
    data = response.json()
    print("Datos recibidos:", data)

    # Guardar los datos en un archivo JSON
    with open("pens.json", "w") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

    print("Los datos han sido guardados en '28-08.json'")
else:
    print("Error al hacer la solicitud:", response.status_code, response.text)