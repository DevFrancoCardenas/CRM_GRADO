import requests
import json
import sys

print(requests.__version__)
print(sys.version)

# === CONFIGURACIÓN DE LA API ===
url = "http://sagapi.net.emi.edu.bo/getEspecialidades?idUnidadAcademica=1"
token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiZjI4MTZiNzY4ZWJkMDA1ZDQ4NGU0YjI2MzM5NjZjMmYxOGM5MWY2ZGRmNGY1OTAwNjE3ZWViYzUxMThiNGM5ZTJhNTcyNjgwYWFhMmE4MzIiLCJpYXQiOjE2ODkyMDMwMTAuNzg5NzQ2LCJuYmYiOjE2ODkyMDMwMTAuNzg5NzQ5LCJleHAiOjE2ODkyMDQ4MTAuNzUxMzMxLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.BMEqOs1zhrEKWlR-25_i_TNEQg2dGmEggkkmI1QDBlj8tWrEJroVh54x4kguuF8E_fW_cjS1Rm9Z1uGfaywmyOWNAyFVYdx0-UA0jDhfj5YQ-yItmtGh1DkU3cgXpD7UYNbZOTQDrczhL6NDHvi2ao5UnyDWnHv_M7v1BK6Ek4BbMz4xwBQBVKgEWv1MKt6Ycai0qtitVBDGgJ0DDUok-hX01_sCL7Dy4Hdzy6TqX8ehQnznPxBdSHQxfouxBOx1N_t5soHjhzmHt55fEAx-pI5YAB-2ZFBpcsTbrLE2WhxbptQ6oijUvxz-QtyjrnPvDFFGnaAG6pbPMnjkx8ftT2OH0RhPud3VPoYOBtVPjnrATB-veFxZI-B1hdg_szbsvdNfkeu8Fg1P10LEQP5MR8BxKQ4z4O0JBobJS1ve79zWGsTpXKloJas7oI8sCIP-aKH0UDXnClKudn-ABfhL9RfUov4PpN25Qph5GQDdU1gQtU09hngdZVBB1DjRQ1ZGtS43p7bod-yodhmkkSp--1hNeH3dF9Hm7Jm3r8yk_xPynSdaQQbckwgOH0T8zeX-uork9tyvJ7Cylb3z5vO_YPedXkqFHGgLiwFo384lx3EXFyxPhgIkQPKnGHtOmz7XfGbcfPzZI8UTfkaWsXUcB3tqSjyKp5meMp7rT-ZriS4"

# === HEADERS SIMULANDO NAVEGADOR/POSTMAN ===
headers = {'Authorization': f'Bearer {token}'}

# === HACER LA PETICIÓN GET ===
try:
    response = requests.get(url, headers=headers, timeout=10)
    print("Código de estado:", response.status_code)

    # Intentar interpretar como JSON
    try:
        data = response.json()
        print("Respuesta JSON:")
        print(json.dumps(data, indent=4, ensure_ascii=False))

        # Guardar resultado en archivo
        with open("respuesta_api.json", "w", encoding="utf-8") as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
            print("Datos guardados en 'respuesta_api.json'")
    except json.JSONDecodeError:
        print("⚠️ La respuesta no es JSON. Contenido crudo:")
        print(response.text)

except requests.exceptions.RequestException as e:
    print("❌ Error de conexión:", e)
